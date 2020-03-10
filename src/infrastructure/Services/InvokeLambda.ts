import AWS from 'aws-sdk'

class InvokeLambda {
  protected lambda

  constructor() {
    AWS.config.region = process.env.APP_REGION || 'us-east-2'
    this.lambda = new AWS.Lambda()
  }

  public async invokeLambda(functionName: string, payload: any): Promise<any> {
    const Payload = JSON.stringify(payload)
    const params = {
      FunctionName: functionName,
      InvocationType: 'RequestResponse',
      LogType: 'Tail',
      Payload
    }

    try {
      const res = await this.lambda.invoke(params).promise()
      console.log(`invoke test2 response: ${JSON.stringify(res, null, 2)}`)
      const { StatusCode, Payload } = res

      if (StatusCode === 200) {
        return JSON.parse(Payload)
      }
    } catch (err) {
      console.log(`invoke ERROR: ${err}`)
    }

    return false
  }
}

export default InvokeLambda
