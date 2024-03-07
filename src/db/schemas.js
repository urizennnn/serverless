const {text,pgTable,timestamp} = require("drizzle-orm/pg-core")
const {serial} = require("drizzle-orm/mysql-core")
const m = require("drizzle-orm/mysql-core")
const LeadTable= pgTable('table',{
	id:serial('id').primaryKey().notNull(),
	email:text('email').notNull(),
	createdAt:timestamp('created_at').defaultNow(),
	desc:text('desc'),
})

module.exports.LeadTable = LeadTable
