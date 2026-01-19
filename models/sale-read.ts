import { PaymentMethod, DocumentType } from "@/app/generated/prisma/client";

export interface SaleDetailDTO {
  product: {
    productId: string;
    name: string;
  };
  quantity: number;
  price: number;
  subtotal: number;
}

export interface SaleReadDTO {
  documentNumber: string;
  documentType: DocumentType;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  saleTotal: number;
  userId?: string;
  customerId?: {
    name: string;
    lastName: string;
    address: string;
  };
  detail: SaleDetailDTO[];
}
