import { z } from 'zod';

export const ProductSchema = z.object({
	id: z.string(),
	name: z.string(),
	price: z.number().positive(),
	quantity: z.number().int().positive()
});

export const AddressSchema = z.object({
	id: z.string(),
	recipient: z.string(),
	street: z.string(),
	city: z.string(),
	zip: z.string(),
	country: z.string()
});

export const OrderSchema = z.object({
	cart: z.array(ProductSchema),
	address: AddressSchema,
	total: z.number().positive()
});

export type OrderSchema = z.infer<typeof OrderSchema>;
export type AddressSchema = z.infer<typeof AddressSchema>;
export type ProductSchema = z.infer<typeof ProductSchema>;
