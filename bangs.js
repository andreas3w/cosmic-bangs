/**
 * Bang definitions for cosmic-bangs pop-launcher plugin.
 *
 * Each key is the bang trigger (without the leading !).
 * - name:  Display name shown in the launcher
 * - url:   Search URL; the query string is appended at the end
 * - icon:  Freedesktop icon name (or absolute path)
 *
 * To add custom/work bangs, create a file called bangs-custom.js next to
 * this file (or in the plugin dir) with the same format:
 *
 *   module.exports = {
 *     jira: {
 *       name: "Jira",
 *       url: "https://mycompany.atlassian.net/browse/",
 *       icon: "jira",
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
    icon: "google",
  },
  d: {
    name: "DuckDuckGo",
    url: "https://duckduckgo.com/?q=",
    icon: "duckduckgo",
  },

  // ── Media ──────────────────────────────────────────────────────
  yt: {
    name: "YouTube",
    url: "https://www.youtube.com/results?search_query=",
    icon: "youtube",
  },

  // ── Dev / Code ─────────────────────────────────────────────────
  gh: {
    name: "GitHub",
    url: "https://github.com/search?q=",
    icon: "github",
  },
  ghm: {
    name: "GitHub (andreas3w)",
    url: "https://github.com/andreas3w?tab=repositories&q=",
    icon: "github",
  },

  // ── Social ─────────────────────────────────────────────────────
  r: {
    name: "Reddit",
    url: "https://www.reddit.com/search/?q=",
    icon: "reddit",
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

// ── Resolve icon names to absolute SVG paths if bundled ──────────
const path = require("path");
const fs = require("fs");
const iconsDir = path.join(__dirname, "icons");

for (const bang of Object.values(BANGS)) {
  if (typeof bang.icon === "string" && !bang.icon.startsWith("/")) {
    const svgPath = path.join(iconsDir, bang.icon + ".svg");
    if (fs.existsSync(svgPath)) {
      bang.icon = svgPath;
    }
  }
}

module.exports = BANGS;
