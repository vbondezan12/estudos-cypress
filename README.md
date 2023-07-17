<p align="center" width="100%">
    <img width="65%" src="cypress/fixtures/Cypress-img.png" alt="">
</p>
## VENTANEX-QE-CYPRESS PROJECT START-UP GUIDANCE
---

This project is build on Cypress version-10 and higher. The project won't work on lower versions of cypress since some configurations have changed with Cypress 10. 
To start the project below steps need to be followed:
1. First clone the project from our (this) repository
2. Run `npm install` command 
3. And run `npm install cypress --save-dev`. Now, node package manager (npm) will download Cypress in your local machine.  
4. Run `npx cypress open` to start Cypress GUI.
--- 

# Cypress-Automation-Framework
---
Cypress is a tool for testing modern web applications. It aims to address the pain points developers or QA engineers face while testing an application. Cypress is a more developer-friendly tool that uses a unique DOM manipulation technique and operates directly in the browser. Cypress is being used by more people every year and people with cypress are rising in demand. When starting a new project, the [Cypress Documentation](https://docs.cypress.io/guides/overview/why-cypress) is highly recommended as it will guide you with clear explanation and examples. 

## Some advantages of Cypress
1. Cypress is a modern tool
2. Cypress is simple and fast to set up
3. Has the capability to debug and implement vey faster
4. Cypress delivers quick test execution
5. Has an active community
6. Combines functional testing with API inspection

## Cypress limitations
+ Cypress commands run inside of a browser.
+ Each test is bound to a single origin.
+ There will never be support for multiple browser tabs.
+ Cypress is not a general purpose automation tool.
+ You cannot use Cypress to drive two browsers at the same time.

## Cypress Folder structure
After adding a new project, Cypress will automatically scaffold out a suggested folder structure. By default, it will create below folders:
<p align="center" width="100%">
    <img width="90%" src="cypress/fixtures/Cypress_folder_structure.png" alt="">
</p>

## E2E                                                               
+ /cypress.config.js 
+ /cypress/fixtures/example.json
+ /cypress/support/commands.js
+ /cypress/support/e2e.js

## Component:

+ /cypress.config.js
+ /cypress/fixtures/example.json
+ /cypress/support/commands.js
+ /cypress/support/component.js
+ /cypress/support/component-index.html

## Both:

+ /cypress.config.js
+ /cypress/fixtures/example.json
+ /cypress/support/commands.js
+ /cypress/support/e2e.js
+ /cypress/support/component.js
+ /cypress/support/component-index.html

## Cypress folders

## package.json:
This file allows us to write custom script to run our test quicker and easier. For example; to run our test against multiple browsers. Here is some custom scripts in the package.json that you can run with npm run:
+ triggerAllTests-headless `npm run triggerAllTests-headless` will run all tests with headless mode
+ triggerAllTests-headed `npm run triggerAllTests-headed` will run all tests with headed mode
+ triggerAllTests-chrome `npm run triggerAllTests-chrome` will run all tests on Chrome browser
+ cypress-multi-browser `npm run cypress-multi-browser` will run all tests on Chrome and Firefox 

## e2e:
The main folder where we store our test files, the 'Cypress App' will look into this folder in order to locate test file(s).

## fixtures:
Fixture folder represents the place where you can store your JSON files and these JSON files will be used for their marks when you're going to work with APIs. Where we keep our test data objects, mocked objects and any other data which we need for our tests (mostly JSON files).

## support:
Support folder is for every other necessary stuff, files-folders, to execute your code. The under this folder we have two files: command.js and e2e.js.

## command.js:
This is the place where we will keep our custom commands or common commands. Some commands that can be shared across the framework, for example, log in function. This file is where you can add your methods and you can provide name for the code which will be reusable in different tests. Has the ability to override Cypress functions.

## cypress.config.js:
Created in the projects root directory, enables us to change/override settings. This is the place where we configure the behavior of the framework, different parameters and how to configure Cypress. 

## cypress.env.json:
Created in the projects root directory, it let us store our credentials and any sensitive data to keep it separate from source control. For example; you don't want to push your username & password credentials to the GitHub. 

## node_modules:
Used to house dependencies (packages).

## videos:
Used to store videos of test recordings.

## screenshots:
Used to store images of specific test(s).

## e2e.js:
The first file which Cypress investigates; any imports and additional libraries(Plugins).

## Cucumber BDD
Cucumber is first and foremost a collaboration tool that aims to bring a common understanding to software teams - across roles. Cucumber features start their life as software requirements. The most important contributors to requirements aren’t programmers or testers - it’s business analysts. During this activity the programmers’ and testers’ primary responsibility is to ask questions and make sure they understand everything. Cucumber is not a testing tool, if you don't think so then read this [article](https://cucumber.io/blog/collaboration/the-worlds-most-misunderstood-collaboration-tool/).
The cypress-cucumber-preprocessor adds support for using feature files when testing with Cypress. You can follow the documentation via this [link](https://www.npmjs.com/package/cypress-cucumber-preprocessor) to configure Cucumber BDD with Cypress.

## How to Configure external data file
Cypress allows you to pass in [--environment variables](https://docs.cypress.io/guides/guides/environment-variables#Option-4-env) as options when using CLI tool. Values here will overwrite all other conflicting environment variables. Multiple values must be separated by a comma, not a space. You can use the --env argument for [cypress run.](https://docs.cypress.io/guides/guides/command-line#cypress-run)
