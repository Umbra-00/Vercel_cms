import { Product } from "@/types";
import productsData from "@/data/products.json";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const productService = {
    async getProducts(): Promise<Product[]> {
        await delay(800); // Simulate network latency
        return productsData as unknown as Product[];
    },

    async getProductById(id: string): Promise<Product | undefined> {
        await delay(500);
        return (productsData as unknown as Product[]).find((p) => p.id === id);
    },

    async createProduct(product: Product): Promise<Product> {
        await delay(1000);
        console.log("Mock API: Created product", product);
        return product;
    },

    async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
        await delay(1000);
        console.log(`Mock API: Updated product ${id}`, updates);
        const product = (productsData as unknown as Product[]).find((p) => p.id === id);
        if (!product) return null;
        return { ...product, ...updates };
    }
};
