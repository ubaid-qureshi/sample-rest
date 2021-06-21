# sample-rest

## How to run the application
Run following command from root folder to start service and database both </br>
Note: no need to to install any dependencies other than docker, [click here to install docker](https://docs.docker.com/engine/install)
```
 docker-compose up --build
```

To run locally 
Note: Change mongodb url to localhost in config/default.json to use local db
```
npm start
```


## To run unit tests
Run folowoling command from root
```
npm run test
```

## There are two controllers in this repo,
1. Authentication (Signup + Login)
2. User management (CRUD for users)

## Database used
1. mongodb (develop env)
2. in-memory mongodb, for unit tests (test env)

## Deployment
Kubernetes yaml files are added to deploy deployemnts and service in a cluster </br>
Note: Ingress file is also added fr custom network layer settings


## API Interface
Documentation - [Postman Doc](https://documenter.getpostman.com/view/13138181/TzeZESFX) Choose authentication environment </br>
                All required sample responses are saved in document

Collection - [Postman Collection](https://www.getpostman.com/collections/2d8a1b0151227f03ee10)

Note: <br>
1. First you have to hit Signup API and then Login API to get access token
2. This access token is required as bearer token for all User APIs
