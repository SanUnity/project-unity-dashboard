## Dashboard Project Unity

This project is created in REACT.

In this readme we will explain the structure of the project:

In the `src` folder is where the root of the project is. The app.js file contains the 3 paths that we have:
- `/login`, to log in.
- `/password`, to recover password 
- `/dashboard`, all the content of the dashboard, this path is protected and is only accessed if you are logged in, in that case the response token is saved in sessionStorage, and then attached in als different calls to the api.

The `services` folder contains the different calls to the api, structured by files to differentiate the set of calls.

The `utils` folder contains several tools that are reused in different components.

The `initializers` folder contains the i18n library settings, used for translations.

The `hooks` folder contains a hook for using the localStorage and another for the sessionStorage.

The `guards` folder contains the PrivateRoute file that serves as security middleware to protect the `/dashboard` path.

The `contexts` folder contains the global context of the application.

The `component` folder contains the different views of the project, separated by folders:

    - `auth` for login and password.
    - The `dashboard` folder contains the side menu paths, separated into folders, and the map folder where the maps we use are located.
    - Shared components that are reused in other components.


The commands used for the project are:

### `npm start`

Runs the app in the development mode.

Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the build folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

