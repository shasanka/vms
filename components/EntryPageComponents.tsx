"use client";
import React, { useEffect, useState } from "react";

import { QrScanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { IEntry } from "@/interface/common";
import { useSession } from "next-auth/react";
import EntryDisplay from "./EntryDisplay";

const EntryPageComponents = () => {
  // const { enqueueSnackbar } = useSnackbar();
  const [shouldScan, setShouldScan] = useState<boolean>(false);
  const [entryData, setEntryData] = useState<IEntry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  // const router = useRouter();
  const handleDecode = (result: string) => {
    getData(result);
  };
  // useEffect(() => {
  //   getData("655e0a00c8f71e5f0d4d7a41");
  // }, []);
  const getData = async (result: string) => {
    setShouldScan(false);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/entry/${result}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setShouldScan(false);
        setEntryData(res.data.data);
      }
    } catch (e) {
      const err = e as AxiosError;
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        {!shouldScan ? (
          <button
            onClick={() => {
              setEntryData(null);
              setShouldScan((prevState) => !prevState);
            }}
            className="bg-gray-600 hover:bg-gray-700 w-fit px-2 py-1 text-white rounded-md"
          >
            Scan
          </button>
        ) : null}
      </div>
      {shouldScan ? (
        <QrScanner
          onDecode={(result) => {
            handleDecode(result);
          }}
          onError={(error) => {
            // console.log("🚀 ~ file: EntryPageComponents.tsx:73 ~ EntryPageComponents ~ error:", error)
            // setError(error.message)
          }}
          scanDelay={2000}
        />
      ) : null}
      {entryData && <EntryDisplay entry={entryData} />}
      <pre>{error}</pre>
    </div>
  );
};

export default EntryPageComponents;
