import AWS from 'aws-sdk'

class SESServices {
  protected ses

  constructor() {
    this.ses = new AWS.SES({ region: 'us-east-1' })
  }

  public async sendEmail(data: any): Promise<any> {
    try {
      const { email: to, htmlBody, subject = 'Resets Password' } = data
      const emailAddress = process.env.EMAIL_ADDRESS || 'digitalfortress.dev@gmail.com'
      const fromBase64 = Buffer.from(emailAddress).toString('base64')

      const sesParams = {
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: htmlBody,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject,
          },
        },
        ReplyToAddresses: [emailAddress],
        Source: `=?utf-8?B?${ fromBase64 }?= <${ emailAddress }>`,
      }

      await this.ses.sendEmail(sesParams).promise()
    } catch (e) {
      console.log(e)
    }
  }
}

export default SESServices
