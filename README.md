# Universal-Storage
 
![Repo Size](https://img.shields.io/github/repo-size/schwynf/Universal-Storage) <br> 
## Description <span id="d"></span> 
This is a password manager application. The information is stored in a MySQL database either on the localhost or heroku server depending on run time environment. Application features:
1. Stores all passwords in a secure MySQL database
1. Military encrytion on passwords prior to database storage
1. Random password generator
1. Allows users to check whether their password or email has been compromised by data breaches.
1. Session and JWT login verification
    
## Table of Contents 
 <ul><li><a href="#i">Installation</a></li><li><a href="#u">Usage</a></li><li><a href="#l">License</a></li><li><a href="#c">Contributing</a></li><li><a href="#t">Tests</a></li></ul> 
 
## Installation <span id="i"></span> 
1. Clone this repository.
    ```
    git clone https://github.com/schwynf/Universal-Storage.git
    ```
1. Navigate into the cloned directory.
    ```
    cd Universal-Storage
    ```
1. Install Nodejs dependencies.
    ```
    npm install
    ```
1. Create mysql database using the `schema.sql` file, located below.
    ```
    ./db/schema.sql
    ```
1. Update database username and password configuration in `config.json` file, located below.
    ```
    ./config/config.json
    ```
1. In the root directory of the project, start the server.
    ```
    node server
    ```
1. In your browser navigate to the following page.
    ```
    http://localhost:8080

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
 
## Usage <span id="u"></span> 
 Storing, creating, and validating passwords.
 
## License <span id="l"></span> 
MIT 
 
## Tests <span id="t"></span> 
 ```
 npm run test
 ```
 
## Author Info 
 
 Name: Schwyn Francis <br>
 <a href="https://github.com/Schwynf"><img src="https://img.shields.io/static/v1?label=Contact&message=Github&color=lightgrey" /></a>
 <a href="mailto:schwynf@gmail.com"><img src="https://img.shields.io/badge/Contact-Email%20Me!-lightgrey" /></a> <br>
 <img src="https://avatars.githubusercontent.com/u/59147321?" width="30%" />
 <br>
 
 Name: Jonathan Hansen <br>
 <a href="https://github.com/JonathanHansen98"><img src="https://img.shields.io/static/v1?label=Contact&message=Github&color=lightgrey" /></a>
 <a href="mailto:kriah0872@gmail.com"><img src="https://img.shields.io/badge/Contact-Email%20Me!-lightgrey" /></a> <br>
<img src="https://avatars.githubusercontent.com/u/58758929?" width="30%" />
 <br>
 
 Name: Tongtong Ding <br>
 <a href="https://github.com/tongtongding"><img src="https://img.shields.io/static/v1?label=Contact&message=Github&color=lightgrey" />  </a>
 <a href="mailto:tding7@asu.edu"><img src="https://img.shields.io/badge/Contact-Email%20Me!-lightgrey" /></a><br>
 <img src="https://avatars1.githubusercontent.com/u/59786540?" width="30%" />
