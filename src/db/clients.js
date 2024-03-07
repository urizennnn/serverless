const {neon}  = require('@neondatabase/serverless')
const secrets = require('../lib/secrets')



async function dbClient() {
const dburl = await secrets.getDatabaseUrl()
const sql = neon(dburl)
	return sql
}

module.exports.dbClient = dbClient
