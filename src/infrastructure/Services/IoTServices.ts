import AWS, { AWSError } from 'aws-sdk'

class IoTServices {
  protected iotData

  constructor() {
    AWS.config.region = process.env.APP_REGION || 'us-east-2'
    this.iotData = new AWS.IotData({ endpoint: process.env.APP_ENDPOINT })
  }

  public async publishData(data: any): Promise<boolean | AWSError> {
    try {
      const { topic, ...payload } = data
      const params = {
        topic,
        payload: JSON.stringify(payload),
        qos: 1
      }

      console.log(params)
      return new Promise((resolve, reject) => {
        this.iotData.publish(params, (err, data) => {
          if (err) {
            console.log(err, 'ERROR')
            reject(err)
          }
          console.log('SUCCESS')

          resolve(data)
        })
      })
    } catch (e) {
      console.log(e)
    }

    return false
  }
}

export default IoTServices
