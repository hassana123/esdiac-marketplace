import type { MarketplaceOrder, MarketplaceProduct } from "@/lib/mock/products";

type EnrichedMarketplaceOrder = MarketplaceOrder & {
  product: MarketplaceProduct;
};

type ProfileOrderListProps = {
  empty: string;
  orders: EnrichedMarketplaceOrder[];
  title: string;
};

const statusStyles: Record<MarketplaceOrder["status"], string> = {
  Delivered: "bg-emerald-400/15 text-emerald-200",
  Paid: "bg-sky-400/15 text-sky-200",
  Pending: "bg-amber-400/15 text-amber-200",
  Shipped: "bg-violet-400/15 text-violet-200",
};

export function attachProductsToOrders(
  orders: MarketplaceOrder[],
  products: MarketplaceProduct[],
) {
  const productsById = new Map(products.map((product) => [product.id, product]));

  return orders.reduce<EnrichedMarketplaceOrder[]>((acc, order) => {
    const product = productsById.get(order.productId);
    if (!product) return acc;
    acc.push({ ...order, product });
    return acc;
  }, []);
}

export function ProfileOrderList({ empty, orders, title }: ProfileOrderListProps) {
  if (!orders.length) {
    return (
      <div className="rounded-[1.8rem] border border-dashed border-white/12 px-6 py-16 text-center text-brand-muted">
        {empty}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <article
          key={order.id}
          className="rounded-[1.6rem] border border-white/10 bg-[#101936]/95 p-4 sm:p-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 space-y-2">
              <p className="text-xs tracking-[0.28em] text-white/40">{title}</p>
              <p className="break-words text-lg font-semibold text-white">
                {order.product.productName}
              </p>
              <p className="break-words text-sm text-brand-muted">
                {order.buyerName} · {order.buyerEmail}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 self-start">
              <span className="rounded-full bg-white/8 px-3 py-1 text-xs text-white/60">
                {order.placedAt}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status]}`}
              >
                {order.status}
              </span>
            </div>
          </div>
          <div className="mt-4 grid gap-3 text-sm text-brand-muted sm:grid-cols-3">
            <div className="rounded-2xl bg-white/5 px-4 py-3">
              Qty <span className="ml-2 font-semibold text-white">{order.quantity}</span>
            </div>
            <div className="rounded-2xl bg-white/5 px-4 py-3">
              Total{" "}
              <span className="ml-2 font-semibold text-white">
                ${order.total.toFixed(2)}
              </span>
            </div>
            <div className="rounded-2xl bg-white/5 px-4 py-3">
              Order ID <span className="ml-2 font-semibold text-white">{order.id}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
