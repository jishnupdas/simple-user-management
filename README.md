This repo contains code for a simple user management system.

- `Django` backend API
- `NextJS` frontend

# Backend

## Considerations

- The task was to create a simple user management system
- API is built with django rest framework. It is the most popular and stable option to build a REST API with django and Django ORM.
- The system is built with some amount of extensibility in mind, including authentication
- I have extended the inbuilt user model inside Django, rather than building a separate user model. The available options for roles were
  - use the `Groups` in-built with django
  - [x] add a field to the `user` model (I have gone with this option)

Additionally

- JWT based authentication api enpoint have been setup
- API endpoints for user creation, updation, deletion, list, login, refresh token, logout have been setup
- factory-boy/Faker has been setup to aid in testing and generate some fake data

## Libraries used

- Django REST framework
- drf-yasg (for swagger info)
- gunicorn, django-extensions, djangorestframework-simplejwt, django-filter, psycopg2-binary, django-cors-headers for production. (not necessary now)

### dev libraries

- black : code linting and formatting
- pytest-django : for tests
- pre-commit : for pre-commit hooks and auto linting before git push
- django-debug-toolbar : for perf monitoring

## Instructions

If you are using pipenv, simply run

```bash
pipenv install
```

Without pipenv

```bash
pip install -r requirements.txt
```

```bash
#setup aa environment variable for settings file
export DJANGO_SETTINGS_MODULE="core.settings.dev"

#migrate to create database locally
python manage.py migrate

# load some sample fixtures
python manage.py loaddata sampledata.json

# run the python server
python manage.py runserver
```

---

# Frontend

## Considerations

Frontend is built with `NextJs` as it provides a lot of benefits over ReactJs, with all the great features of react. (Automatic code splitting, faster compile times, SSG, SSR.. the list is long)

- The UI was built with functional components as they are much more easy to compose together and reuse opposed to class based components
- TailwindCSS was used to style the components (personal preference)
- The UI was built as per screenshots given
- The task was to use Modals for CRUD operations, only delete operation is performed with a modal. create and update have been separated into their own routes/pages

## Libraries used

- `react-query` to get frontend-cache and generally speedup the UX. The other alternatives are (SWR or fetch). Powerful features and great community support is the prime reason to pick this one.
- `TailwindCSS` for CSS
- `framer-motion` for animations and page transitions
- `Axios` an objectively better approach over fetch
- `Formik` for forms
- `Yup` for form validation

Any of these libraries are easily replaceable if constraints are placed on requirements.

### Design Considerations

Given the volatile nature of javascript ecosystem anything might get outdated tomorrow. following measures are taken to soften this blow

- write adapters / interfaces for data fetching. `react-query` code is not directly used in the components, instead an interface is exposed. which can help replace the library if a better option arises
- form data is defines as array of objects before being rendered by formik, this is to improve DRY code and possibly replace formik when time comes.

## Instructions

```bash
# go to frontend dir
cd frontend

# install packages
npm install

npm run dev
# or
yarn dev
```

---

# Improvements that can be made

- [ ] add optimistic UI to frontend, with useMutation/caches
- [ ] add login/authentication on frontend
- [ ] add typescript support
- [ ] add animations to updates, delets actions

# Full setup

```bash
pipenv install
#or
pip install -r requirements.txt

#setup aa environment variable for settings file
export DJANGO_SETTINGS_MODULE="core.settings.dev"

#migrate to create database locally
python manage.py migrate

# load some sample fixtures
python manage.py loaddata sampledata.json

# run the python server
python manage.py runserver &

# change into react dir
cd frontend

# install npm packages
npm install

# start dev server
npm run dev

# go to localhost:3000
```

## swagger

```
localhost:8000/swagger/
```

## tests

```bash
python manage.py test

# or

pytest
```
