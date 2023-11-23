"use client";
import React, { useState } from "react";

import SearchVisitor from "./Home/SearchVisitor";
import { IVisitor } from "@/interface/common";
import VisitorInfoDisplay from "./VisitorInfoDisplay";
import EntryForm from "./EntryForm";
import AddVisitorAndEntry from "./Home/AddVisitorAndEntry";

const HomePageComponent = () => {
  const [visitor, setVisitor] = useState<IVisitor | null>(null);
  const [isGetClicked, setIsGetClicked] = useState<boolean>(false);

  const [shouldAddVisitor, setShouldAddVisitor] = useState<boolean>(false);


  const handleGetClicked = (isClicked: boolean) => {
    setIsGetClicked(isClicked);
  };

  const handleAddVisitorClick = () => {
    setShouldAddVisitor(true);
  };
  return (
    <>
    {shouldAddVisitor ? (
      <AddVisitorAndEntry setShouldAddVisitor={()=>setShouldAddVisitor(false)} />
    ) : (
      <div className="flex flex-col gap-4 items-start">
        <SearchVisitor setVisitor={setVisitor} setIsGetClicked={handleGetClicked} />
        
        {visitor && (
          <>
            <VisitorInfoDisplay visitor={visitor} />
            <EntryForm visitor={visitor} />
          </>
        )}

        {!visitor && isGetClicked && (
          <button
            className="px-2 py-1 bg-slate-600 text-white rounded-md w-fit h-fit"
            onClick={handleAddVisitorClick}
          >
            Add visitor
          </button>
        )}
      </div>
    )}
  </>
  );
};

export default HomePageComponent;
