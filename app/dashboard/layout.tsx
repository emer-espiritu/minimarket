import { ReactNode } from "react";
import Dashboard from "@/components/sidebar";
import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AuthProvider } from "../context/authContext";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/signin");
  }
  return (
    <AuthProvider user={user}>
      <Dashboard>{children}</Dashboard>
    </AuthProvider>
  );
}
