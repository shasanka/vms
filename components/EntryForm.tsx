"use client";
import { IEntry, IVisitor } from "@/interface/common";
import { QrScanner } from "@yudiel/react-qr-scanner";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useQRCode } from "next-qrcode";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
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
        console.log("🚀 ~ file: EntryForm.tsx:37 ~ mutationFn: ~ res:", res);
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
        console.log("🚀 ~ file: EntryForm.tsx:34 ~ mutationFn: ~ res:", e);
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
    mutation.mutateAsync(data);
  };
  const { Image: Im } = useQRCode();
  const [data, setData] = useState("No result");
  const [error, setError] = useState("No Error");
  // const [result, setResult] = useState("No result");

  const router = useRouter();
  const handleDecode = (result: string) => {
    // Navigate to the result page with the decoded data
    router.push(`${result}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-4 sm:flex-row md:flex-row lg:flex-row items-center">
          <input
            placeholder="Visitor ID"
            type="text"
            readOnly
            required
            {...register("visitorId")}
          />
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
      {entry ? (
        <Im
          text={`${process.env.NEXT_PUBLIC_LINK}/entry/${entry._id}`}
          options={{
            type: "image/jpeg",
            quality: 0.3,
            errorCorrectionLevel: "M",
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: "#010599FF",
              light: "#FFBF60FF",
            },
          }}
        />
      ) : null}
      <QrScanner
        onDecode={(result) => {
          setData(result);
          handleDecode(result);
        }}
        onError={(error) => setError(error.message)}
      />
      <pre>{JSON.stringify(data)}</pre>
      <pre>{JSON.stringify(error)}</pre>
      {/* <pre>{JSON.stringify(result)}</pre> */}
    </div>
  );
};

export default EntryForm;
