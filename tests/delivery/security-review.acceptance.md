# Delivery Management security-review acceptance tests

- A request without a Netlify Identity session returns 401 for every authenticated Delivery API.
- A signed-in member without an enabled `tenant_modules(delivery)` entitlement receives 402.
- A suspended member receives 403.
- A member role cannot create jobs, assign a driver, cancel, or override completion.
- A driver can update only an assigned stop and cannot dispatch another job.
- A completion request without a proof type is rejected.
- A failure request without a reason is rejected.
- Tracking tokens are stored only as SHA-256 hashes and responses never include recipient contact data, internal notes, driver data, assignment data, proof storage keys, or audit metadata.
- Tracking tokens which are revoked or expired are rejected.
- Every state change creates a delivery event and an audit-log entry.
- Proof assets use opaque storage keys; signed upload/read URLs are issued by a future storage adapter, not persisted or exposed as public URLs.