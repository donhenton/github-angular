# GithubAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Running the Github Data Application


## Start Docker Elk
* clone this repository: https://github.com/donhenton/docker-elk (ES frozen at 6.3.0)
* docker-compose up -d

## Optionally Load Data 
* data can be loaded via scripts located here: https://github.com/donhenton/github_load

## Start the Rest Service
* clone this repository: https://github.com/donhenton/elastic-demo
* mvn clean spring-boot:run -DskipTests
* swagger documentation at http://localhost:9000/swagger-ui.html

## Start this application
* ng serve --open
* http://localhost:4200

