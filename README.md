# ▶️  Installation

There are extension and mobile application versions of Scalia Wallet, and here you can find instructions to build them:

## Environment setting up

- Install [Node.js](https://nodejs.org)

- If you want to run iOS/Android applications, [set up the React Native development environment](https://reactnative.dev/docs/environment-setup)

- Install dependencies with:
```bash
yarn install:all
```

- If you want to run iOS, install pods for the iOS application additionally:
```bash
run yarn install:pods
```

## Extension build

- Build the project to the `./apps/extension/dist/` folder with
```bash
yarn build extension
```

- Optionally, you may run yarn extension to run development mode:
```bash
yarn extension
```

- To load the extension:
	- go to `chrome://extensions/` in the browser;
	- enable `Developer mode` in the top right corner;
	- press `Load unpacked`;
	- select `dist` folder;

## Mobile build

- Run iOS build locally with:
```bash
yarn ios
```

- Run Android build locally with:
```bash
yarn android
```
