import { drizzle } from 'drizzle-orm/netlify-db'
import * as platformSchema from './schema'
import * as deliverySchema from './delivery-schema'

export const db = drizzle({ schema: { ...platformSchema, ...deliverySchema } })
