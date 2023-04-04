import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Route from 'simple-lambda-api-router/dist/decorators/Route';

class UserController {
  @Route('get', '/user/{id}/')
  async getUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    return { statusCode: 200, body: 'getting user' };
  }

  @Route('get', '/user/')
  async getUsers(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    return { statusCode: 200, body: 'listing user' };
  }

  @Route('post', '/user/')
  async createUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    return { statusCode: 200, body: 'creating user' };
  }

  @Route('delete', '/user/{id}/')
  async deleteUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    return { statusCode: 200, body: 'deleting user' };
  }
}

const userController = new UserController();

export default userController;
