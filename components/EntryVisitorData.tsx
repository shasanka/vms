import { IDProofType,  IVisitor } from "@/interface/common";
import React from "react";
import DisplayItem from "./shared/DisplayItem";

const EntryVisitorData = ({ visitor }: { visitor: IVisitor }) => {

  return (
    <div>
      <h1 className="font-bold text-lg">Visitor Data</h1>
      <div className="flex flex-col gap-10 justify-start md:gap-4 lg:flex-row">
        <DisplayItem label="Name" data={visitor.firstName + visitor.lastName} />
        <DisplayItem label="Phone No." data={visitor.phoneNo.toString()} />
        <DisplayItem label="Address" data={visitor.address} />
        <DisplayItem label="State" data={visitor.state} />
        <DisplayItem label="District" data={visitor.district} />
        <DisplayItem label="Pincode" data={visitor.pincode.toString()} />
        <DisplayItem
          label="ID proof type"
          data={IDProofType[visitor.idProofType]}
        />
        <DisplayItem label="ID proof number" data={visitor.idProofNumber} />
      </div>
    </div>
  );
};

export default EntryVisitorData;