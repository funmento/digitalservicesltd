import { ArrowUpRight, Check, ChefHat, Clock3, CreditCard, MapPin, ShoppingBag } from 'lucide-react'

const orders = [
  ['#1048', 'Collection', 'Preparing'],
  ['#1047', 'Delivery', 'Confirmed'],
  ['#1046', 'Delivery', 'Ready'],
] as const

export function SystemVisual() {
  return (
    <div className="project-showcase" aria-label="Delife Kitchen online ordering storefront and operations platform mockups">
      <div className="project-showcase-label">
        <span>Completed project</span>
        <b>Delife Kitchen</b>
        <ArrowUpRight />
      </div>

      <div className="storefront-mockup">
        <div className="mockup-browser-bar"><i /><i /><i /><span>delifekitchen.co.uk</span></div>
        <div className="storefront-nav">
          <b><ChefHat /> DELIFE</b>
          <span>Menu</span><span>Our story</span>
          <i><ShoppingBag /> 2</i>
        </div>
        <div className="storefront-hero">
          <div>
            <small>Freshly prepared, delivered locally</small>
            <strong>Real food.<br />Made with care.</strong>
            <span>Order direct from the kitchen.</span>
          </div>
          <div className="food-plate" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        </div>
        <div className="menu-preview">
          <article><span className="menu-bowl bowl-one" /><b>Harissa chicken bowl</b><small>Seasonal vegetables</small></article>
          <article><span className="menu-bowl bowl-two" /><b>Green grain bowl</b><small>Herb dressing</small></article>
          <article><span className="menu-bowl bowl-three" /><b>Roasted halloumi</b><small>House slaw</small></article>
        </div>
      </div>

      <div className="orders-mockup">
        <div className="orders-heading"><div><small>Operations</small><b>Live orders</b></div><span>3 active</span></div>
        {orders.map(([number, type, status]) => (
          <div className="order-row" key={number}>
            <i><Check /></i><span><b>{number}</b><small>{type}</small></span><em>{status}</em>
          </div>
        ))}
        <div className="orders-footer"><span><CreditCard /> Payments connected</span><span><MapPin /> Delivery rules live</span></div>
      </div>

      <div className="mobile-order-mockup">
        <div className="mobile-speaker" />
        <div className="mobile-brand"><ChefHat /><b>DELIFE</b><ShoppingBag /></div>
        <small>Your order</small>
        <div className="mobile-item"><span /><div><b>Harissa chicken bowl</b><small>Qty 1</small></div><strong>£14.50</strong></div>
        <div className="mobile-item"><span /><div><b>Green grain bowl</b><small>Qty 1</small></div><strong>£12.90</strong></div>
        <div className="mobile-total"><span>Total</span><b>£27.40</b></div>
        <span className="mobile-checkout">Secure checkout <ArrowUpRight /></span>
      </div>

      <div className="project-system-note"><Clock3 /><span><b>One connected system</b><small>Ordering, payments and fulfilment</small></span></div>
    </div>
  )
}
