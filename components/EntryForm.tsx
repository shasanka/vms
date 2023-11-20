import { IEntry, IVisitor } from "@/interface/common";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
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

  const mutation = useMutation({
    mutationKey: ["entry"],
    mutationFn: async (data: Partial<IEntry>) => {
      try {
        const res  = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/entry`,JSON.stringify(data), {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
            "Content-Type": "application/json",
          },
        })
        if (res.status === 201) {
          enqueueSnackbar("Entry added successfully", {
            variant: "success",
            anchorOrigin: {
              horizontal: "right",
              vertical: "top",
            },
            autoHideDuration: 1500,
          });
        } else {
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
        console.log("🚀 ~ file: EntryForm.tsx:34 ~ mutationFn: ~ res:", e)
        const err = e as AxiosError
        // if(axios.isAxiosError(err)){
          enqueueSnackbar(err.response?.statusText, {
            variant: "error",
            autoHideDuration: 1500,
          });
        // }
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
    mutation.mutateAsync(data)
  };
  return (
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
          Submit
        </button>
      </div>
    </form>
  );
};

export default EntryForm;
