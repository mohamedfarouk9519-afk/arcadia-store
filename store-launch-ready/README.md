# Store Launch Ready

نسخة أقرب للإنتاج من مشروع المتجر، هدفها أنك تبدأ الاستخدام بسرعة وتكمل عليها بسهولة.

## الموجود داخل المشروع
- واجهة متجر حديثة ومتجاوبة
- سلة شراء محلية محفوظة في المتصفح
- Checkout يكوّن الطلب ويرسل العميل تلقائيًا إلى واتساب
- لوحة تحكم عملية لإدارة:
  - الأقسام
  - المنتجات
  - الطلبات
  - إعدادات الموقع
  - رفع الصور إلى Supabase Storage
- تسجيل دخول للأدمن بـ NextAuth Credentials
- Prisma + PostgreSQL
- Seed data مبدئي
- تحسينات أداء أساسية مثل revalidate وتخفيف إعادة التحميل غير الضرورية

## التشغيل المحلي
```bash
npm install
cp .env.example .env
npm run prisma:generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

ثم افتح:
- المتجر: `http://localhost:3000`
- الأدمن: `http://localhost:3000/admin/login`

## بيانات دخول الأدمن
- email: القيمة الموجودة في `ADMIN_EMAIL`
- password: القيمة الموجودة في `ADMIN_PASSWORD`

## أهم الصفحات
### المتجر
- `/`
- `/category/[slug]`
- `/product/[slug]`
- `/cart`
- `/checkout`

### لوحة التحكم
- `/admin`
- `/admin/categories`
- `/admin/products`
- `/admin/orders`
- `/admin/settings`
- `/admin/media`

## رفع الصور على Supabase
1. أنشئ مشروع Supabase.
2. أنشئ Bucket باسم `uploads` واجعله Public.
3. انسخ القيم إلى `.env`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. من لوحة التحكم > Media ارفع الصور وخذ الرابط وضعه في المنتج أو القسم.

## النشر خطوة بخطوة (Vercel + Supabase)
### 1) قاعدة البيانات
- أنشئ Project على Supabase.
- من Database Settings خذ `DATABASE_URL`.
- ضعها في Environment Variables في Vercel.

### 2) التخزين
- أنشئ Bucket باسم `uploads`.
- فعّل Public access للقراءة.

### 3) Vercel
- ارفع المشروع إلى GitHub.
- اعمل Import للمشروع في Vercel.
- أضف المتغيرات التالية:
  - `DATABASE_URL`
  - `NEXTAUTH_SECRET`
  - `NEXTAUTH_URL`
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD`
  - `NEXT_PUBLIC_BASE_URL`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

### 4) تشغيل Prisma على قاعدة الإنتاج
بعد أول Deploy افتح terminal محليًا على نفس المشروع وشغّل:
```bash
npx prisma migrate deploy
npm run prisma:seed
```

### 5) عدّل الروابط
- `NEXTAUTH_URL=https://your-domain.com`
- `NEXT_PUBLIC_BASE_URL=https://your-domain.com`

## ملاحظات مهمة
- السلة محفوظة في Local Storage عند العميل.
- الطلب بعد إنشائه يرجّع رابط واتساب تلقائي برسالة جاهزة.
- لو لم تضع رقم واتساب في الإعدادات سيظل الطلب يتسجل لكن بدون redirect لواتساب.
- لو لم تضبط Supabase سيظهر لك تنبيه في صفحة Media بدل الرفع.

## ما الذي يمكن تطويره لاحقًا؟
- دفع إلكتروني
- كوبونات خصم
- صلاحيات متعددة للأدمن
- بحث متقدم
- تقارير وإحصائيات أوسع
