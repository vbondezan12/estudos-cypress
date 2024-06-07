# Ventanex QE Cypress

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Environments Setup](#environments-setup)
- [Code Styling](#code-styling)
- [Pull Request Process](#pull-request-process)

---

## Getting Started

1. Clone the project from [GitHub project](https://github.com/repaygithub/ventanex-qe-cypress.git)
2. Run `npm install` command
3. Follow instructions to set up an [environment file](#environments-setup)
4. Run `npm run cypress:open` command to launch cypress with default configurations
    - Select E2E
    - Select browser of choice
    - Run test

## Scripts

All scripts can be found in `package.json` and can be executed via `npm run <script>`.

- `api:all`: Runs all API tests in the default environment configuration `cypress.config.js`
- `api:all:qa`: Runs all API test in the QA environment configuration `cypress/config/env/qa.config.js`
- `api:all:uat`: Runs all API test in the UAT environment configuration `cypress/config/env/uat.config.js`
- `api:hesc`: Runs all HESC API tests with the default environment configuration
- `api:launch`: Runs all Launch API tests with the default environment configuration
- `api:servicemac`: Runs all ServiceMac API tests with the default environment configuration
- `api:usbank`: Runs all US Bank API tests with the default environment configuration
- `api:vhda`: Runs all VHDA API tests with the default environment configuration
- `cypress:open`: Launch Cypress UI using default environment configuration
- `cypress:open:qa`: Launch Cypress UI using QA environment configuration
- `cypress:open:uat`: Launch Cypress UI using UAT environment configuration
- `lint`: Executes linting based on eslint rules from `.eslintrc.js`
- `pre-commit`: Executes linting and all tests in the QA environment

## Code styling

- Prefer single quotes `'` over double quotes `"`
- Variable names should be in camelCase: `myVariableName`, `anotherVariableNameThatIsLonger`
- File and directory name should be lowercase and use underscores: `name`, `long_name`, `even_longer_name`
- All Cypress test files should have `.cy.js` extension
- Tip: Execute `npm run lint` to help identify any code styling problems

## Pull Request Process

1. Pull latest `main` branch
2. Merge `main` into your current branch
3. Run `npm run pre-commit` in a terminal
    - Ensure there are no errors from linting
    - Ensure there are no failed tests once linting passes
4. Open up a pull request
5. Once approved, select option to **merge and delete remote branch**


## Test Naming Convention
### API
`VEN-<ticket number>_<client>_<API CALL>_<endpoint>_with_<condition>`

### UI (page)
`VEN-<ticket number>_<client>_<test path by describe>_should_<expected result>_when_<condition>`