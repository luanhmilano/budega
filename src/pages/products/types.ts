export interface VariantOption {
    label: string;
    value: string;
}

export interface Variant {
    name: string;
    options: VariantOption[];
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    variants?: Variant[];
}

export interface ProductsProps {
    isLoading: boolean;
    error: string | null;
    product: Product | null;
    productPriceFormatted: string;
    selectedVariants: { [key: string]: string };
    handleVariantChange: (variantName: string, value: string) => void;
    handleAddToCart: () => void;
}