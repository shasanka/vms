import React from "react";

const IndividualEntry = ({ params }: { params: { entryId: string } }) => {
  console.log("🚀 ~ file: page.tsx:8 ~ entryId:", params.entryId);
  return <div>IndividualEntry</div>;
};

export default IndividualEntry;
