import EntryPageComponents from "@/components/EntryPageComponents";
import React from "react";

const Entry = () => {

  return (
    <>
      {/* <div className="flex flex-col gap-4">
        <EntryVisitor setVisitor={handleSetVisitor} />
        {visitor ? <EntryVisitorData visitor={visitor} /> : null}
      </div> */}
      <EntryPageComponents/>
    </>
  );
};

export default Entry;
