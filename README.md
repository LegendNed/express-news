# NS | News Backend (Express)

# Environment vars
This project uses the following environment variables:

| Name | Description | Default Value |
| - | - | - |
| PGDATABASE | Define the databases for development/test ENV | nc_news |

Can be done by creating `.env.test` and `.env.development` files, having within both:
```
PGDATBASE=nc_news
```
With `.env.test` being concatinated with `_test`

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 16.x.x


# Getting started
- Clone the repository
```
git clone  <git lab template url> <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Build and run the project
```
npm run setup-dbs
npm run seed
npm run listen
```
  Navigate to `http://localhost:9090/api`