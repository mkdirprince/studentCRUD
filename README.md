# SimpleStudentAPI - A simple student Management API

### Description

SimpleStudentAPI is a lightweight REST API for manaing student records. It provides basic functionalities for adding, retrieving, updating and delete student records

### Installation Guide

1. Clone this repository [here](https://github.com/mkdirprince/SimpleStudentApi.git)

```
git clone https://github.com/mkdirprince/SimpleStudentApi.git
```

2. Navigate to project directory.

3. Create `.env` file and configure your primary database and a `.env.test` to set up your testing database

4. You can either work with the default Postgres and Prisma ORM or install and use your prefered database and ORM. Do configure to your choice.

5. connect to your testing database and make sure it is live. If you are using postgres on fly, you will connect via the command below and make sure the terminal stays open

```
flyctl proxy 5432 -a <your-DB-name-here>
```

3. Install dependencies and test your ocde.

```
make all
```

### Usage

- Connect to your database. If using Postgres on fly. Use the code below to start your postgres DB

```
flyctl proxy 5432 -a <your-DB-name-here>
```

- Run the application in development mode

```
make dev
```

- Run the transpiled JS bundle by running:

```
make run
```

- To removed the transpiled JS code, run:

```
make clean
```

## Docker Compose Usage

To build the Docker image and run the container using Docker Compose, follow these steps:

1. Ensure you have Docker installed on your system. You can download and install Docker from [here](https://www.docker.com/get-started).

2. Clone this repository:

   ```bash
   git clone https://github.com/mkdirprince/SimpleStudentApi.git
   ```

3. Navigate to the project directory:

   ```bash
   cd SimpleStudentApi
   ```

4. Create a `.env` file and configure your primary database connection information:

   ```bash
   echo "PG_PASSWORD=your_postgres_password" > .env
   ```

5. Optionally, you can create a `.env.test` file to configure your testing database.

6. Run the following command to build the Docker image:

   ```bash
   docker-compose build
   ```

   This command will build the Docker image based on the instructions in the `Dockerfile`.

7. Once the image is built, you can start the container using the following command:

   ```bash
   docker-compose up -d
   ```

   This command will start the container in detached mode (`-d`), exposing port 3003 on your host machine, and passing the environment variables from the `.env` file.

8. You can now access the API endpoints from your browser or any API client at `http://localhost:3003`.

9. To stop the container, use the following command:

   ```bash
   docker-compose down
   ```

   This command will stop and remove the container.

10. If you wish to remove the Docker image, you can use the following command:

    ```bash
    docker-compose down --rmi all
    ```

    This command will also remove the image associated with the container.

11. You can also remove volumes associated with the containers by using the `-v` option:

    ```bash
    docker-compose down -v
    ```

    This will remove the volumes specified in the `docker-compose.yml` file.

12. If you want to remove everything including networks, use:

    ```bash
    docker-compose down --rmi all -v --remove-orphans
    ```

    This command will remove containers, networks, volumes, and images specified in the `docker-compose.yml` file, as well as any orphan containers.

## API Endpoints

| HTTP Verbs | Endpoints            | Action                              |
| ---------- | -------------------- | ----------------------------------- |
| POST       | /api/v1/students     | Add a new student                   |
| GET        | /api/v1/students     | Get all students                    |
| GET        | /api/v1/students/:id | Get a student with an ID            |
| PUT/PATCH  | /api/v1/students/:id | Update existing student information |
| DELETE     | /api/v1/students/:id | Delete a student record             |
| GET        | /api/v1/healthcheck  | Check the health status of the API  |

### Technologies Used

- [NodeJs](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.

- [Express](https://www.expresjs.org/) This is a NodeJS web application framework.

* [Typescript](https://www.typescriptlang.org) This is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

* [Postgres](https://www.postgresql.org) This is a free and open-source relational database management system emphasizing extensibility and SQL compliance

* [Prisma](https://www.prisma.io) Prisma is an open-source ORM for Node.js and TypeScript. It is used as an alternative to writing plain SQL, or using another database access tool such as SQL query builders

### License

This project is available for use under the MIT License.
