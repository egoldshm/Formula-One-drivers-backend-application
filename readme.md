# Formula One driver backend application </h1>

 > I chose SQL because the data is relational, and the type of queries that are required are classic to SQL

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

- Upload the data from CSV files to the database by running [init_sql.ts](init_sql.ts) file

```bash
> ts-node init_sql.ts
```

### Usage

Start with npm

```bash
> ts-node app.ts
```

#### Drivers by season order by wins

```cmd
> curl -i localhost:3000/DriversBySeason/{season}
```

#### Top 3 drivers in each season

```cmd
> curl -i localhost:3000/SeasonsAllTimesRanking
```

#### Driver profile by driver id or name with all of his races sorted by date

```cmd
> curl -i localhost:3000/DriverProfile/{driver id or name}
```
