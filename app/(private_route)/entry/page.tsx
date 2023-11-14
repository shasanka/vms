"use client";
import EntryVisitor from "@/components/EntryVisitor";
import EntryVisitorData from "@/components/EntryVisitorData";
import { IVisitor } from "@/interface/common";
import React, { useCallback, useState } from "react";

const Entry = () => {
  const [visitor, setVisitor] = useState<IVisitor | null>(null);
  const handleSetVisitor = useCallback((visitor: IVisitor | null) => {
    setVisitor(visitor);
  },[]);
  return (
    <>
      <div className="flex flex-col gap-4">
        <EntryVisitor setVisitor={handleSetVisitor} />
        {visitor ? <EntryVisitorData visitor={visitor} /> : null}
      </div>
    </>
  );
};

export default Entry;
