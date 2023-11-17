import React from "react";
import VisitorsTable from "./VisitorsTable";
import Link from "next/link";

const HomePageComponent = () => {
  return (
    <div className="flex flex-col gap-4">
      <Link href={"/home/addvisitor"} className="bg-gray-600 text-white px-2 py-1 rounded-md hover:bg-gray-700 w-24">Add Visitor</Link>
      <VisitorsTable />
    </div>
  );
};

export default HomePageComponent;
