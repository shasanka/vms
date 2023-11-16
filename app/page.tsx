import { redirect } from "next/navigation";
import Home from "./(private_route)/home/page";
// import { getServerSession } from "next-auth";
export default async function Page() {
  // const session = await getServerSession();
  // if (!session?.user) redirect("/");
  // else redirect("/home");
  redirect("/home");
// return <Home/>
}
