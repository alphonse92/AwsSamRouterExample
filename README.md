# simple-lambda-api-router AwsSamRouter example

This project is a ussage example of https://www.npmjs.com/package/simple-lambda-api-router.

It will use the AwsSamRouter with [middy](https://middy.js.org/) middlewares.

# Requeriments

1. SAM cli: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html
2. Node
3. Docker

# Installation

1. npm install

# Run the project

1. npm run local

After running that, it will deploy the api gateway in your local. Make sure your template paths matchs with your controllers paths.

The next endpoints will return the event object:

1. GET/health/
2. POST/health/{type}/
3. GET/user/
4. GET/user/{id}/
5. POST/user/
6. DELETE/user/{id}/
7. GET/user/clients/
8. GET/user/clients/{id}/
9. POST/user/clients/
10. DELETE/user/clients/

Otherwise the lambda will return 404
