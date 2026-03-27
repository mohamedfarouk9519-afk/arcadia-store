import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = await hash(process.env.ADMIN_PASSWORD || "12345678", 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin",
      email: adminEmail,
      passwordHash: adminPassword,
      role: "admin",
    },
  });

  const categories = [
    { slug: "movies", name: "أفلام", description: "أحدث باقات الأفلام عالية الجودة", imageUrl: "https://placehold.co/900x600?text=Movies", sortOrder: 1 },
    { slug: "games", name: "ألعاب", description: "باقات ألعاب متنوعة ومنظمة", imageUrl: "https://placehold.co/900x600?text=Games", sortOrder: 2 },
    { slug: "series", name: "مسلسلات", description: "مختارات عربية وأجنبية مرتبة", imageUrl: "https://placehold.co/900x600?text=Series", sortOrder: 3 },
    { slug: "anime", name: "أنمي", description: "أعمال أنمي مميزة لعشاق التصنيفات المختلفة", imageUrl: "https://placehold.co/900x600?text=Anime", sortOrder: 4 },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  const movies = await prisma.category.findUniqueOrThrow({ where: { slug: "movies" } });
  const games = await prisma.category.findUniqueOrThrow({ where: { slug: "games" } });
  const series = await prisma.category.findUniqueOrThrow({ where: { slug: "series" } });
  const anime = await prisma.category.findUniqueOrThrow({ where: { slug: "anime" } });

  const products = [
    {
      slug: "action-pack-ultimate",
      name: "Action Pack Ultimate",
      shortDescription: "باقة أفلام أكشن قوية ومنظمة.",
      description: "باقة جاهزة بعناوين أكشن مختارة بجودة ممتازة، مناسبة للعرض الفوري داخل المتجر.",
      imageUrl: "https://placehold.co/900x600?text=Action+Pack",
      price: 150,
      oldPrice: 200,
      sizeGb: 64,
      categoryId: movies.id,
      isFeatured: true,
      isActive: true,
      stockStatus: "available",
      sortOrder: 1,
    },
    {
      slug: "cinema-night-bundle",
      name: "Cinema Night Bundle",
      shortDescription: "باقة متنوعة للسهرة.",
      description: "مجموعة أفلام مختارة من أكثر التصنيفات طلبًا داخل المتاجر الرقمية.",
      imageUrl: "https://placehold.co/900x600?text=Cinema+Night",
      price: 180,
      oldPrice: 220,
      sizeGb: 80,
      categoryId: movies.id,
      isFeatured: true,
      isActive: true,
      stockStatus: "available",
      sortOrder: 2,
    },
    {
      slug: "pro-gamer-pack",
      name: "Pro Gamer Pack",
      shortDescription: "باقة ألعاب مختارة بسعات كبيرة.",
      description: "حل ممتاز لعرض باقات ألعاب احترافية مع سعر وصورة ووصف واضح.",
      imageUrl: "https://placehold.co/900x600?text=Gamer+Pack",
      price: 220,
      oldPrice: 260,
      sizeGb: 128,
      categoryId: games.id,
      isFeatured: true,
      isActive: true,
      stockStatus: "available",
      sortOrder: 1,
    },
    {
      slug: "story-series-pack",
      name: "Story Series Pack",
      shortDescription: "مجموعة مسلسلات مختارة.",
      description: "مجموعة مرتبة من الأعمال المطلوبة مع وصف مناسب للبيع.",
      imageUrl: "https://placehold.co/900x600?text=Series+Pack",
      price: 240,
      oldPrice: 300,
      sizeGb: 140,
      categoryId: series.id,
      isFeatured: false,
      isActive: true,
      stockStatus: "available",
      sortOrder: 1,
    },
    {
      slug: "anime-fans-collection",
      name: "Anime Fans Collection",
      shortDescription: "تجميعة أنمي جاهزة لمحبي الأعمال الشهيرة.",
      description: "منتج تجريبي جاهز لتوضيح شكل صفحة التفاصيل والسلة والطلب.",
      imageUrl: "https://placehold.co/900x600?text=Anime+Collection",
      price: 195,
      oldPrice: 240,
      sizeGb: 90,
      categoryId: anime.id,
      isFeatured: false,
      isActive: true,
      stockStatus: "available",
      sortOrder: 1,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  const existingSettings = await prisma.siteSetting.findFirst();
  if (existingSettings) {
    await prisma.siteSetting.update({
      where: { id: existingSettings.id },
      data: {
        siteName: "Store Launch Ready",
        heroTitle: "متجر رقمي أنيق وسريع وجاهز للبيع",
        heroSubtitle: "اعرض منتجاتك بتصميم محترف، وأدر الطلبات من لوحة تحكم كاملة، وافتح واتساب تلقائيًا بعد إنشاء الطلب.",
        whatsappNumber: "201000000000",
        supportEmail: "support@example.com",
      },
    });
  } else {
    await prisma.siteSetting.create({
      data: {
        siteName: "Store Launch Ready",
        heroTitle: "متجر رقمي أنيق وسريع وجاهز للبيع",
        heroSubtitle: "اعرض منتجاتك بتصميم محترف، وأدر الطلبات من لوحة تحكم كاملة، وافتح واتساب تلقائيًا بعد إنشاء الطلب.",
        whatsappNumber: "201000000000",
        supportEmail: "support@example.com",
      },
    });
  }
}

main().finally(async () => prisma.$disconnect());
