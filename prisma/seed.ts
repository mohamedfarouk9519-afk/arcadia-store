import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const RAWG_API_KEY = process.env.RAWG_API_KEY;

async function getMoviePoster(title: string): Promise<string> {
  if (!OMDB_API_KEY) {
    return "https://placehold.co/300x450?text=Movie";
  }

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(
        title
      )}&type=movie`
    );

    const data = await res.json();

    if (data?.Response === "True" && data?.Poster && data.Poster !== "N/A") {
      return data.Poster;
    }

    return "https://placehold.co/300x450?text=Movie";
  } catch {
    return "https://placehold.co/300x450?text=Movie";
  }
}

async function getGameImage(name: string): Promise<string> {
  if (!RAWG_API_KEY) {
    return "https://placehold.co/300x450?text=Game";
  }

  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(
        name
      )}&page_size=1`
    );

    const data = await res.json();

    if (data?.results?.[0]?.background_image) {
      return data.results[0].background_image;
    }

    return "https://placehold.co/300x450?text=Game";
  } catch {
    return "https://placehold.co/300x450?text=Game";
  }
}

function makeSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = await hash(
    process.env.ADMIN_PASSWORD || "12345678",
    10
  );

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin",
      email: adminEmail,
      passwordHash: adminPassword,
      role: "ADMIN",
      updatedAt: new Date(),
    },
  });

  const categoriesData = [
    {
      slug: "movies",
      name: "أفلام",
      description: "أحدث باقات الأفلام عالية الجودة",
      imageUrl: "https://placehold.co/900x600?text=Movies",
      sortOrder: 1,
      isActive: true,
    },
    {
      slug: "games",
      name: "ألعاب",
      description: "باقات ألعاب متنوعة ومنظمة",
      imageUrl: "https://placehold.co/900x600?text=Games",
      sortOrder: 2,
      isActive: true,
    },
    {
      slug: "series",
      name: "مسلسلات",
      description: "مختارات عربية وأجنبية مرتبة",
      imageUrl: "https://placehold.co/900x600?text=Series",
      sortOrder: 3,
      isActive: true,
    },
    {
      slug: "anime",
      name: "أنمي",
      description: "أعمال أنمي مميزة لعشاق التصنيفات المختلفة",
      imageUrl: "https://placehold.co/900x600?text=Anime",
      sortOrder: 4,
      isActive: true,
    },
    {
      slug: "arabic-series",
      name: "مسلسلات عربي",
      description: "أفضل المسلسلات العربية",
      imageUrl: "https://placehold.co/900x600?text=Arabic+Series",
      sortOrder: 5,
      isActive: true,
    },
    {
      slug: "foreign-series",
      name: "مسلسلات أجنبي",
      description: "أفضل المسلسلات الأجنبية",
      imageUrl: "https://placehold.co/900x600?text=Foreign+Series",
      sortOrder: 6,
      isActive: true,
    },
    {
      slug: "cartoon",
      name: "كارتون",
      description: "أفلام ومسلسلات كرتون مميزة",
      imageUrl: "https://placehold.co/900x600?text=Cartoon",
      sortOrder: 7,
      isActive: true,
    },
  ];

  for (const category of categoriesData) {
    const existingCategory = await prisma.category.findUnique({
      where: { slug: category.slug },
    });

    if (!existingCategory) {
      await prisma.category.create({
        data: category,
      });
    }
  }

  const moviesCategory = await prisma.category.findUniqueOrThrow({
    where: { slug: "movies" },
  });

  const gamesCategory = await prisma.category.findUniqueOrThrow({
    where: { slug: "games" },
  });

  const seriesCategory = await prisma.category.findUniqueOrThrow({
    where: { slug: "series" },
  });

  const animeCategory = await prisma.category.findUniqueOrThrow({
    where: { slug: "anime" },
  });

  const arabicSeriesCategory = await prisma.category.findUniqueOrThrow({
    where: { slug: "arabic-series" },
  });

  const foreignSeriesCategory = await prisma.category.findUniqueOrThrow({
    where: { slug: "foreign-series" },
  });

  const cartoonCategory = await prisma.category.findUniqueOrThrow({
    where: { slug: "cartoon" },
  });

  const movieNames = [
    "Avengers Endgame",
    "John Wick 4",
    "Avatar Fire and Ash",
    "Frankenstein",
    "The Great Flood",
    "Back in Action",
    "Abigail",
    "A Quiet Place Day One",
    "Working Man",
    "Minecraft",
    "Flight Risk",
    "Cleaner",
    "Hellboy",
    "Borderlands",
    "Bad Boys Ride or Die",
    "Havoc",
    "Final Destination",
    "Diablo",
    "Death Unicorn",
    "Greenland 2",
    "Inception",
    "In the Lost Lands",
    "Ice Road Vengeance",
    "Home Sweet Home",
    "Materialists",
    "Jurassic World 2025",
    "How to Train Your Dragon",
    "Heads of State",
    "Mickey 17",
    "Superman",
    "Red Sonja",
    "Detective Pikachu",
    "Now You See Me Now You Don't",
    "Nobody 2",
    "Nobody",
    "Return to Silent Hill",
    "A Quiet Place Day One 2024",
    "Karate Kid Legends 2025",
    "Locked 2025",
    "Spectre 2015",
    "Speak No Evil 2024",
    "Sinners 2025",
    "The Abandon 2022",
    "The Woman in the Yard 2025",
    "The Gorge 2025",
    "The Electric State 2025",
    "Taken 2008",
    "The Accountant 2 2025",
    "The Amateur 2025",
    "The Beast Within 2024",
    "The Crow 2024",
    "The Killers Game 2024",
    "Train to Busan 2 Peninsula 2020",
    "Train to Busan 2016",
    "The Strangers Chapter 1 2024",
    "The League of Extraordinary Gentlemen 2003",
    "The Platform",
    "The Shadows Edge 2025",
    "The Strangers Chapter 2 2025",
    "The Tomorrow War 2021",
    "Weapons 2025",
    "Venom The Last Dance 2024",
    "The Conjuring Last Rites 2025",
    "The Fantastic Four First Steps",
    "The Monkey 2025",
    "The Rip 2026",
    "The Old Guard 2 2025",
    "The Fantastic Four First Steps",
    "Captain America Brave New World",
    "Deadpool & Wolverine",
    "Thor Love and Thunder",
    "Black Panther Wakanda Forever",
    "Ant-Man and The Wasp Quantumania",
    "Guardians of the Galaxy Vol 3",
    "The Marvels",
    "Black Widow",
    "Shang-Chi and The Legend of The Ten Rings",
    "Eternals",
    "Doctor Strange in the Multiverse of Madness",
    "Spider-Man No Way Home",
    "Avengers Infinity War",
    "Ant-Man and The Wasp",
    "Spider-Man Far From Home",
    "Captain Marvel",
    "Doctor Strange",
    "Guardians of the Galaxy Vol 2",
    "Black Panther",
    "Thor Ragnarok",
    "Spider-Man Homecoming",
    "Captain America The Winter Soldier",
    "Guardians of the Galaxy",
    "Avengers Age of Ultron",
    "Ant-Man",
    "Captain America Civil War",
    "Thor The Dark World",
    "Iron Man 3",
    "The Avengers",
    "X-Men Dark Phoenix",
    "Venom",
    "X-Men Days of Future Past",
    "Deadpool",
    "X-Men Apocalypse",
    "Logan",
    "Deadpool 2",
    "The Amazing Spider-Man",
  ];

  for (const [index, name] of movieNames.entries()) {
    const slug = makeSlug(name);

    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });

    if (!existingProduct) {
      const poster = await getMoviePoster(name);

      await prisma.product.create({
        data: {
          name,
          slug,
          shortDescription: "فيلم مضاف تلقائيًا داخل قسم الأفلام.",
          description:
            "فيلم مضاف تلقائيًا داخل المتجر ويمكن تعديل صورته وبياناته من لوحة الإدارة.",
          imageUrl: poster,
          price: 50,
          oldPrice: null,
          sizeGb: 50,
          categoryId: moviesCategory.id,
          isFeatured: false,
          isActive: true,
          stockStatus: "available",
          sortOrder: index + 1,
        },
      });
    }
  }

  const gameNames = [
    "Call of Duty Modern Warfare 2",
    "Call of Duty Modern Warfare 3",
    "Gas Guzzlers Extreme",
    "Marvels Avengers",
    "Alan Wake",
    "Batman Arkham City",
    "Assassins Creed 3",
    "Assassins Creed Brotherhood",
    "Assassins Creed",
    "Assassins Creed 2",
    "Darksiders 3",
    "Injustice 2",
    "Call of Duty Ghosts",
    "Call of Duty 2",
    "Blur",
    "Grand Theft Auto V",
    "Gotham Knights",
    "God of War",
    "Far Cry 3",
    "Ghost of Tsushima",
    "Tekken 8",
    "Naruto to Boruto Shinobi Striker",
    "Naruto Ultimate Ninja Storm 4",
    "Hogwarts Legacy",
    "Marvels Spider-Man Miles Morales",
    "It Takes Two",
    "Days Gone",
    "The Last of Us Part 1",
    "Uncharted Legacy of Thieves",
    "Watch Dogs",
    "Rise of the Tomb Raider",
    "Resident Evil 6",
    "Resident Evil 5",
    "Metro Exodus",
    "Resident Evil 4 Remake",
    "PUBG",
    "Watch Dogs 2",
    "Stray",
    "Sekiro Shadows Die Twice",
    "Star Wars Jedi Fallen Order",
    "Sniper Ghost Warrior 3",
    "Resident Evil Village",
    "Monster Hunter Rise",
    "Brawlhalla",
    "Dragon Ball Z Kakarot",
    "VALORANT",
    "Ori and the Will of the Wisps",
    "A Plague Tale Requiem",
    "Crash Team Racing Nitro Fueled",
    "Need for Speed Rivals",
  ];

  for (const [index, name] of gameNames.entries()) {
    const slug = makeSlug(name);

    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });

    if (!existingProduct) {
      const image = await getGameImage(name);

      await prisma.product.create({
        data: {
          name,
          slug,
          shortDescription: "لعبة مضافة تلقائيًا داخل قسم الألعاب.",
          description:
            "لعبة مضافة تلقائيًا داخل المتجر ويمكن تعديل صورتها وبياناتها من لوحة الإدارة.",
          imageUrl: image,
          price: 50,
          oldPrice: null,
          sizeGb: 50,
          categoryId: gamesCategory.id,
          isFeatured: false,
          isActive: true,
          stockStatus: "available",
          sortOrder: index + 1,
        },
      });
    }
  }

  const products = [
    {
      slug: "story-series-pack",
      name: "Story Series Pack",
      shortDescription: "مجموعة مسلسلات مختارة",
      description: "مجموعة مرتبة من الأعمال المطلوبة مع وصف مناسب للبيع.",
      imageUrl: "https://placehold.co/900x600?text=Series+Pack",
      price: 240,
      oldPrice: 300,
      sizeGb: 140,
      categoryId: seriesCategory.id,
      isFeatured: false,
      isActive: true,
      stockStatus: "available",
      sortOrder: 1,
    },
    {
      slug: "anime-fans-collection",
      name: "Anime Fans Collection",
      shortDescription: "تجميعة أنمي جاهزة لمحبي الأعمال الشهيرة",
      description: "منتج تجريبي جاهز لتوضيح شكل صفحة التفاصيل والسلة والطلب.",
      imageUrl: "https://placehold.co/900x600?text=Anime+Collection",
      price: 195,
      oldPrice: 240,
      sizeGb: 90,
      categoryId: animeCategory.id,
      isFeatured: false,
      isActive: true,
      stockStatus: "available",
      sortOrder: 1,
    },
    {
      slug: "arabic-series-pack",
      name: "Arabic Series Pack",
      shortDescription: "مجموعة مسلسلات عربية مختارة",
      description: "باقة جاهزة تضم أعمال عربية مطلوبة داخل المتجر.",
      imageUrl: "https://placehold.co/900x600?text=Arabic+Series",
      price: 210,
      oldPrice: 250,
      sizeGb: 100,
      categoryId: arabicSeriesCategory.id,
      isFeatured: false,
      isActive: true,
      stockStatus: "available",
      sortOrder: 1,
    },
    {
      slug: "foreign-series-pack",
      name: "Foreign Series Pack",
      shortDescription: "مجموعة مسلسلات أجنبية مختارة",
      description: "باقة تضم أفضل الأعمال الأجنبية بشكل منظم وواضح.",
      imageUrl: "https://placehold.co/900x600?text=Foreign+Series",
      price: 230,
      oldPrice: 280,
      sizeGb: 120,
      categoryId: foreignSeriesCategory.id,
      isFeatured: false,
      isActive: true,
      stockStatus: "available",
      sortOrder: 1,
    },
    {
      slug: "cartoon-kids-pack",
      name: "Cartoon Kids Pack",
      shortDescription: "مجموعة كرتون مناسبة للأطفال",
      description: "باقة كرتون جاهزة للعرض داخل قسم الكارتون.",
      imageUrl: "https://placehold.co/900x600?text=Cartoon+Pack",
      price: 160,
      oldPrice: 200,
      sizeGb: 70,
      categoryId: cartoonCategory.id,
      isFeatured: false,
      isActive: true,
      stockStatus: "available",
      sortOrder: 1,
    },
  ];

  for (const product of products) {
    const existingProduct = await prisma.product.findUnique({
      where: { slug: product.slug },
    });

    if (!existingProduct) {
      await prisma.product.create({
        data: product,
      });
    }
  }

  const existingSettings = await prisma.siteSetting.findFirst();

  if (!existingSettings) {
    await prisma.siteSetting.create({
      data: {
        siteName: "Store Launch Ready",
        heroTitle: "متجر رقمي أنيق وسريع وجاهز للبيع",
        heroSubtitle:
          "اعرض منتجاتك بتصميم محترف، وأدر الطلبات من لوحة تحكم كاملة، واضحة وواتساب تلقائيًا بعد إنشاء الطلب",
        whatsappNumber: "201000000000",
        supportEmail: "support@example.com",
      },
    });
  }

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });