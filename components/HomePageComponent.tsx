"use client";
import React, { useState } from "react";

import SearchVisitor from "./Home/SearchVisitor";
import { IVisitor } from "@/interface/common";
import EntryVisitorData from "./EntryVisitorData";
import VisitorForm from "./VisitorForm";
import EntryForm from "./EntryForm";

const HomePageComponent = () => {
  const [visitor, setVisitor] = useState<IVisitor | null>(null);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 items-center">
        <SearchVisitor setVisitor={setVisitor} />
      </div>
      {visitor ? <EntryVisitorData visitor={visitor} /> : null}
      {visitor ? <EntryForm visitor={visitor} /> : <VisitorForm />}
    </div>
  );
};

export default HomePageComponent;
