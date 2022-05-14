# Formula One drivers backend application </h1>

 > I chose SQL because of relational data, and the type of queries that required are classic to SQL

## Installation and Usage

### Dependencies

- install MySQL (you can install in localhost by this [tutorial](https://ladvien.com/data-analytics-mysql-localhost-setup/))
- Node.js

### Installation

Clone this project

```cmd
> git clone https://github.com/egoldshm/Formula-One-drivers-backend-application
> cd Formula-One-drivers-backend-application
```

- Update configuration file to login to SQL in [src/database_conf.ts](src/database_conf.ts) file

- Install dependencies

```bash
> npm i
```

- Upload the data to from CSV files to the database by running [src/database_conf.ts](src/database_conf.ts) file

```bash
> ts-node .\src\init_sql.ts
```

### Usage

Start with npm

```bash
> ts-node inedx.ts
```
