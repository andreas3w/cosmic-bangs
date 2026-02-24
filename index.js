#!/usr/bin/env node
"use strict";

const { spawn } = require("child_process");
const readline = require("readline");
const BANGS = require("./bangs");

// ── helpers ──────────────────────────────────────────────────────────────────

/** Send a JSON PluginResponse line to stdout (pop-launcher reads it). */
function send(response) {
  process.stdout.write(JSON.stringify(response) + "\n");
}

/** Open a URL with the default browser via xdg-open. */
function xdgOpen(url) {
  spawn("xdg-open", [url], {
    detached: true,
    stdio: "ignore",
  }).unref();
}

/** Build the icon object for pop-launcher (Name for theme, Mime for file path). */
function iconSource(icon) {
  if (typeof icon === "string" && icon.startsWith("/")) {
    return { Mime: icon };
  }
  return { Name: icon || "system-search" };
}

// ── state ────────────────────────────────────────────────────────────────────

/** Stores the resolved URLs for the current search so Activate can use them. */
let activeResults = [];

// ── request handlers ─────────────────────────────────────────────────────────

/**
 * Parse a query like "!yt cats doing tricks" and return search results.
 * The query always starts with "!" because plugin.ron uses  regex: "^!"
 */
function handleSearch(query) {
  // Clear previous results
  send("Clear");
  activeResults = [];

  // Strip the leading "!" and split into bang + search terms
  const withoutBang = query.slice(1); // e.g. "yt cats doing tricks"
  const spaceIdx = withoutBang.indexOf(" ");

  let bangKey, searchTerms;
  if (spaceIdx === -1) {
    bangKey = withoutBang.toLowerCase();
    searchTerms = "";
  } else {
    bangKey = withoutBang.slice(0, spaceIdx).toLowerCase();
    searchTerms = withoutBang.slice(spaceIdx + 1).trim();
  }

  // Find matching bangs (prefix match so typing "y" shows "yt")
  const matches = Object.entries(BANGS).filter(([key]) =>
    key.startsWith(bangKey)
  );

  if (matches.length === 0) {
    // No matching bang — show a hint
    send({
      Append: {
        id: 0,
        name: `Unknown bang: !${bangKey}`,
        description: "Available: " + Object.keys(BANGS).map((k) => "!" + k).join(", "),
        icon: { Name: "dialog-question" },
      },
    });
    activeResults.push(null);
  } else {
    for (const [key, bang] of matches) {
      const encoded = encodeURIComponent(searchTerms);
      const url = bang.url + encoded;
      const id = activeResults.length;

      const description = searchTerms
        ? url
        : `Type a query after !${key}`;

      send({
        Append: {
          id,
          name: searchTerms
            ? `${bang.name}: ${searchTerms}`
            : `${bang.name}`,
          description,
          icon: iconSource(bang.icon),
        },
      });

      activeResults.push(searchTerms ? url : null);
    }
  }

  send("Finished");
}

/** Open the selected result's URL when the user presses Enter. */
function handleActivate(id) {
  const url = activeResults[id];
  if (url) {
    xdgOpen(url);
  }
  send("Close");
}

/** Fill the launcher text box (tab-completion). */
function handleComplete(id) {
  const entry = Object.entries(BANGS)[id];
  if (entry) {
    send({ Fill: `!${entry[0]} ` });
  }
}

// ── main loop ────────────────────────────────────────────────────────────────

const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
  let request;
  try {
    request = JSON.parse(line);
  } catch {
    return; // ignore malformed input
  }

  if (typeof request === "string") {
    // Simple string variants: "Exit", "Interrupt", etc.
    if (request === "Exit") {
      process.exit(0);
    }
    if (request === "Interrupt") {
      // Cancel any in-flight work (none for this simple plugin)
      return;
    }
    return;
  }

  // Object variants
  if (request.Search !== undefined) {
    handleSearch(request.Search);
  } else if (request.Activate !== undefined) {
    handleActivate(request.Activate);
  } else if (request.Complete !== undefined) {
    handleComplete(request.Complete);
  } else if (request.Quit !== undefined) {
    // nothing to close
  } else if (request.Context !== undefined) {
    // no context menu items
    send("Finished");
  }
});
