import CartSummary from "@/components/store/CartSummary";

export default function CartPage() {
  return (
    <main className="container-app py-10">
      <h1 className="mb-6 text-3xl font-black text-white">السلة</h1>
      <CartSummary />
    </main>
  );
}