const {Pool,neonConfig, neon} = require('@neondatabase/serverless')
const {drizzle} =require ('drizzle-orm/neon-serverless')
const ws = require('ws')
require("dotenv").config()
const secrets = require("../lib/secrets")



async function performMigration () {
	const dbUrl = await secrets.getDatabaseUrl()
	console.log(dbUrl)

	neonConfig.webSocketConstructor = ws

	const pool = new Pool({connectionString:process.env.DATABASE_URL})

	pool.on('error',err=>console.error(err))
	const client = await pool.connect()

	try{

		await client.query('BEGIN')

		await client.query('COMMIT')
	}catch(err){
		await client.query('ROLLBACK')
		throw err
	}finally{
		client.release()}
}
if (require.main === module) {
	console.log('run this')
	console.log(process.env.AWS_SECRET_ACCESS_KEY)

	performMigration().then((val)=>{
		process.exit(0)
	}).catch(err=>{
		process.exit(1)})
}
