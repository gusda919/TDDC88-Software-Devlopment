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

## Workflow here on GitLab
_Last updated: 2021-10-12_

A sketch of the indended workflow is available in the documents folder here in this repository.

We have 5 long-lived branches:
- `main` - Is updated each iteration, code on this branch must be able to be shown to the customer. You are only allowed to pull code from develop to main.
- `develop` - The intermediate branch where code from backend, overview and dashboard should be merged to. Code on this branch must be ready to be tested (integration, regression and acceptance testing). Here it is fine to have some bugs.
- `backend` - CFT1
- `overview` - CFT2
- `dashboard` - CFT3

From the three cross-functional team branches, smaller feature branches shall be created. These smaller branches are not supposed to live longer than maximum two days, this is to enable continuous integration. When these smaller branches are merged to their respective CFT branch, peer-reviews must be made (more on that later).

Before a merge request from a CFT branch to `develop` is made (or from a feature branch to a CFT branch), you must make sure that you have pulled the latest changes from `develop` to your branch and resolved the resulting conflicts if there are any.
