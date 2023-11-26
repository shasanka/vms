"use client";
import { IEntry, IVisitor } from "@/interface/common";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import React, { useEffect,  useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Pdf from "./shared/Pdf";
import {
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import { QRCodeCanvas } from "qrcode.react";

interface IEntryFormProps {
  visitor: IVisitor;
}
const EntryForm = ({ visitor }: IEntryFormProps) => {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, register, reset } = useForm<Partial<IEntry>>({
    defaultValues: {
      visitorId: visitor._id,
      whomToMeet: "",
      department: "",
    },
  });

  const [entry, setEntry] = useState<Partial<IEntry> | null>(null);

  const mutation = useMutation({
    mutationKey: ["entry"],
    mutationFn: async (data: Partial<IEntry>) => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/entry`,
          JSON.stringify(data),
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 201) {
          setEntry(res.data.data);

          enqueueSnackbar("Entry added successfully", {
            variant: "success",
            anchorOrigin: {
              horizontal: "right",
              vertical: "top",
            },
            autoHideDuration: 1500,
          });

          return res.data.data;
        } else {
          setEntry(null);
          enqueueSnackbar("Unable to add entry", {
            variant: "error",
            anchorOrigin: {
              horizontal: "right",
              vertical: "top",
            },
            autoHideDuration: 1500,
          });
        }
      } catch (e) {
        setEntry(null);
        const err = e as AxiosError;
        enqueueSnackbar(err.response?.statusText, {
          variant: "error",
          autoHideDuration: 1500,
        });
      }
    },
  });

  useEffect(() => {
    reset({
      visitorId: visitor._id,
      whomToMeet: "",
      department: "",
    });
  }, [visitor]);

  const submit: SubmitHandler<Partial<IEntry>> = async (data) => {
    const res = await mutation.mutateAsync(data);
  };

  const [v,setV] = useState<IVisitor|null>(null)
  const [e,setE] = useState<Partial<IEntry>|null>(null)
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  useEffect(() => {
    try {
      const qrCodeCanvasRef = document.getElementById(
        "QrCode"
      ) as HTMLCanvasElement;
      if (qrCodeCanvasRef) {
        const qrCodeDataUri = qrCodeCanvasRef
          .toDataURL("image/jpg", 0.3)
          .replace("image/jpeg", "image/octet-stream");
        if (qrCodeDataUri) setQrUrl(qrCodeDataUri);
      }
    } catch (E) {
      setQrUrl(null);
      enqueueSnackbar("Error in qr generation", {
        variant: "error",
        autoHideDuration: 1500,
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
  }, [e?._id]);
  // }, [entry?._id]);


  useEffect(()=>{
    getData()
  },[])

  const getData = async()=>{
    const vis  = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/visitor/9829889019`,{
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    setV(vis.data.data[0])
    const en  = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/entry/655e182b4ee47438f6d1084a`,{
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    setE(en.data.data)

    
  }


  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center ">
          <input
            placeholder="Whom to meet?"
            type="text"
            required
            {...register("whomToMeet")}
          />
          <input
            placeholder="Department"
            type="text"
            required
            {...register("department")}
          />
          <button
            className="px-2 py-1 bg-slate-600 text-white rounded-md w-fit h-fit"
            type="submit"
          >
            Generate QR
          </button>
        </div>
      </form>
      {e && <QRCodeCanvas id="QrCode" value={`${process.env.NEXT_PUBLIC_LINK}/api/v1/entry/${e._id}`} />}
      {e && v && qrUrl && (
        <div className="bg-gray-600 text-white px-2 py-1 w-fit h-fit rounded-md hover:bg-gray-700">
          <PDFDownloadLink
            document={<Pdf entry={e} visitor={v} qrUrl={qrUrl} />}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download PDF"
            }
          </PDFDownloadLink>
        </div>
      )}
      {e && v && qrUrl && (
          // <Pdf entry={entry} visitor={visitor} qrUrl={qrUrl} />
        <PDFViewer className="w-full h-[800px] mb-[100px]" >
          <Pdf entry={e} visitor={v} qrUrl={qrUrl} />
        </PDFViewer>
      )}
    </>
  );
};

export default EntryForm;
