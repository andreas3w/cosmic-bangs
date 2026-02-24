# cosmic-bangs

DuckDuckGo-style **bang shortcuts** for [COSMIC Launcher](https://github.com/pop-os/cosmic-launcher) / [Pop Launcher](https://github.com/pop-os/launcher).

Type a bang prefix in the launcher to instantly search your favourite sites.

## Supported Bangs

| Bang | Site | Example |
|------|------|---------|
| `!yt` | YouTube | `!yt funny cats` |
| `!g`  | Google  | `!g rust programming` |
| `!d`  | DuckDuckGo | `!d privacy tools` |

Adding more is trivial — just edit `bangs.js`.

## Requirements

- **Node.js** (>= 14)
- **pop-launcher** or **cosmic-launcher**
- **xdg-open** (ships with most Linux desktops)

## Install

```sh
git clone <this-repo> && cd cosmic-bangs
./install.sh
```

This copies the plugin to `~/.local/share/pop-launcher/plugins/bangs/`.

Restart your launcher (Super key) to pick up the new plugin.

## Uninstall

```sh
rm -rf ~/.local/share/pop-launcher/plugins/bangs
```

## How It Works

pop-launcher discovers plugins via `plugin.ron` files in its plugin directories. The `regex: "^!"` directive tells the launcher to route any query starting with `!` to this plugin. The plugin reads JSON requests from stdin, matches the bang, and responds with search results on stdout — all line-delimited JSON per the pop-launcher IPC protocol.

## Adding Bangs

Open `bangs.js` and add an entry:

```js
gh: {
  name: "GitHub",
  url: "https://github.com/search?q=",
  icon: "github",
},
```

Then re-run `./install.sh`.

## License

ISC
