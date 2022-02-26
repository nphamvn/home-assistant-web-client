# HomeAssistantWebClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Deploy to GitHub Pages
[Demo](https://nphamvn.github.io/home-assistant-web-client/)
1. Create a GitHub repository for project.
2. Configure git in local project 
```
git remote add origin https://github.com/your-username/your-project-name.git
git branch -M main
git push -u origin main
```
3. Create and check out a git branch named gh-pages.
```
git checkout -b gh-pages
```
4. Build project 
```
ng build --output-path docs --base-href /project_name/
```
With this project, the command will be 
```
ng build --output-path docs --base-href /home-assistant-web-client/
```
5. Make a copy of docs/index.html and name it docs/404.html.
6. Commit your changes and push.
7. On the GitHub project page, go to Settings and scroll down to the GitHub Pages section to configure the site to publish from the docs folder.
8. Click Save.
<<<<<<< HEAD
9. Click on the GitHub Pages link at the top of the GitHub Pages section to see deployed application. The format of the link is https://<user_name>.github.io/<project_name>/.

=======
9. Click on the GitHub Pages link at the top of the GitHub Pages section to see deployed application. The format of the link is https://<user_name>.github.io/<project_name>/.
>>>>>>> e44d395e73079a97ea96f5bd422481fdb99f2791
