"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback} from "react";
import { debounce } from "lodash";
import { IEntry, IVisitor, Response } from "@/interface/common";

const EntryVisitor = ({
  setVisitor,
}: {
  setVisitor: (visitor: IVisitor | null) => void;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    // formState: { errors },
  } = useForm<IEntry>();

  const visitorWatcher = watch("visitorId");

  const onSubmit: SubmitHandler<IEntry> = async (data) => {
    console.log(data);

    const res = await fetch("/api/entry", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const resJson = await res.json();
      console.log(resJson);
    } else {
      console.log("ERROR in entry");
    }
  };


  const fetchVisitorData = async (phoneNo: number) => {
    try {
      const res = await fetch(`api/visitor/${phoneNo}`, {
        method: "GET",
      });
      if (res.ok) {
        const resJson: Response<IVisitor> = await res.json();

        setValue("visitorId", resJson.data._id);
        setVisitor(resJson.data);
      } else {
        setValue("visitorId", "");
        setVisitor(null);
      }
    } catch {
      setVisitor(null);
    }
  };

  const debouncedFetchData = useCallback(
    debounce((phoneNo) => {
      fetchVisitorData(phoneNo);
    }, 500),
    []
  );

  const handlePhoneNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const phoneNo = e.target.value;

    if (!phoneNo) {
      setValue("visitorId", "");
      setVisitor(null);
      return;
    }

    debouncedFetchData(phoneNo);
  };

  return (
    <>
      <div className="flex flex-col">
        <input
          placeholder="Phone number"
          type="tel"
          required
          onChange={handlePhoneNoChange}
         
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center gap-2 lg:flex-row lg:items-center lg:justify-start">
          <input
            placeholder="Visitor ID"
            type="string"
            required
            readOnly
            {...register("visitorId")}
          />
          {visitorWatcher ? (
            <button
              className="px-2 py-1 bg-slate-600 text-white rounded-md w-fit h-fit"
              type="submit"
            >
              Add Entry
            </button>
          ) : null}
        </div>
      </form>
    </>
  );
};

export default EntryVisitor;
