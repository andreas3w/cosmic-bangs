/**
 * Bang definitions for cosmic-bangs pop-launcher plugin.
 *
 * Each key is the bang trigger (without the leading !).
 * - name:  Display name shown in the launcher
 * - url:   Search URL; the query string is appended at the end
 * - icon:  Freedesktop icon name (or absolute path)
 */
const BANGS = {
  yt: {
    name: "YouTube",
    url: "https://www.youtube.com/results?search_query=",
    icon: "youtube",
  },
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
};

module.exports = BANGS;
