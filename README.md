# Jam Statz

## Overview
This is an idea for a website that will track a band's performances and albums. You will be able to track the shows you have been to and it will give you a statistcal overview of your live show attendance.

Some staticts include, the amount of shows you have seen of a certain band, the venues you have been to, the amount of times you have seen a song preformed live, the total amount of hours spent at shows, etc...

This project is actively being worked on and is not yet fully built out. Right now the jam-statz backend is being written in go and the frontend is using vite.


## Quick Start:

### **NOTE:** Tech Stack subject to change.


### Dev Database setup

Build dockerfile:
- `docker build -t jam-statz-db pkg/db/`

Run docker image:
- `docker run --detach --name jam-statz-db --env MARIADB_ROOT_PASSWORD=my-secret-pw -p 3306:3306 jam-statz-db --general_log_file=/var/lib/mysql/mysql.log --general_log=1`

you now have your db setup with logging enabled 👍

if you want to access your db just run:
- `docker exec -it test-jam-statz-mariadb mariadb -u root -p`

just be sure to swap out for your creds.

### Install Dependencies and Start Backend

Installing dependencies:
- `go mod download`
- `go mod tidy`

Start backend:
- `go run server.go`

### Handy Commands

if you update `graph/schemas/schema.graphqls` you have to regenerate by running the following command:
- `go run github.com/99designs/gqlgen generate`

to start your graphql server:
- `go run server.go`

to test out your grahpql:
- start graphql server
- go to localhost:8080

to access db:
- `docker exec -it test-jam-statz-mariadb mariadb -u root -p`

to tail db logs:
- `docker exec -it test-jam-statz-mariadb tail -f /var/lib/mysql/mysql.log`
