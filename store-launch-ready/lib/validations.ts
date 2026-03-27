import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional().default(""),
  imageUrl: z.string().optional().default(""),
  isActive: z.boolean().optional().default(true),
  sortOrder: z.coerce.number().optional().default(0),
});

export const productSchema = z.object({
  categoryId: z.string().min(1),
  name: z.string().min(2),
  slug: z.string().min(2),
  shortDescription: z.string().optional().default(""),
  description: z.string().optional().default(""),
  imageUrl: z.string().optional().default(""),
  price: z.coerce.number().min(0),
  oldPrice: z.coerce.number().nullable().optional(),
  sizeGb: z.coerce.number().nullable().optional(),
  isFeatured: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
  stockStatus: z.string().optional().default("available"),
  sortOrder: z.coerce.number().optional().default(0),
});

export const checkoutSchema = z.object({
  customerName: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  paymentMethod: z.enum(["cash", "vodafone_cash", "transfer"]).default("cash"),
  items: z.array(
    z.object({
      productId: z.string(),
      productName: z.string(),
      productImage: z.string().optional().default(""),
      unitPrice: z.number(),
      quantity: z.number().min(1),
      sizeGb: z.number().optional().nullable(),
    }),
  ).min(1),
});

export const siteSettingsSchema = z.object({
  siteName: z.string().min(2),
  heroTitle: z.string().min(2),
  heroSubtitle: z.string().min(2),
  whatsappNumber: z.string().optional().default(""),
  supportEmail: z.string().optional().default(""),
  logoUrl: z.string().optional().default(""),
  primaryColor: z.string().optional().default("#22d3ee"),
  secondaryColor: z.string().optional().default("#0f172a"),
});
