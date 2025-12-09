import * as z from "zod";

export const TokenFormSchema = z.object({
  TokenName: z
    .string()
    .trim()
    .min(3, { message: "Token name must be at least 3 characters" })
    .max(20, { message: "Token name cannot be more than 20 characters" })
    .refine((val) => val.length > 0, {
      message: "Token name cannot be empty or only spaces",
    }),

  Symbol: z
    .string()
    .trim()
    .min(3, { message: "Symbol must be at least 3 characters" })
    .max(8, { message: "Symbol cannot be more than 8 characters" })
    .regex(/^[A-Z0-9]+$/, {
      message: "Symbol must contain only uppercase letters and numbers",
    }),

  Decimals: z
    .string(),

  TotalSupply: z
    .string(),

  Description: z.string().trim().max(500, { message: "Description cannot be more than 500 characters" }).optional(),
});

export type TokenFormType = z.infer<typeof TokenFormSchema>;
