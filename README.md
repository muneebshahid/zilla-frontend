# zilla
#### Platform connecting buyers and sellers at the local level

### Setting up the enviornment
- Start by installing conda.
- Install the environment. (Contains both frontend and backend dependencies)
  - `conda env create -f environment.yml`
- Activate the environment:
    - `conda activate zilla`

#### Setting up backend:
- Run the postgres server (Change path for windows)
  - `initdb /usr/local/var/postgres -E utf8`
  - `pg_ctl -D /usr/local/var/postgres start`
    - If needed, served can be stopped using `pg_ctl -D /usr/local/var/postgres stop`
- Create DB and user
  - `createuser -P -d zilla_user`
    - Password: `pass`
  - `createdb zilla_db -U zilla_user`
    - Check: You should be able to login to psql using following command now `psql aursasta_db`
- Make migrations and run the server
  - `python manage.py makemigrations`
  - `python manage.py migrate`
  - Import fixtures (Optional)
    - `python internal/fake_providers/populate_db.py`
  - `python manage.py createsuperuser`
    - Username: `root`, Password: `root`
  - `python manage.py runserver`

#### Setting up the frontend:
- Nodejs should already be installed as part of the conda environment.
- Install angular.
    - `npm install -g @angular/cli`


Please always use conda or pip for installing new packages and don't forget to update the environment file
`conda env export > environment.yml`
