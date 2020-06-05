[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](CHANGELOG.md)
[![Build Status](https://travis-ci.com/sdanyalk/auth-project-two.svg?branch=master)](https://travis-ci.com/sdanyalk/auth-project-two)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](license)

# Authentication for Project Two
This project showcases how to add authentication using `passport.js` library. Template for this project is the starter template given for Project Two.

`passport.js` provides many authentication strategies. This project makes use of **local** username and password authentication strategy. More details about this strategy can be found [here](http://www.passportjs.org/packages/passport-local/).

Passport Local strategy expects you to have username and password stored in your database. In this project I'm using email address as a username. The passwords are stored as a hash using **bcrypt**.

**Version 2** of this project includes securing the API routes by using passport js **JWT strategy**. More about JWT-passport strategy can be found [here](http://www.passportjs.org/packages/passport-jwt/).

---

## Usage

You are most welcome to use this project as a starter code for your project-2. You have my full permission, and blessing.

To show this, I've published this project as a github *template* project. On the top, just before `Clone or download` button you will see a green `Use this template` button. This will allow you to create your own project based off this starter code project. So instead of cloning or forking, that is what I will recommend doing.

---

## Installation

1. Clone this repository.
    ```
    git clone https://github.com/sdanyalk/auth-project-two.git
    ```
1. Navigate into the cloned directory.
    ```
    cd auth-project-two
    ```
1. Install Nodejs dependencies.
    ```
    npm install
    ```
1. Create mysql database using the `schema.sql` file, located below.
    ```
    /db/schema.sql
    ```
1. Update database username and password configuration in `config.json` file, located below.
    ```
    /config/config.json
    ```
1. In the root directory of the project, start the server.
    ```
    node server.js
    ```
1. In your browser navigate to the following page.
    ```
    http://localhost:8080
    ```
---

## NPM Packages

| Package | Documentation |
| ----------- | ----------- |
| `express` | [Express](https://www.npmjs.com/package/express) |
| `express-handlebars` | [Express Handlebars](https://www.npmjs.com/package/express-handlebars) |
| `mysql2` | [Node MySql 2](https://www.npmjs.com/package/mysql2) |
| `sequelize` | [Sequelize](https://www.npmjs.com/package/sequelize) |
| `passport` | [Passport](https://www.npmjs.com/package/passport) |
| `passport-local` | [Passport Local Strategy](https://www.npmjs.com/package/passport-local) |
| `bcrypt` | [BCrypt](https://www.npmjs.com/package/bcrypt) |
| `connect-flash` | [Connect Flash for Express](https://www.npmjs.com/package/connect-flash) |
| `dotenv` | [Dotenv](https://www.npmjs.com/package/dotenv) |

---

## Heroku Deployment

This project is deployed on Heroku. The link to web app is:

[https://auth-project-two.herokuapp.com/](https://auth-project-two.herokuapp.com/)

---

## Nice to have

- [x] Secure the API endpoints by using JWT strategy in passport js.
- [ ] Add Jest unit tests.

---

## Troubleshooting

| Issue | Resolution
| ----------- | ----------- |
| `bcrypt` node package failing to install on Windows 7/10 machines. | From the `bcrypt` documentation, there are extra installations required on Windows OS to make `bcrypt` work. This is listed under the [Dependencies](https://www.npmjs.com/package/bcrypt#dependencies) section. To complete the required Windows dependencies install the tools as mentioned [here](https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions#microsoft-windows). Complete the previous step in GitBash (run as administrator).|

---

## Issues/Bugs

Please report any bugs [here](https://github.com/sdanyalk/auth-project-two/issues).

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
