export type CreateItemDTO = {
    name: string;
    category?: string;
    totalQuantity: number;
    location: string;
};

export type UpdateItemDTO = {
    name?: string;
    category?: string;
    totalQuantity?: number;
    location?: string;
};
