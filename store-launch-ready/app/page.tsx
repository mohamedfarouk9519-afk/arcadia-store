import Link from "next/link";
import ProductCard from "@/components/store/ProductCard";
import { prisma } from "@/lib/db";

export const revalidate = 60;

export default async function HomePage() {
  const [products, featured, categories, settings] = await Promise.all([
    prisma.product.findMany({ where: { isActive: true }, take: 8, orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }] }),
    prisma.product.findMany({ where: { isActive: true, isFeatured: true }, take: 3, orderBy: { createdAt: "desc" } }),
    prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    prisma.siteSetting.findFirst(),
  ]);

  return (
    <main>
      <section className="grid-glass relative overflow-hidden border-b border-white/10">
        <div className="container-app py-14 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-bold text-cyan-300">
                نسخة تشغيل جاهزة للبدء
              </span>
              <h1 className="section-title">{settings?.heroTitle || "متجر رقمي بتصميم احترافي ولوحة تحكم كاملة"}</h1>
              <p className="section-subtitle">{settings?.heroSubtitle || "إدارة منتجاتك وطلباتك وصورك من مكان واحد، مع Checkout سريع وربط واتساب تلقائي لتأكيد الطلبات."}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#products" className="btn-primary">ابدأ العرض</Link>
                <Link href="/admin/login" className="btn-secondary">دخول الأدمن</Link>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="card">
                  <div className="text-3xl font-black text-cyan-300">{products.length}+</div>
                  <div className="mt-2 text-sm text-slate-300">منتجات جاهزة للعرض</div>
                </div>
                <div className="card">
                  <div className="text-3xl font-black text-cyan-300">{categories.length}</div>
                  <div className="mt-2 text-sm text-slate-300">أقسام ديناميكية</div>
                </div>
                <div className="card">
                  <div className="text-3xl font-black text-cyan-300">24/7</div>
                  <div className="mt-2 text-sm text-slate-300">استقبال طلبات عبر واتساب</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {featured.map((item) => (
                <div key={item.id} className="card flex items-center gap-4">
                  <img src={item.imageUrl || "https://placehold.co/240x180?text=Featured"} alt={item.name} className="h-24 w-28 rounded-2xl object-cover" />
                  <div>
                    <div className="mb-1 text-xs text-cyan-300">Featured</div>
                    <div className="text-lg font-bold">{item.name}</div>
                    <div className="text-sm text-slate-400">{item.shortDescription || item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-app py-14">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h2 className="section-title">الأقسام</h2>
            <p className="section-subtitle">اعرض أقسامك بشكل احترافي وسريع للمستخدم.</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`} className="card group overflow-hidden">
              <img src={category.imageUrl || "https://placehold.co/640x420?text=Category"} alt={category.name} className="mb-4 h-48 w-full rounded-2xl object-cover transition duration-300 group-hover:scale-[1.02]" />
              <h3 className="text-xl font-black">{category.name}</h3>
              <p className="mt-2 text-sm text-slate-300">{category.description || "اكتشف أحدث العناصر داخل هذا القسم."}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="products" className="container-app py-14">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h2 className="section-title">أحدث المنتجات</h2>
            <p className="section-subtitle">واجهة عرض جاهزة للبيع مع كروت حديثة وسلة سهلة.</p>
          </div>
          <Link href="/cart" className="btn-secondary hidden md:inline-flex">اذهب للسلة</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  );
}
