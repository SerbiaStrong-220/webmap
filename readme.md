# Exodus Webmap

This project contains a webmap for the project ["Exodus: Monolith"](https://github.com/SerbiaStrong-220/Monolith)

Webmap: https://serbiastrong-220.github.io/webmap-exodus/

## Project goals

- Keep it simple
- Keep it fast
- Keep it lightweight
- Keep it beautiful
- Keep it functional

Current release build size is ~134 KB (without images), it shouldn't be more than 200 KB.

## License

Author: Maxim Bychkov (Lokilife)

All rights reserved. If you want to use this project, contact author in Discord.

## Developing

### Prerequisites

- NodeJS v24.12.0 (may work with other versions, untested)
- pnpm v10.30.0 (may work with other versions, untested)

Once you've installed dependencies with `pnpm install`, start a development server:

```sh
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

### Building

To create a production version of the app:

```sh
pnpm run build
```

You can preview the production build with `pnpm run preview`.
