# kindling

## Getting Started
Clone the repo:
```console
git clone https://github.com/Cs35L-Project/kindling.git
cd kindling
```
### Setting up the backend server:
First you will need to configure mysql on your computer.
Install mariadb:
  - Windows: https://www.mariadbtutorial.com/getting-started/install-mariadb/
  - Mac:
    ```console
    brew install mariadb
    mysql.server start
    ```
  - Linux: https://opensource.com/article/20/10/mariadb-mysql-linux
Setup root user:
  https://www.ibm.com/docs/en/spectrum-lsf-rtm/10.2.0?topic=ssl-configuring-default-root-password-mysqlmariadb

Test that you're able to open the mysql repl:
  ```console
  mysql -u root -p
  ```
Create testdb table in mysql:
  ```console
  mysql -u root -p
  CREATE DATABASE testdb;
  ```
Modify server/app/config/db.config.js to use the password you created for root

Install dependencies and run:
```console
cd server
npm install
npm start
```
### Setting up the frontend server:
Install dependencies and run:
```console
cd react-app
npm install
npm start
```
