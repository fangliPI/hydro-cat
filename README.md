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

Import data to the empty database (only the first time) by change to the folder *db* and run the following commands
```
mongoimport -d test -c evals  --file evals.json --jsonArray
mongoimport -d test -c users  --file users.json --jsonArray
```

Change to *cat-frontend* folder, compiles and hot-reloads the frontend by
```
npm run serve
```

Open your browser and input the link **http://localhost:8080**, you will see the login page (default login information can be found in file *db/users.txt*). 

Now enjoy ;)

## Backend APIs
Following APIs enable users to manipulate data in the condition assessment tool, giving more flexibility and functionality. The tool I am using and would like to recommend is [Postman](https://www.postman.com/).

### Users
```
GET http://localhost:3000/api/v1/users          ##Get all users registered in this system
POST http://localhost:3000/api/v1/user_register ##Register a new user in this system, body should be like {"name":"UserName", "password":"MyPassword"}
DELETE http://localhost:3000/api/v1/users/:id   ##Delete a user by given the user's ID. Note: this should be sent with an authourization token
POST http://localhost:3000/api/v1/user_login    ##Check a registered user's token by this API with given body, which should be like {"name":"UserName", "password":"MyPassword"}
```

### Evaluation data
```
GET http://localhost:3000/api/v1/eval_data        ##Get all evaluation data record stored in this system. After each condition assessment, one record is created with an unique ID and timestamp
GET http://localhost:3000/api/v1/eval_data_latest ##Get the latest evaluation data record (according to the timestamp, when the record is created)
POST http://localhost:3000/api/v1/eval_data       ##Create a new data record by using this API with specifc formatted body (the body's format should be same as in the file db/evals.json)
DELETE http://localhost:3000/api/v1/eval_data/:id ##Delete one evaluation data record with specific record ID
```
