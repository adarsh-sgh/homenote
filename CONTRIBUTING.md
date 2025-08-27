# Contributing to Joplin Home Note Plugin

Thank you for your interest in contributing to this plugin! Here's how to get started:

## Setup

1. Clone this repository:
   ```
   git clone https://github.com/your-username/joplin-plugin-home-note.git
   cd joplin-plugin-home-note
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Development

1. Build the plugin:
   ```
   npm run dist
   ```
   This will create the distributable version of the plugin in the `dist` folder.

2. Install the plugin in Joplin:
   - Open Joplin
   - Go to Tools > Options > Plugins
   - Click "Show advanced settings"
   - Set the development plugins folder to the `dist` folder of this project
   - Restart Joplin
   - The plugin should now be loaded and visible in the plugins list

## Making Changes

1. Make your code changes
2. Build the plugin again with `npm run dist`
3. Restart Joplin to see your changes

## Before Submitting a Pull Request

- Test your changes thoroughly
- Update documentation if necessary
