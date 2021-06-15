# hydro-cat
Condition Assessment Tool for Hydro Pump Turbine

There are three parts composing this small web-based tool, which are a frontend (Vue.js framework), a backend (express.js framework), and a database (mongodb). Prerequisites for installation and compliation are [Node.js](https://nodejs.org/en/) and [mongodb](https://www.mongodb.com/what-is-mongodb) installed on your local OS.  

The main branch is a pure local version, on the other hand, the docker-deploy is designed for cloud deployment, which is not fully finished yet and updates will continue. 

## Project setup
Run the following commands in both *cat-backend* and *cat-frontend* folder
```
npm install
```

Go to *cat-backend* folder, start the backend server and database by
```
npm start
```

Change to *cat-frontend* folder, compiles and hot-reloads the frontend by
```
npm run serve
```

Open your browser and input the link **http://localhost:8080**, you will see the login page (default login information can be found in file *db/users.txt*). 

Now enjoy ;)
