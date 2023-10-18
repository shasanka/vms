// import LoginForm from "@/components/LoginForm";
// import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import Dashboard from "./dashboard/page";

// export default async function Home() {
//   // const session = await getServerSession();
//   // if (session) redirect("/dashboard");
//   // return <LoginForm />;
//   // return <>home</>;

//   // redirect("/dashboard");

//   return <Dashboard />;
// }
export default async function Home() {
  redirect("/dashboard");
}
