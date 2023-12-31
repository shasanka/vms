import React from "react";
interface IDisplayItemProps {
  data: string;
  label: string;
}
const DisplayItem = (item:IDisplayItemProps) => {
  return (
    <div className="flex flex-col items-center">
      <h4 className="font-bold">{item.data}</h4>
      <h6 className="text-small">{item.label}</h6>
    </div>
  );
};

export default DisplayItem;
