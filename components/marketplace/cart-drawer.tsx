"use client";

import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useMarketplace } from "@/components/marketplace/marketplace-context";
import { formatPrice } from "@/components/home/feed-utils";

export function CartDrawer() {
  const { cart, cartOpen, closeCart, products, setCartQuantity } = useMarketplace();
  const items = products.filter((item) => cart[item.id]).map((item) => ({ ...item, quantity: cart[item.id] }));
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {cartOpen ? <button aria-label="Close cart overlay" className="fixed inset-0 z-40 bg-black/45" onClick={closeCart} type="button" /> : null}
      <aside className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l border-white/10 bg-[#091127] p-5 shadow-[0_0_60px_rgba(0,0,0,0.45)] transition-transform ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white"><ShoppingBag className="size-5" /><h2 className="text-xl font-semibold">Your Cart</h2></div>
          <button className="rounded-full bg-white/8 p-2 text-white" onClick={closeCart} type="button"><X className="size-4" /></button>
        </div>
        <div className="mt-6 space-y-4">
          {items.length ? items.map((item) => (
            <div key={item.id} className="rounded-[1.4rem] border border-white/8 bg-white/5 p-4 text-white">
              <p className="font-semibold">{item.productName}</p>
              <p className="text-sm text-brand-accent">{formatPrice(item.price)}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="rounded-full bg-white/8 p-2" onClick={() => setCartQuantity(item.id, item.quantity - 1)} type="button"><Minus className="size-4" /></button>
                  <span>{item.quantity}</span>
                  <button className="rounded-full bg-white/8 p-2" onClick={() => setCartQuantity(item.id, item.quantity + 1)} type="button"><Plus className="size-4" /></button>
                </div>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            </div>
          )) : <p className="rounded-[1.4rem] border border-dashed border-white/12 px-4 py-8 text-center text-brand-muted">Your cart is empty.</p>}
        </div>
        <div className="mt-6 rounded-[1.4rem] bg-white/5 p-4 text-white">
          <div className="flex items-center justify-between"><span>Total</span><span className="font-semibold">{formatPrice(total)}</span></div>
          <button className="mt-4 w-full rounded-full bg-brand-accent px-5 py-3 font-semibold text-slate-950" type="button">Proceed to Checkout</button>
        </div>
      </aside>
    </>
  );
}
