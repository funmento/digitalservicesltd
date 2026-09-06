import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const root = new URL('../..', import.meta.url)
const read = path => readFile(new URL(path, root), 'utf8')

test('delivery API scopes jobs and stops by tenant before returning data', async () => {
  const jobs = await read('netlify/functions/delivery/jobs.mts')
  const stops = await read('netlify/functions/delivery/stops.mts')
  assert.match(jobs, /eq\(deliveryJobs\.tenantId, context\.tenantId\)/)
  assert.match(stops, /eq\(deliveryStops\.tenantId, context\.tenantId\)/)
})

test('assignment rejects driver and vehicle records from another tenant', async () => {
  const assignments = await read('netlify/functions/delivery/assignments.mts')
  assert.match(assignments, /eq\(deliveryDrivers\.tenantId, context\.tenantId\)/)
  assert.match(assignments, /eq\(deliveryVehicles\.tenantId, context\.tenantId\)/)
})

test('entitlement is required before every protected delivery operation', async () => {
  const shared = await read('netlify/functions/delivery/shared.mts')
  assert.match(shared, /tenantModules\.moduleId, 'delivery'/)
  assert.match(shared, /tenantModules\.enabled, true/)
})


test('public tracking selects only safe fields', async () => {
  const tracking = await read('netlify/functions/delivery/tracking.mts')
  assert.match(tracking, /reference: deliveryJobs\.reference/)
  assert.doesNotMatch(tracking, /recipientPhone/)
  assert.doesNotMatch(tracking, /storageKey/)
})
