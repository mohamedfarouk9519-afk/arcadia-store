import CartSummary from "@/components/store/CartSummary";

export default function CartPage() {
  return (
    <main className="container-app py-14">
      <div className="mb-8">
        <h1 className="section-title">السلة</h1>
        <p className="section-subtitle">راجع العناصر وعدّل الكميات قبل إتمام الطلب.</p>
      </div>
      <CartSummary />
    </main>
  );
}
