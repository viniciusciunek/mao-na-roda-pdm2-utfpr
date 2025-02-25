import { z } from "zod";

export const productSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Nome obrigatório"),
    description: z.string().min(1, "Descrição obrigatória"),
    brand: z.string().min(1, "Marca obrigatória"),
    price: z.number().min(0, "O preço não pode ser negativo"),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
