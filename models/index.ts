import {
  DocumentType,
  MovementType,
  PaymentMethod,
  StatusSale,
  SunatStatus,
  UnitMeasure,
  UserRole,
} from "@/app/generated/prisma/enums";
import {
  array,
  boolean,
  date,
  decimal,
  email,
  enum_,
  InferInput,
  minLength,
  minValue,
  number,
  object,
  optional,
  pipe,
  string,
} from "valibot";

export const ProductSchema = pipe(
  object({
    name: pipe(string(), minLength(3, "El nombre debe tener 3 caracteres")),
    description: optional(string()),
    purchasePrice: pipe(string(), decimal("Ingrese un valor valido")),
    salePrice: pipe(string(), decimal("Ingrese un valor valido")),
    stock: pipe(number(), minValue(0, "El stock no puede ser negativo")),
    unitMeasure: pipe(enum_(UnitMeasure)),
    status: pipe(boolean("Ingrese un valor boolean")),
    categoryId: pipe(array(string())),
  })
);

export type InputProduct = InferInput<typeof ProductSchema>;

export const UserSchema = pipe(
  object({
    name: pipe(string(), minLength(3, "El nombre debe tener 3 caracteres")),
    lastName: pipe(string(), minLength(3, "El nombre debe tener 3 caracteres")),
    email: pipe(string(), email("Ingrese un correo valido")),
    dni: pipe(string(), minLength(8, "El Dni debe tener 8 caracteres")),
    address: optional(string()),
    phone: pipe(string(), minLength(9, "El telefono debe tener 9 digitos")),
    role: pipe(enum_(UserRole)),
    refreshToken: optional(string()),
    status: pipe(boolean("Ingrese un valor boolean")),
    password: pipe(
      string(),
      minLength(6, "La contrasena de tener 6 caracteres")
    ),
  })
);

export type InputUser = InferInput<typeof UserSchema>;

export const CustomerSchema = pipe(
  object({
    name: pipe(string(), minLength(3, "El nombre debe tener 3 caracteres")),
    lastName: optional(string()),
    ruc: optional(string()),
    phone: optional(string()),
    email: optional(pipe(string(), email())),
    address: optional(string()),
    status: pipe(boolean("Ingrese un valor boolean")),
  })
);

export type InputCustomer = InferInput<typeof CustomerSchema>;

export const CategorySchema = pipe(
  object({
    name: pipe(string(), minLength(3, "El nombre debe tener 3 caracteres")),
    description: optional(string()),
    status: pipe(boolean("Ingrese un valor boolean")),
  })
);

export type InputCategory = InferInput<typeof CategorySchema>;

export const DetailSaleSchema = pipe(
  object({
    quantity: pipe(number(), minValue(0, "La cantidad no puede ser negativo")),
    price: pipe(string(), decimal("Ingrese un valor valido")),
    productId: pipe(
      string(),
      minLength(3, "El producto debe tener 3 caracteres")
    ),
  })
);

export type InputDetailSale = InferInput<typeof DetailSaleSchema>;

export const SaleSchema = pipe(
  object({
    paymentMethod: pipe(enum_(PaymentMethod)),
    documentType: pipe(enum_(DocumentType)),
    userId: optional(string()),
    customerId: optional(string()),
    detail: pipe(
      array(DetailSaleSchema),
      minLength(1, "La venta debe tener al menos un producto")
    ),
  })
);

export type InputSale = InferInput<typeof SaleSchema>;

export const InventoryMovementSchema = pipe(
  object({
    type: pipe(enum_(MovementType)),
    quantity: pipe(number(), minValue(0, "La cantidad no puede ser negativo")),
    description: optional(string()),
    userId: pipe(string(), minLength(3, "La usuario debe tener 3 caracteres")),
    productId: pipe(
      string(),
      minLength(3, "El producto debe tener 3 caracteres")
    ),
  })
);

export type InputInventoryMovement = InferInput<typeof InventoryMovementSchema>;

export const SunatInvoiceSchema = pipe(
  object({
    saleId: pipe(string(), minLength(3, "La venta debe tener 3 caracteres")),
    serie: pipe(string(), minLength(3, "La serie debe tener 3 caracteres")),
    sequence: pipe(number(), minValue(0, "La cantidad no puede ser negativo")),
    xml: optional(string()),
    cdr: optional(string()),
    pdf: optional(string()),
    statusSunat: pipe(enum_(SunatStatus)),
    hashFirma: optional(string()),
  })
);

export type InputSunatInvoice = InferInput<typeof SunatInvoiceSchema>;
