"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback } from "react";
import { debounce } from "lodash";
import { IEntry, IVisitor, Response } from "@/interface/common";
import axios from "axios";
import { useSession } from "next-auth/react";

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
  } = useForm<IEntry>();

  const visitorWatcher = watch("visitorId");

  const { data: session } = useSession();

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

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/visitor/${phoneNo}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );
      if (res.data) {
        setValue("visitorId", res.data.data[0]._id);
        setVisitor(res.data.data[0]);
      } else {
        setValue("visitorId", "");
        setVisitor(null);
      }
    } catch (e) {
      console.log(e);
      setValue("visitorId", "");
      setVisitor(null);
    }
  };

  const debouncedFetchData = useCallback(
    debounce((phoneNo) => {
      fetchVisitorData(phoneNo);
    }, 500),
    [session?.user]
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
