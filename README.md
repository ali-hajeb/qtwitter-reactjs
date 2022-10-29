# QTwitter

This project is a simple and minimal clone of Twitter created using React.js. It was done as a challenge from @QueraTeam React Bootcamp.

## Backend

[The original backend](https://github.com/mhyrzt/rest-twitter-nodejs) of QTwitter was made by @mhyrzt using Express.js. This QTwitter client uses a forked version of the said backend. The backend server relies on Express.js framework and MongoDB as its database.
for more instructions on how to set up the server, visit the [backend repository](https://github.com/ali-hajeb/rest-twitter-nodejs).

## Set up

To run this client,
1. you need to clone and run the [backend server](https://github.com/ali-hajeb/rest-twitter-nodejs).
2. create a `.env` file in the root directory of `./qtwitter-reactjs` (client) containing backend server URL (i.e. http://localhost:4000) with the `REACT_APP_API_URL` key.

`~/.env`:
```shell
REACT_APP_API_URL = 'http://localhost:4000'
```
3. Run `yarn start`.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
