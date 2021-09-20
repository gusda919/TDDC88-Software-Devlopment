# TDDC88 Company 1 Project

## Installation
The development environment is set up using docker. Download docker [here](https://docs.docker.com/get-docker/).

```
docker-compose -f docker-compose.dev.yml up --build
```

This will spin up three docker containers with Angular (port 4200), Node.js (port 8080), and MongoDB (port 27017).
