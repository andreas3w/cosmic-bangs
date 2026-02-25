/**
 * Bang definitions for cosmic-bangs pop-launcher plugin.
 *
 * Each key is the bang trigger (without the leading !).
 * - name:  Display name shown in the launcher
 * - url:   Search URL; the query string is appended at the end
 * - home:  Base URL opened when no query is given
 *
 * To add custom/work bangs, create a file called bangs-custom.js next to
 * this file (or in the plugin dir) with the same format:
 *
 *   module.exports = {
 *     jira: {
 *       name: "Jira",
 *       url: "https://mycompany.atlassian.net/browse/",
 *     },
 *   };
 *
 * Custom bangs override built-in ones if they share the same key.
 */

const BANGS = {
  // ── Search engines ─────────────────────────────────────────────
  g: {
    name: "Google",
    url: "https://www.google.com/search?q=",
    home: "https://www.google.com",
  },
  d: {
    name: "DuckDuckGo",
    url: "https://duckduckgo.com/?q=",
    home: "https://duckduckgo.com",
  },

  // ── Media ──────────────────────────────────────────────────────
  yt: {
    name: "YouTube",
    url: "https://www.youtube.com/results?search_query=",
    home: "https://www.youtube.com",
  },

  // ── Dev / Code ─────────────────────────────────────────────────
  gh: {
    name: "GitHub",
    url: "https://github.com/search?q=",
    home: "https://github.com",
  },
  ghm: {
    name: "GitHub (andreas3w)",
    url: "https://github.com/andreas3w?tab=repositories&q=",
    home: "https://github.com/andreas3w",
  },

  // ── Reference ────────────────────────────────────────────────────
  wiki: {
    name: "Wikipedia",
    url: "https://en.wikipedia.org/w/index.php?search=",
    home: "https://en.wikipedia.org",
  },

  // ── AI ──────────────────────────────────────────────────────────
  gpt: {
    name: "ChatGPT",
    url: "https://chatgpt.com/?q=",
    home: "https://chatgpt.com",
  },
  mc: {
    name: "Microsoft Copilot",
    url: "https://m365.cloud.microsoft/chat?q=",
    home: "https://m365.cloud.microsoft/chat",
  },

  // ── Social ─────────────────────────────────────────────────────
  r: {
    name: "Reddit",
    url: "https://www.reddit.com/search/?q=",
    home: "https://www.reddit.com",
  },
};

// ── Load optional custom bangs (e.g. work/enterprise) ────────────
try {
  const path = require("path");
  const customPath = path.join(__dirname, "bangs-custom.js");
  const custom = require(customPath);
  Object.assign(BANGS, custom);
} catch (_) {
  // No custom bangs file — that's fine
}

module.exports = BANGS;
