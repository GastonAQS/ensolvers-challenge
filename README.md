# Engines

## Frontend
This app runs React v18, React Router DOM v6, uses Axios v0.26.1 to communicate with the API, date-fns v2.28.0 to be used by material-ui to render the date picker and material-ui v5.5.3 to component styling. Those are the more important packages and version, you can find dependencie list [here](https://github.com/GastonAQS/ensolvers-challenge/blob/45a2f68a382a17b5c36bf9dc71912908025db336/todo_frontend/package.json)

## Backend
The backend runs on Django v4.0.3 using a SQLite 3 database to persist data and Django REST Framework 3.13.1 to simplify validation process and data presentation.

# Run the app
In order to run this app clone the repository and execute <code>make run</code> in the root folder of the project.
## Important
This script will run React server on port 3000 and Django server on port 8000 so you must ensure this ports are not used by another dev server, you can kill processes running on those ports using <code>kill $(lsof -t -i:8000)</code> and <code>kill $(lsof -t -i:3000)</code>
