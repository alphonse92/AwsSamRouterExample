import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Route } from 'simple-lambda-api-router/dist/decorators';

class ClientsController {
  @Route('get', '/user/clients/{id}/')
  async getClient(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    return { statusCode: 200, body: 'getting client' };
  }

  @Route('get', '/user/clients/')
  async getClients(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    return { statusCode: 200, body: 'listing client' };
  }

  @Route('post', '/user/clients/')
  async createClient(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    return { statusCode: 200, body: 'creating client' };
  }

  @Route('delete', '/user/clients/{id}/')
  async deleteClient(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    return { statusCode: 200, body: 'deleting client' };
  }
}

const clientController = new ClientsController();

export default clientController;
