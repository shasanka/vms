import { redirect } from "next/navigation";
// import Home from "../(private_route)/home/page";
import { getServerSession } from "next-auth";
import Home from "./(private_route)/home/page";

export default async function Page() {
  const session = await getServerSession();
  if (!session?.user) redirect("/auth/sigin");
  else redirect('/home')
  // return (
  //   <>
  //     <Home />
  //   </>
  // );
}
