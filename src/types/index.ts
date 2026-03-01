export interface Product {
    id: string;
    name: string;
    description: string;
    price: string | number; // Support both formats
    category: string;
    image: string;
    specs: Record<string, string>;
    rating?: number;
    reviews?: number;
    inStock?: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}
