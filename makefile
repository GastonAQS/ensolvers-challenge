
django:
	sh -c "python3 -m venv ./rest_api/venv; source ./rest_api/venv/bin/activate; pip3 install -r ./rest_api/requirements.txt; python3 ./rest_api/manage.py makemigrations; python3 ./rest_api/manage.py migrate; python3 ./rest_api/manage.py runserver"

react:
	sh -c "npm --prefix ./todo_frontend install --force"
	sh -c "npm --prefix ./todo_frontend start"

run:
	make django & make react