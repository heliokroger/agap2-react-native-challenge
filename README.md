# Agap2 React Native Challenge

A catalogue of Powerpuff Girls's episodes and seasons written in React Native.

View a demo GIF [here](./docs/demo.gif).

## About the project

I've tried to use the bare minimal of libraries in this project.
All the visual animations were handcrafted. There was a huge visual inspiration on Netflix and Disney+, which it's very visible by the color scheme and buttons disposition.

### Color palette

I've used the following color palette:

![Color palette](./docs/color-palette.png)

## Cloning and installing dependencies

To clone the project, just run the following command:

```
git clone https://github.com/heliojuniorkroger/agap2-react-native-challenge
```

To install the dependencies, just run the following inside the project's folder:

```
npm install
```

Or, if you'd rather prefer yarn:

```
yarn
```

Then, you'll need to install the iOS native dependencies.
This process requires [CocoaPods](https://cocoapods.org/) installed in your machine.
Inside the project's `ios` folder, run the following:

```
pod install
```

You're set up!

## Running the project

### iOS

To run the project on an iOS simulator, just run:

```
npm run ios
```

### Android

To run the project on an Android simulator, just run:

```
npm run android
```

## Running tests

To run the unit tests, just run the following command:

```
npm test
```

## Folder structure

The application is distributed in four main parts:

- api
- components
- helpers
- screens

### API

The `api` folder contains a small bootstrap to be used for every API call. Also, there's a method for every request, with allows to get the response from the endpoint already knowing its return type.

For instance:

```ts
export const getShowEpisodes = (showId: number) =>
  requestAPI<ShowEpisode[]>(`/shows/${showId}/episodes`, 'GET');
```

### Components

The `components` folder contains atomic components. Components that doesn't communicate with any external API or global state.

### Helpers

`helpers` are functions shared between `screens` and/or components. Mostly generic and pure functions to do some data convertion or general ordinary treatment.

### Screens

The `screens` folder contains every component that's registered on the stack navigator. These components can either communicate with external resources (such as the API) or global state.
