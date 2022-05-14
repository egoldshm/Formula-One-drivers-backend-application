# Formula One drivers backend application </h1>

 > I chose SQL because of relational data, and the type of queries that required are classic to SQL

## Installation and Usage

### Dependencies

- install MySQL (you can install in localhosy by this [tutorial](https://ladvien.com/data-analytics-mysql-localhost-setup/))
- Node.js

### Installation

Clone this project

```cmd
> git clone https://github.com/egoldshm/Formula-One-drivers-backend-application
> cd Formula-One-drivers-backend-application
```

- Update configuration file to login to SQL in [database_conf.js](database_conf.js) file

- Install dependencies

```bash
> npm i
```

- Upload the data to from CSV files to the database by running [init_sql.js](init_sql.js) file

```bash
> ts-node init_sql.js
```

### Usage

Start with npm

```bash
> ts-node inedx.js
```
