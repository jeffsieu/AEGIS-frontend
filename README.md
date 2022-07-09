# AEGIS frontend

## Getting started

Install the required dependencies from npm:

```console
npm install
```

To run the frontend locally:

```console
npm run start
```

To view components on Storybook:

```console
npm run storybook
```

## Run in Docker container

1. `docker build -t aegis-frontend .`
2. `docker run -p 3000:3000 aegis-frontend`

## Tech stack

- React (with Redux and Router)
- MUI (UI Library)
- Hummingbird UI (Our own UI Library that wraps around MUI)
- Redux (State library)
- Storybook (Documentation)

## MUI

- [Documentation](https://mui.com/)

## Hummingbird UI

- [Package details](https://www.npmjs.com/package/hummingbird-ui)
- [Documentation](https://6278e17325a15a004a7ecb09-znxvqpghxt.chromatic.com/?path=/story/style-colours--page)
