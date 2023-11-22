"use client";
import React, { useState } from "react";

import { QrScanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { IEntry } from "@/interface/common";

const EntryPageComponents = () => {
  const {enqueueSnackbar} =useSnackbar()
  const [shouldScan, setShouldScan] = useState<boolean>(false);
  const [entryData , setEntryData] = useState<IEntry | null>(null)
  const [error,setError] = useState<string|null>(null)


  // const router = useRouter();
  const handleDecode = async (result: string) => {

    try{

      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/entry/${result}`)
      if(res.status === 200){
        setShouldScan(false);
        setEntryData(res.data.data)
        
      }
    }catch(e){
      const err = e as AxiosError;
      enqueueSnackbar(err.response?.statusText, {
        variant: "error",
        autoHideDuration: 1500,
      });
    }

  };
  return (
    <div className="flex flex-col gap-4">
      Entry Page
      <button
        onClick={() => setShouldScan((prevState) => !prevState)}
        className="bg-gray-600 hover:bg-gray-700 w-fit px-2 py-1 text-white rounded-md"
      >
        Scan
      </button>
      {shouldScan ? (
        <QrScanner
          onDecode={(result) => {
            handleDecode(result);
          }}
          onError={(error) => setError(error.message)}
        />
      ) : null}
      <pre>{entryData && JSON.stringify(entryData)}</pre>
    </div>
  );
};

export default EntryPageComponents;
