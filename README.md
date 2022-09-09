# NC | News Backend ([https://news.nedas.codes/api](https://news.nedas.codes/api))
> Example project for Backend API, consiting of **Express** and **Postgress** primarily. Showcasing API endpoints and error handling for a News Application.

## Environment vars
This project uses the following environment variables:

| Name | Description | Default Value |
| - | - | - |
| PGDATABASE | Define the databases for development/test ENV | nc_news |
| DATABASE_URL | Defines connection URL for Production | Na |
| NODE_ENV | Defines envrioment application will run in | test \| development \| production |

Can be accomplished by creating `.env.<NODE_ENV>` files, having within both:
```
PGDATBASE=nc_news
```
With `.env.test` **PGDATABASE** being concatinated with `_test`

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 16.x.x


# Getting started
- Clone the repository
```
git clone <git template url> <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Build and run the project
```
# Not needed for Production
npm run setup-dbs

npm run seed
npm run listen
```
  Navigate to `http://localhost:9090/api`