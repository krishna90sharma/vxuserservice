import { APIGatewayEventRequestContext, APIGatewayProxyEvent } from "aws-lambda";

export interface APIGatewayCustomProxyEvent extends APIGatewayProxyEvent {
  requestContext: APIGatewayCustomEventRequestContext;
}

export interface APIGatewayCustomEventRequestContext extends APIGatewayEventRequestContext {
  authorizer: {
    [name: string]: string;
  }
}

