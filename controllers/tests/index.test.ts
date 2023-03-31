import { faker } from '@faker-js/faker';
import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { NotImplementedControllerError, NotImplementedHandler } from 'api-utils/dist/errors/http';
import AwsSamRouter, { HandlerType } from 'api-utils/dist/classes/AwsSamRouter';
import { createController } from 'api-utils/dist/utils/controller';

describe('AwsSamRouter', () => {
  it('Should route succesfully', async () => {
    const controllerResult = { statusCode: 200, body: faker.datatype.string() };
    const resource = '/resource/';
    const httpMethod = 'GET';
    const router = new AwsSamRouter();
    router.use(
      resource,
      createController<HandlerType>({
        get: async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
          return controllerResult;
        },
      }),
    );

    const handler = router.expose();

    const response = await handler({ resource, httpMethod } as APIGatewayProxyEvent, {} as Context);

    expect(response).toEqual(controllerResult);
  });

  it('Should route succesfully even if method is in lower case', async () => {
    const controllerResult = { statusCode: 200, body: faker.datatype.string() };
    const resource = '/resource/';
    const httpMethod = 'get';
    const router = new AwsSamRouter();
    router.use(
      resource,
      createController<HandlerType>({
        get: async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
          return controllerResult;
        },
      }),
    );

    const handler = router.expose();

    const response = await handler({ resource, httpMethod } as APIGatewayProxyEvent, {} as Context);

    expect(response).toEqual(controllerResult);
  });

  it('Should route through many resources', async () => {
    const getResult = { statusCode: 200, body: faker.datatype.string() };
    const postResult = { statusCode: 200, body: faker.datatype.string() };

    const router = new AwsSamRouter();

    router.use(
      '/res1/',
      createController<HandlerType>({
        get: async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
          return getResult;
        },
      }),
    );

    router.use(
      '/res2/',
      createController<HandlerType>({
        post: async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
          return postResult;
        },
      }),
    );

    const handler = router.expose();

    const response = await handler({ resource: '/res1/', httpMethod: 'GET' } as APIGatewayProxyEvent, {} as Context);
    expect(response).toEqual(getResult);

    const response2 = await handler({ resource: '/res2/', httpMethod: 'POST' } as APIGatewayProxyEvent, {} as Context);
    expect(response2).toEqual(postResult);
  });

  it('Should return an error if resource does not exist', async () => {
    const getResult = { statusCode: 200, body: faker.datatype.string() };
    const get = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
      return getResult;
    };

    const router = new AwsSamRouter();

    router.use(
      '/resource/',
      createController<HandlerType>({
        get,
      }),
    );

    const handler = router.expose();
    let error;
    try {
      await handler({ resource: '/res1/', httpMethod: 'GET' } as APIGatewayProxyEvent, {} as Context);
    } catch (e) {
      error = e;
    }
    expect(error).toBe(NotImplementedControllerError);
  });

  it('Should return an error if handler does not exist', async () => {
    const getResult = { statusCode: 200, body: faker.datatype.string() };
    const get = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
      return getResult;
    };

    const router = new AwsSamRouter();

    router.use(
      '/resource/',
      createController<HandlerType>({
        get,
      }),
    );

    const handler = router.expose();
    let error;
    try {
      await handler({ resource: '/resource/', httpMethod: 'POST' } as APIGatewayProxyEvent, {} as Context);
    } catch (e) {
      error = e;
    }
    expect(error).toBe(NotImplementedHandler);
  });
});
