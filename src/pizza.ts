import { z } from "zod";

const bannedToppings = ["glass", "nails", "soap", "battery"];

const pizzaSchema = z
  .object({
    size: z.number().positive("size must be positive"),
    crust: z.enum(["stuffed", "normal"]),
    isDeepDish: z.boolean().optional().default(false),
    toppings: z
      .array(z.string())
      .optional()
      .superRefine((toppings, ctx) => {
        if (!toppings) return;

        for (const t of toppings) {
          if (bannedToppings.includes(t.toLowerCase())) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `topping "${t}" is not allowed on pizza`,
            });
          }
        }
      }),
  })
  .strict();

export type Pizza = z.infer<typeof pizzaSchema>;

// Discriminated union for the rubric
export type PizzaValidationResult =
  | { isPizza: true; pizza: Pizza; errors?: never }
  | { isPizza: false; pizza?: never; errors: string[] };

export function validatePizza(input: unknown): PizzaValidationResult {
  const result = pizzaSchema.safeParse(input);

  if (result.success) {
    return { isPizza: true, pizza: result.data };
  }

  const errors = result.error.issues.map(
    (issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`,
  );

  return { isPizza: false, errors };
}
