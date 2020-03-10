const jwt = require('jsonwebtoken')

const authorizeUser = (userScopes, methodArn) => {
  console.log(`authorizeUser ${JSON.stringify(userScopes)} ${methodArn}`)
  return true
}

const buildIAMPolicy = (userId, effect, resource, context = {}) => {
  console.log(`buildIAMPolicy ${userId} ${effect} ${resource}`)
  return {
    principalId: userId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
    context,
  }
}

module.exports.handler = (event, {}, callback) => {
  try {
    const { authorizationToken } = event
    const tokenParts = authorizationToken.split(' ')
    const token = tokenParts[1]
    const decoded = jwt.verify(token, Buffer.from(process.env.JWT_SECRET, 'utf-8')) // Verify JWT
    const { user } = decoded // Checks if the user's scopes allow her to call the current endpoint ARN
    const userId = user.id
    const effect = authorizeUser(user.id, event.methodArn) ? 'Allow' : 'Deny'
    const authorizerContext = { user: JSON.stringify(user) }
    const policyDocument = buildIAMPolicy(userId, effect, '*', authorizerContext)

    return callback(null, policyDocument)
  } catch (e) {
    console.log(e)
    throw new Error('Unauthorized')
  }
}
