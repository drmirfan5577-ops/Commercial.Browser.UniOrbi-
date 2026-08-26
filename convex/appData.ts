import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getSettings = query({
  args: {},
  handler: async (ctx) => {
    const admin = await ctx.db.query("adminSettings").first();
    const tickers = await ctx.db
      .query("tickerMessages")
      .filter(q => q.eq(q.field("isActive"), true))
      .collect();
    const customApps = await ctx.db
      .query("customApps")
      .filter(q => q.eq(q.field("isActive"), true))
      .collect();
    return { admin, tickers, customApps };
  },
});

export const initializeDefaults = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("adminSettings").first();
    if (existing) return existing._id;

    const adminId = await ctx.db.insert("adminSettings", {
      passwordHash: "ESB@Admin2024",
      adsBlockedCount: 1247,
      vpnEnabled: false,
      currentTheme: "emerald",
    });

    const defaultTickers = [
      "All Systems Online",
      "Ads Blocked: 1247",
      "Network: Active",
      "Speed: Optimized",
      "Privacy: Maximum",
      "EvEr SmArT BrOwSeR - Pakistan's Smartest Digital Browser",
      "بسم اللہ الرحمٰن الرحیم",
    ];

    for (let i = 0; i < defaultTickers.length; i++) {
      await ctx.db.insert("tickerMessages", {
        message: defaultTickers[i],
        isActive: true,
        order: i,
      });
    }

    const defaultApps = [
      { name: "SMART News", nameUrdu: "سمارٹ نیوز", url: "https://news.google.com", icon: "📡", row: 2, position: 0, isActive: true },
      { name: "YouTube", nameUrdu: "یوٹیوب", url: "https://youtube.com", icon: "▶️", row: 2, position: 1, isActive: true },
      { name: "WhatsApp", nameUrdu: "واٹس ایپ", url: "https://web.whatsapp.com", icon: "💬", row: 2, position: 2, isActive: true },
      { name: "Facebook", nameUrdu: "فیس بک", url: "https://facebook.com", icon: "👤", row: 2, position: 3, isActive: true },
      { name: "Play Store", nameUrdu: "پلے اسٹور", url: "https://play.google.com", icon: "🛒", row: 2, position: 4, isActive: true },
    ];

    for (const app of defaultApps) {
      await ctx.db.insert("customApps", app);
    }

    return adminId;
  },
});

export const getAdminSettings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("adminSettings").first();
  },
});

export const updateTheme = mutation({
  args: { theme: v.string() },
  handler: async (ctx, args) => {
    const admin = await ctx.db.query("adminSettings").first();
    if (admin) {
      await ctx.db.patch(admin._id, { currentTheme: args.theme });
    }
  },
});

export const toggleVPN = mutation({
  args: {},
  handler: async (ctx) => {
    const admin = await ctx.db.query("adminSettings").first();
    if (admin) {
      await ctx.db.patch(admin._id, { vpnEnabled: !admin.vpnEnabled });
    }
  },
});

export const getCustomApps = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("customApps")
      .filter(q => q.eq(q.field("isActive"), true))
      .collect();
  },
});

export const getTickers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("tickerMessages")
      .filter(q => q.eq(q.field("isActive"), true))
      .collect();
  },
});
