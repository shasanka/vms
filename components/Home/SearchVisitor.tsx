"use client";
import React, { useState } from "react";
import { IVisitor } from "@/interface/common";
import { useQuery } from "react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
interface ISearchVisitorProps {
  setVisitor: (visitor: IVisitor | null) => void;
}
const SearchVisitor = ({ setVisitor }: ISearchVisitorProps) => {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();

  const [phoneNo, setPhoneNo] = useState<string>("");
  const handlePhoneNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const phoneNo = e.target.value;
    if (!phoneNo) {
      setVisitor(null);
    }
    setPhoneNo(phoneNo);
  };

  const getVisitor = async () => {
    await refetch();
  };

  const { refetch } = useQuery({
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/visitor/${Number(
            phoneNo
          )}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 200) {
          setVisitor(res.data.data[0]);
          enqueueSnackbar("Got visitor", {
            variant: "success",
            anchorOrigin: {
              horizontal: "right",
              vertical: "top",
            },
            autoHideDuration: 1500,
          });
        } else {
          enqueueSnackbar("Unable to get visitor", {
            variant: "error",
            anchorOrigin: {
              horizontal: "right",
              vertical: "top",
            },
            autoHideDuration: 1500,
          });
        }
      } catch (E) {
        setVisitor(null);
        enqueueSnackbar("Unable to find visitor", {
          variant: "error",
          autoHideDuration: 1500,
        });
      }
    },
    enabled: false,
  });

  return (
    <div className="flex  gap-4 flex-col items-start justify-start md:flex-row md:items-center">
      <input
        placeholder="Phone number"
        type="tel"
        required
        value={phoneNo}
        onChange={handlePhoneNoChange}
      />
      <div className="flex gap-4 items-start justify-start">
        <button
          className="px-2 py-1 bg-slate-600 text-white rounded-md w-fit h-fit"
          onClick={getVisitor}
        >
          Search
        </button>
        <button
          className="px-2 py-1 bg-slate-600 text-white rounded-md w-fit h-fit"
          onClick={() => {
            setPhoneNo("");
            setVisitor(null);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchVisitor;
