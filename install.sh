#!/bin/sh
# Install cosmic-bangs plugin for pop-launcher / cosmic-launcher
set -e

PLUGIN_DIR="$HOME/.local/share/pop-launcher/plugins/bangs"

echo "Installing cosmic-bangs to $PLUGIN_DIR ..."
mkdir -p "$PLUGIN_DIR/icons"
cp plugin.ron "$PLUGIN_DIR/"
cp cosmic-bangs "$PLUGIN_DIR/"
cp index.js    "$PLUGIN_DIR/"
cp bangs.js    "$PLUGIN_DIR/"
cp icons/*.svg "$PLUGIN_DIR/icons/"
chmod +x "$PLUGIN_DIR/cosmic-bangs"

echo "Done! Restart cosmic-launcher (or pop-launcher) to load the plugin."
