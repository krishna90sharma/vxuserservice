import { APIGatewayProxyHandler } from 'aws-lambda';
import { LambdaResponseTrait } from '@alpha/alpha-framework/dist/Traits';
import { parsePaginate } from "../../../../infrastructure/Helpers";
import PermissionsService from "../Services/PermissionsService";

const {success, error} = LambdaResponseTrait;
const permissionsService = new PermissionsService();

export const list: APIGatewayProxyHandler = async (event, {}) => {
  try {
    const {page = '1', keyword = ''} = event.queryStringParameters || {};
    const options = {
      page: parseInt(page, 10) > 0 ? page : 1,
      keyword
    };

    const data = await permissionsService.find(options);
    const result = parsePaginate(data, page);

    return success(result);
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
};

export const create: APIGatewayProxyHandler = async (event, {}) => {
  const {body} = event;
  try {
    const data = await permissionsService.store(JSON.parse(body));
    return success(data);
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
};

export const show: APIGatewayProxyHandler = async (event, {}) => {
  const {pathParameters: {permission_id}} = event;

  try {
    const data = await permissionsService.show(permission_id);

    if (data) {
      return success(data);
    }

    return error('DATA_NOT_FOUND');
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
};

export const update: APIGatewayProxyHandler = async (event, {}) => {
  try {
    const {body, pathParameters: {permission_id}} = event;
    const data = await permissionsService.show(permission_id);

    if (data) {
      const bodyParse = JSON.parse(body);
      const updated = await permissionsService.update(permission_id, bodyParse);

      if (updated) {
        return success(bodyParse);
      }

      return error('SOMETHING_WENT_WRONG', 500);
    }

    return error('DATA_NOT_FOUND');
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
};

export const destroy: APIGatewayProxyHandler = async (event, {}) => {
  const {multiValueQueryStringParameters: {ids = ''} = {}} = event;
  const listIds: string = ids[0];

  try {
    const idsParse = listIds.split(',');
    const deleted = await permissionsService.delete(idsParse);

    if (deleted) {
      return success('DELETE_SUCCEED');
    }

    return error('SOMETHING_WENT_WRONG');
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
};
