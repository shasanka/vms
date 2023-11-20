"use client";
import React, { useCallback, useState } from "react";
import { IVisitor } from "@/interface/common";
import EntryVisitorData from "./EntryVisitorData";
import EntryList from "./EntryList";

const EntryPageComponents = () => {
  const [visitor, setVisitor] = useState<IVisitor | null>(null);
  const handleSetVisitor = useCallback((visitor: IVisitor | null) => {
    setVisitor(visitor);
  }, []);
  return (
    <div className="flex flex-col gap-4">
      {/* <EntryVisitor setVisitor={handleSetVisitor} />
      {visitor ? <EntryVisitorData visitor={visitor} /> : null}
      <EntryList/> */}
    </div>
  );
};

export default EntryPageComponents;
