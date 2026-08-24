import { AppShell } from '@/components/AppShell'
import { ProtectedPage } from '@/components/ProtectedPage'
import { ArrowDownRight, ArrowUpRight, CheckCircle2, Clock3, MoreHorizontal, Plus, TrendingUp, UsersRound } from 'lucide-react'

const deals = [
  ['Northstar Expansion', 'Northstar Group', '£24,500', 'Proposal'],
  ['Medoria Platform', 'Medoria Health', '£18,200', 'Discovery'],
  ['Brightline Rollout', 'Brightline Ltd', '£31,800', 'Negotiation'],
]

export const metadata = { title: 'Dashboard' }

export default function DashboardPage() {
  return <ProtectedPage><AppShell><div className="dashboard">
    <div className="dashboard-heading"><div><span>MONDAY, 24 AUGUST 2026</span><h1>Good morning, Alex.</h1><p>Here’s what’s happening across your organisation.</p></div><button className="button"><Plus />Create new</button></div>
    <div className="dashboard-metrics">
      <article><div><span>Revenue this month</span><b>£284,620</b></div><TrendingUp /><p className="positive"><ArrowUpRight />12.4% <span>vs last month</span></p></article>
      <article><div><span>Open pipeline</span><b>£91,240</b></div><UsersRound /><p><b>34</b> <span>active opportunities</span></p></article>
      <article><div><span>Outstanding invoices</span><b>£18,750</b></div><Clock3 /><p className="negative"><ArrowDownRight />3 overdue</p></article>
      <article><div><span>Tasks completed</span><b>86%</b></div><CheckCircle2 /><p className="positive"><ArrowUpRight />4.1% <span>this week</span></p></article>
    </div>
    <div className="dashboard-grid">
      <article className="dashboard-chart"><div className="card-heading"><div><h2>Revenue performance</h2><p>Income across all active modules</p></div><select><option>Last 6 months</option></select></div><div className="axis"><span>£300k</span><span>£200k</span><span>£100k</span><span>£0</span><div className="dashboard-bars">{[42, 55, 50, 68, 78, 94].map((height, index) => <i key={height} style={{ height: `${height}%` }} className={index === 5 ? 'current' : ''}><small>{['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'][index]}</small></i>)}</div></div></article>
      <article className="activity-card"><div className="card-heading"><div><h2>Activity</h2><p>Today across your workspace</p></div><button><MoreHorizontal /></button></div><ul><li><span className="avatar red-avatar">SK</span><p><b>Sarah Khan</b> moved Northstar Expansion to Proposal<small>12 minutes ago</small></p></li><li><span className="activity-icon"><CheckCircle2 /></span><p><b>Invoice #1048</b> was paid in full<small>38 minutes ago</small></p></li><li><span className="avatar">JM</span><p><b>James Miller</b> completed a project milestone<small>1 hour ago</small></p></li></ul><button className="view-all">View all activity <ArrowUpRight /></button></article>
      <article className="pipeline-card"><div className="card-heading"><div><h2>Sales pipeline</h2><p>Highest value open opportunities</p></div><button className="view-all">View pipeline <ArrowUpRight /></button></div><table><thead><tr><th>Opportunity</th><th>Value</th><th>Stage</th><th></th></tr></thead><tbody>{deals.map(([deal, company, value, stage]) => <tr key={deal}><td><b>{deal}</b><small>{company}</small></td><td>{value}</td><td><span>{stage}</span></td><td><MoreHorizontal /></td></tr>)}</tbody></table></article>
    </div>
  </div></AppShell></ProtectedPage>
}
