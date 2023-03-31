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

After running that, it will deploy the api gateway in your local. The next endpoints will return the event object:

1. GET/health/
2. POST/health/{type}/

Otherwise the lambda will return 404
