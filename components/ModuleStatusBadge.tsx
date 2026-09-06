import type { ModuleStatus } from './product-data'

export function ModuleStatusBadge({ status, label }: { status: ModuleStatus; label: string }) {
  return <span className={`module-status module-status-${status.toLowerCase().replace('_', '-')}`}><i aria-hidden="true" />{label}</span>
}
