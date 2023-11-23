import React from "react";
import VisitorForm from "../VisitorForm";
import { ChevronLeft} from "lucide-react";


interface IAddVisitorAndEntryProps {
  setShouldAddVisitor: () => void;
}
const AddVisitorAndEntry = ({
  setShouldAddVisitor,
}: IAddVisitorAndEntryProps) => {
  return (
    <div className="max-w-4xl">
      <button
        onClick={setShouldAddVisitor}
        className="flex items-center border-1 hover:bg-slate-100 pr-2 rounded-md border-gray-400"
      >
        <ChevronLeft />
        <span className="text-xs">Go back</span>
      </button>
      <VisitorForm onSuccessFullSubmit={setShouldAddVisitor}/>
    </div>
  );
};

export default AddVisitorAndEntry;
