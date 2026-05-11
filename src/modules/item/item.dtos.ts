export type ItemDTO = {
    name: string;
    category?: string;
    totalQuantity: number;
    location: string;
};

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

export type ListByCategoryDTO = {
    category: string;
};
export type ListByLocationDTO = {
    location: string;
};
