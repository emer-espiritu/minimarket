import { IconType } from "react-icons";
import { FaBoxOpen, FaFileInvoice, FaShopify } from "react-icons/fa";
import { HiDocumentReport, HiUserGroup } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { MdCategory, MdDashboard } from "react-icons/md";

interface Items {
  id: number;
  label: string;
  href: string;
  icon: IconType;
}
export const SidebarItems: Items[] = [
  { id: 1, label: "Dashboard", href: "/dashboard", icon: MdDashboard },
  { id: 2, label: "Ventas", href: "/dashboard/sales", icon: FaShopify },
  { id: 3, label: "Productos", href: "/dashboard/products", icon: FaBoxOpen },
  { id: 4, label: "Clientes", href: "/dashboard/customers", icon: HiUserGroup },
  {
    id: 5,
    label: "Categorias",
    href: "/dashboard/categories",
    icon: MdCategory,
  },
  {
    id: 6,
    label: "Reportes",
    href: "/dashboard/reports",
    icon: HiDocumentReport,
  },
  {
    id: 7,
    label: "Facturas",
    href: "/dashboard/invoices",
    icon: FaFileInvoice,
  },
  { id: 8, label: "Ajustes", href: "/dashboard/settings", icon: IoMdSettings },
];
