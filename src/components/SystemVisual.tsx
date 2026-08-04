import { BarChart3, CheckCircle2, Package, ShoppingBag, Users } from 'lucide-react'

export function SystemVisual() {
  return (
    <div className="system-visual" aria-label="Illustration of an integrated business operations dashboard">
      <div className="visual-topbar"><span /><span /><span /><b>Operations overview</b></div>
      <div className="visual-body">
        <div className="visual-sidebar">
          <i /><i /><i /><i /><i />
        </div>
        <div className="visual-content">
          <div className="metric-row">
            <div><ShoppingBag /><span>Orders</span><strong>248</strong><small>+18.4%</small></div>
            <div><Users /><span>Customers</span><strong>1,429</strong><small>+8.2%</small></div>
            <div><Package /><span>Stock items</span><strong>856</strong><small>Live</small></div>
          </div>
          <div className="visual-lower">
            <div className="chart-card">
              <span>Revenue performance</span>
              <div className="chart-bars">{[42, 62, 48, 80, 68, 93, 78, 100].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
            </div>
            <div className="activity-card">
              <span>Live workflow</span>
              {['Order approved', 'Stock allocated', 'Customer notified'].map((item) => <p key={item}><CheckCircle2 />{item}</p>)}
            </div>
          </div>
        </div>
      </div>
      <div className="floating-status"><BarChart3 /><span><b>All systems connected</b><small>Real-time operational data</small></span></div>
    </div>
  )
}
