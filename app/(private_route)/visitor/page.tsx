import React from "react";
import { QRCodeSVG } from "qrcode.react";
import VisitorForm from "@/components/VisitorForm";
const Visitor = () => {
  return (
    <>
      {/* <div className="text-black py-10">VisitorsPage</div>
      <QRCodeSVG value="https://reactjs.org/" />, */}
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 min-w-[400] ">
        <h1 className="text-xl font-bold my-4">Enter the details</h1>
        <VisitorForm />
      </div>
    </>
  );
};
export default Visitor;
