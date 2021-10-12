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

## Semantic Commit Messages
In order to write meaningful commit messages, please use the following format:

`<type>: <subject>`, where the subject is a summary in present tense.

For example `docs: Update README.md`

More examples of types:
- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

Source: [Josh Buchea](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
