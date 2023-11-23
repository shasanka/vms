"use client";
import React, { useState } from "react";
import { IVisitor } from "@/interface/common";
import { useQuery } from "react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
interface ISearchVisitorProps {
  setVisitor: (visitor: IVisitor | null) => void;
  setIsGetClicked: (isClicked: boolean) => void;
}
const SearchVisitor = ({
  setVisitor,
  setIsGetClicked,
}: ISearchVisitorProps) => {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState<string | null>(null);

  const [phoneNo, setPhoneNo] = useState<string>("9829889019");
  const handlePhoneNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const phoneNo = e.target.value;
    if (!phoneNo) {
      setVisitor(null);
    }
    setPhoneNo(phoneNo);
  };

  const getVisitor = async () => {
    if (phoneNo.length !== 10) {
      setVisitor(null);
      setError("Enter 10 digit number");
      return;
    }
    if (error) setError(null);
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
          setIsGetClicked(true);
          setVisitor(null);
          setError('Visitor not found')
          // enqueueSnackbar("Unable to get visitor", {
          //   variant: "error",
          //   anchorOrigin: {
          //     horizontal: "right",
          //     vertical: "top",
          //   },
          //   autoHideDuration: 1500,
          // });
        }
      } catch (E) {
        setError('Visitor not found')
        setVisitor(null);
        setIsGetClicked(true);
        // enqueueSnackbar("Unable to find visitor", {
        //   variant: "error",
        //   autoHideDuration: 1500,
        //   anchorOrigin: {
        //     horizontal: "right",
        //     vertical: "top",
        //   },
        // });
      }
    },
    enabled: false,
  });

  return (
    <div className="flex  gap-4 flex-col items-start justify-start md:flex-row md:items-center">
      <div>
        <input
          placeholder="Phone number"
          type="number"
          required
          value={phoneNo}
          // defaultValue={9829889019}
          onChange={handlePhoneNoChange}
        />
        {error && (
          <div className="  bg-red-500 text-white w-fit rounded-md text-sm py-1 px-3 mt-2">
            {error}
          </div>
        )}
      </div>
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
            setIsGetClicked(false);
            setPhoneNo("");
            setError(null);
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
