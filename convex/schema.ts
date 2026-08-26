import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),

  settings: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),

  customApps: defineTable({
    name: v.string(),
    nameUrdu: v.optional(v.string()),
    url: v.string(),
    icon: v.string(),
    row: v.number(),
    position: v.number(),
    isActive: v.boolean(),
  }),

  tickerMessages: defineTable({
    message: v.string(),
    isActive: v.boolean(),
    order: v.number(),
  }),

  mediaItems: defineTable({
    title: v.string(),
    type: v.union(
      v.literal("audio"),
      v.literal("video"),
      v.literal("image"),
      v.literal("channel"),
      v.literal("website"),
      v.literal("email"),
      v.literal("social")
    ),
    url: v.string(),
    thumbnail: v.optional(v.string()),
    isActive: v.boolean(),
    category: v.optional(v.string()),
  }),

  bookmarks: defineTable({
    title: v.string(),
    url: v.string(),
    favicon: v.optional(v.string()),
  }),

  adminSettings: defineTable({
    passwordHash: v.string(),
    adsBlockedCount: v.number(),
    vpnEnabled: v.boolean(),
    currentTheme: v.string(),
    appName: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
  }),
});
