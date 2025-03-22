# <img src="Stardust Studio.png">

# How To Run This Project on local

---

## Step 1

* Get Laragon v 6.0.0 With Php 8.4.0 and NodeJS v18
* Clone This Repo

  ```
  git clone https://github.com/sleepymor/Bioway.git
  ```
* Make or Switch into desired branch in feature you want to work with

  ```
  cd Bioway
  ```

## Step 2

* Run

  ```
  npm install
  ```

  and

  ```
  composer install
  ```
* Ask Owner if you encounter any error also just ignore deprecated package

## Step 3

* copy .env.example to .env
* create a database Using mySQL
* Migrate the database and use the seeder with

```
php artisan migrate --seed
```

## Step 4

* Run

  ```
  npm run dev
  ```
* And then open the project from laragon
