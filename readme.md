```bash
cd ./backend
python3 -m venv ./venv
source ./venv/bin/activate
python3 manage.py makemigrations chat
python3 manage.py migrate
python3 manage.py runserver
```

```bash
cd ./frontend/keys
npm install
npm run serve
```

http://localhost:8080