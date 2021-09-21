# TDDC88 Company 1 Project

## Installation
The development environment is set up using docker. Download docker [here](https://docs.docker.com/get-docker/).

### Follow the steps below
Clone repository
```
git clone git@gitlab.liu.se:tddc88-company-1-2021/deploy.git tddc88-project
```
Create and checkout branch develop and pull source code
```
git checkout -b develop
git pull origin develop
````

Run the development environment with the following command in the project root:
```
docker-compose -f docker-compose.dev.yml up --build
```

This will spin up three docker containers with Angular (port 4200), Node.js (port 8080), and MongoDB (port 27017).
