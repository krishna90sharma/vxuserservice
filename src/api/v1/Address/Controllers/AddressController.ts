import { APIGatewayProxyHandler } from 'aws-lambda'
import _ from 'lodash'
import { LambdaResponseTrait } from '@alpha/alpha-framework/dist/Traits'
import { parsePaginate } from '../../../../infrastructure/Helpers'
import AddressService from '../Services/AddressService'
import PhonesService from '../../Phones/Services/PhonesService'
import Address from '../Entities/Address'

const { success, error } = LambdaResponseTrait
const addressService = new AddressService()
const phonesService = new PhonesService()

export const list: APIGatewayProxyHandler = async (event, {}) => {
  try {
    const { page = '1', id = '', type = 'ORGANIZATIONS' } = event.queryStringParameters || {}
    const options = {
      page: parseInt(page, 10) > 0 ? page : 1,
      id,
      type
    }

    if (id) {
      const data = await addressService.find(options)
      const result = await data[0].map(async (address) => await getAddressDetail(address))
      data[0] = await Promise.all(result)

      const paginate = parsePaginate(data, page)

      return success(paginate)
    }

    return error('SOMETHING WENT WRONG')
  } catch (e) {
    console.log(e)
    return error(e.detail || e.message, 500)
  }
}

export const create: APIGatewayProxyHandler = async (event, {}) => {
  const { body } = event
  const bodyParse = JSON.parse(body)

  try {
    const {
      billing: { phones: phoneBilling, ...billingData },
      shipping: { phones: phoneShipping, ...shippingData },
      type,
      type_id,
      ...address
    } = bodyParse
    console.log(bodyParse)

    Object.assign(address, {
      addressable_type: type,
      addressable_id: type_id,
      billing_id: null,
      shipping_id: null
    })

    const billingInsert = await addressService.storeAddressDetail(billingData)
    const shippingInsert = await addressService.storeAddressDetail(shippingData)
    const billing_id = billingInsert.identifiers[0].id
    const shipping_id = shippingInsert.identifiers[0].id
    const phonesBill = _.map(phoneBilling, (phone) => {
      Object.assign(phone, { address_id: billing_id })
      return phone
    })
    const phonesShipping = _.map(phoneShipping, (phone) => {
      Object.assign(phone, { address_id: shipping_id })
      return phone
    })

    await phonesService.store(phonesBill)
    await phonesService.store(phonesShipping)

    console.log(phonesBill, phonesShipping, billing_id, shipping_id)

    Object.assign(address, { billing_id, shipping_id })
    const data = await addressService.store(address)
    const addressId = data.identifiers[0].id

    if (address.default) {
      await addressService.updateDefault({ type_id, id: addressId })
    }

    return success(data)
  } catch (e) {
    console.log(e)
    return error(e.detail || e.message, 500)
  }
}

export const show: APIGatewayProxyHandler = async (event, {}) => {
  const { pathParameters: { address_id } } = event

  try {
    const address = await addressService.show(address_id)

    if (address) {
      const addressData = await getAddressDetail(address)

      return success(addressData)
    }

    return error('DATA_NOT_FOUND')
  } catch (e) {
    console.log(e)
    return error(e.detail || e.message, 500)
  }
}

export const getDefault: APIGatewayProxyHandler = async (event) => {
  const { pathParameters: { id } } = event
  const { type = 'ORGANIZATIONS' } = event.queryStringParameters || {}

  try {
    const address = await addressService.getDefault({ id, type })

    if (address) {
      const addressData = await getAddressDetail(address)

      return success(addressData)
    }

    return success({})
  } catch (e) {
    console.log(e)
    return error(e.detail || e.message, 500)
  }
}

export const update: APIGatewayProxyHandler = async (event, {}) => {
  const { body, pathParameters: { address_id } } = event
  const data = await addressService.show(address_id)

  try {
    if (data) {
      const bodyParse = JSON.parse(body)
      const { billing, shipping, default: default_address } = bodyParse
      console.log(bodyParse)

      if (billing && shipping) {
        const {
          billing: { phones: phoneBilling, ...billingData },
          shipping: { phones: phoneShipping, ...shippingData },
        } = bodyParse

        await addressService.updateAddressDetail(billingData.id, billingData)
        await addressService.updateAddressDetail(shippingData.id, shippingData)

        const phonesBill = _.map(phoneBilling, (phone) => {
          Object.assign(phone, { address_id: billingData.id })
          return phone
        })
        const phonesShipping = _.map(phoneShipping, (phone) => {
          Object.assign(phone, { address_id: shippingData.id })
          return phone
        })

        await phonesService.store(phonesBill)
        await phonesService.store(phonesShipping)
      }

      if (default_address) {
        await addressService.updateDefault({ type_id: data.addressable_id, id: address_id })
      }

      const updated = await addressService.update(address_id, bodyParse)

      if (updated) {
        return success(bodyParse)
      }

      return error('SOMETHING_WENT_WRONG', 400)
    }

    return error('ADDRESS_NOT_FOUND')
  } catch (e) {
    console.log(e)
    return error(e.detail || e.message, 400)
  }
}

export const destroy: APIGatewayProxyHandler = async (event, {}) => {
  const { multiValueQueryStringParameters: { ids = '' } = {} } = event
  const listIds: string = ids[0]

  try {
    const idsParse = listIds.split(',')
    const deleted = await addressService.delete(idsParse)

    if (deleted) {
      return success('DELETE_SUCCEED')
    }

    return error('SOMETHING_WENT_WRONG', 500)
  } catch (e) {
    console.log(e)
    return error(e.detail || e.message, 500)
  }
}

async function getAddressDetail(address: Address): Promise<Address> {
  const { billing, shipping } = address

  if (billing) {
    const { id } = billing
    const phones = await phonesService.getPhonesByAddress(id)
    Object.assign(address, {
      billing: {
        ...address.billing,
        phones
      }
    })
  }

  if (shipping) {
    const { id } = shipping
    const phones = await phonesService.getPhonesByAddress(id)
    Object.assign(address, {
      shipping: {
        ...address.shipping,
        phones
      }
    })
  }

  return address
}
