import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { HandlerType } from 'simple-lambda-api-router/dist/classes/AwsSamRouter';
import { createController } from 'simple-lambda-api-router/dist/utils/controller';
import auditLogMiddleware from '../../middlewares/AuditLog.middleware';

async function get(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  return { statusCode: 200, body: JSON.stringify({ event }) };
}

async function post(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  return { statusCode: 200, body: JSON.stringify({ event }) };
}

const middlewares = [httpErrorHandler(), httpEventNormalizer(), httpJsonBodyParser(), auditLogMiddleware()];
const controller = createController<HandlerType>({
  get: middy(get).use(middlewares) as HandlerType,
  post: middy(post).use(middlewares) as HandlerType,
});

export default controller;
