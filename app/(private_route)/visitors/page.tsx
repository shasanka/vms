import React from "react";
import { QRCodeSVG } from "qrcode.react";
const VisitorsPage = () => {
  return (
    <>
      <div className="text-black py-10">VisitorsPage</div>
      <QRCodeSVG value="https://reactjs.org/" />,
    </>
  );
};
export default VisitorsPage;
