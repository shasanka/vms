import LogoutButton from "@/components/LogoutButton";
import UserInfo from "@/components/UserInfo";
import VisitorForm from "@/components/VisitorForm";
import { signOut } from "next-auth/react";

const Home = () => {
  return (
    // <div>
    //   <UserInfo />
    // </div>
    <div className="grid place-items-center h-screen ">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 min-w-[400] ">
        <h1 className="text-xl font-bold my-4">Enter the details</h1>
        <VisitorForm />
        {/* <LogoutButton /> */}
      </div>
    </div>
  );
};

export default Home;
