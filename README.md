# Engines

## Frontend
This app runs React v18, React Router DOM v6, uses Axios v0.26.1 to communicate with the API, date-fns v2.28.0 to be used by material-ui to render the date picker and material-ui v5.5.3 to component styling. Those are the more important packages and version, you can find a full list in package.json file located in todo_frontend/package.json. 

## Backend
The backend runs on Django v4.0.3 using a SQLite 3 database to persist data.

# Run the app
In order to run this app clone the repository and execute <code>make run</code> in the root folder of the project.
## Important
This script will kill all processes executing on port 3000 and 8000 because those ports will be used by React and Django