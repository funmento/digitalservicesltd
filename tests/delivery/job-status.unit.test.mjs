import test from 'node:test'
import assert from 'node:assert/strict'

function deriveJobStatus(statuses, canceled = false) {
  if (canceled) return 'canceled'
  if (!statuses.length || statuses.every(s => s === 'pending')) return 'ready_for_dispatch'
  if (statuses.every(s => s === 'delivered')) return 'delivered'
  if (statuses.some(s => s === 'out_for_delivery')) return 'out_for_delivery'
  if (statuses.some(s => s === 'delivery_failed') && !statuses.some(s => ['pending', 'assigned', 'out_for_delivery'].includes(s))) return 'delivery_failed'
  if (statuses.some(s => s === 'assigned')) return 'assigned'
  return 'ready_for_dispatch'
}
test('job status is derived from stops', () => {
  assert.equal(deriveJobStatus(['pending']), 'ready_for_dispatch')
  assert.equal(deriveJobStatus(['assigned', 'pending']), 'assigned')
  assert.equal(deriveJobStatus(['out_for_delivery', 'assigned']), 'out_for_delivery')
  assert.equal(deriveJobStatus(['delivered', 'delivered']), 'delivered')
  assert.equal(deriveJobStatus(['delivery_failed']), 'delivery_failed')
})