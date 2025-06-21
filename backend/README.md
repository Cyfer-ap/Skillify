Booking feature added to Skillify
Teacher can add available slots and students can book them.
Students can see teacher availability and book slots and also see booked sessions.


follow the below steps to run the project locally:
```
cd skillify

python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate

python manage.py runserver


```