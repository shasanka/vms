import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
export default async function PrivateRoute({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();
  console.log("🚀 ~ file: layout.tsx:10 ~ session:", session);
  if (!session?.user) redirect("/signin");
  return <>{children}</>;
}
