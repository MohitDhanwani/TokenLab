import { pgTable, varchar, text, integer, uuid, pgEnum, bigint, boolean } from "drizzle-orm/pg-core";

export const TokenInformation = pgTable("tokens_instruction", {
  id: uuid("id").defaultRandom().primaryKey(),

  mintAddress: varchar("mintAddress", { length: 255 }).notNull(),
  ownerWallet: varchar("ownerWallet", { length: 255 }).notNull(),

  tokenName: varchar("tokenName", { length: 100 }).notNull(),
  tokenSymbol: varchar("tokenSymbol", { length: 20 }).notNull(),

  decimals: integer("decimals").notNull(),

  initialSupply: bigint("initialSupply", { mode: "number" }).notNull(),
  currentTotalSupply: bigint("currentTotalSupply", { mode: "number" }).notNull(),

  description: text("description").notNull(),

  mintAuthorityUsed: boolean("mintAuthorityStatus").default(false).notNull(),
  freezeAuthorityUsed: boolean("freezeAuthorityStatus").default(false).notNull(),
});
