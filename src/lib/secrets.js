const {SSMClient,GetParameterCommand} = require("@aws-sdk/client-ssm")
const AWS = require("aws-sdk")
const AWS_REGION = 'us-east-2'
const ssm = new AWS.SSM({ region: AWS_REGION })
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
const DATABASE_URL_SSM_PARAM = '/serverless-api/prod/database-url'


 async function getDatabaseUrl() {
	const client = new SSMClient({region : AWS_REGION})
	const data = { Name: DATABASE_URL_SSM_PARAM, WithDecryption: true }

	const command = new GetParameterCommand(data)
	const result = await client.send(command)
	return result.Parameter.Value
}

module.exports.getDatabaseUrl = getDatabaseUrl
