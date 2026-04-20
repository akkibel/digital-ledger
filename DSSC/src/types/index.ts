export interface Transaction {
    id: string;
    date: string; // ISO format
    amount: number;
    type: 'DEBT' | 'PAYMENT';
    details?: string;
}

export interface Client {
    id: string;
    name: string;
    phone?: string;
    transactions: Transaction[];
    totalBalance: number;
}

export interface Category {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl?: string; // base64 or URL
    categoryId: string;
}

export interface MissingItem {
    id: string;
    name: string;
    purchased: boolean;
}

export interface AppSettings {
    isConfigured: boolean;
    language: 'en' | 'es';
    companyName: string;
    logoUrl?: string; // base64
    currencySymbol: string;
    country: string;
}
