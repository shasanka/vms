import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import VisitorsTable from "@/components/VisitorsTable";
import { getServerSession } from "next-auth";


async function getData() {
  const session = await getServerSession(authOptions);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/visitor`, {
      headers: new Headers({
        Authorization: `Bearer ${session?.user.accessToken}`,
        "Content-Type": "application/json",
      }),
    });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      console.log(await res.json());
      throw new Error("Failed to fetch data");
    }
    const visitors = await res.json();
    return visitors;
  } catch (error) {
    return error;
  }
}

export default async function Home() {
  // const res = await getData();
  // console.log("🚀 ~ file: page.tsx:30 ~ Home ~ res:", res)
  return (
    <>
      {/* {res.data ? (
        ) : (
          <p>Loading or no data available.</p>
          )} */}
          <VisitorsTable />
    </>
  );
}
