"use client";
import { useVisitorFormHooks } from "@/hooks/useVisitorFormHooks";
import { IDProofType, IVisitor } from "@/interface/common";
import { generateIOptsFromEnum } from "@/utils/common";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export interface State {
  id: string;
  name: string;
}

interface IVisitorFormProps{
  onSuccessFullSubmit? :()=>void
}
const VisitorForm = ({onSuccessFullSubmit}:IVisitorFormProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IVisitor>();

  const {
    districts,
    states,
    pincodes,
    handleDistrictChange,
    handleStateChange,
  } = useVisitorFormHooks();

  const onSubmit: SubmitHandler<IVisitor> = async (data) => {
    const visitor: IVisitor = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: Number(data.phoneNumber),
      email: data.email,
      address: data.address,
      state: data.state || states[0].name,
      district: data.district || districts[0].name,
      pincode: Number(data.pincode) || pincodes[0],
      idProofType: Number(data.idProofType),
      idProofNumber: data.idProofNumber,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/visitor`,
        JSON.stringify(visitor),
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        enqueueSnackbar("Visitor added successfully", {
          variant: "success",
          autoHideDuration: 1000,
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        reset();
        if(onSuccessFullSubmit) onSuccessFullSubmit()
      } 
    } catch (e: any) {
      const err = e as AxiosError;
    
      if (err.isAxiosError && err.response) {
        const responseData = err.response?.data as ApiResponse;
        enqueueSnackbar(responseData.message, {
          variant: "error",
          autoHideDuration: 1500,
        });
      } else {
        console.error("Unhandled error type:", err);
      }
    }
  };

  const idProofOptions = generateIOptsFromEnum(
    IDProofType,
    [],
    [{ newStr: " ", oldStr: "_" }]
  );

  return (
    <div className="max-w-4xl">
    <form onSubmit={handleSubmit(onSubmit)} >
      <h1 className="text-xl font-bold my-4">Enter visitor details</h1>
      <div className="grid gap-1 md:grid-cols-2">
        <input
          placeholder="Phone Number"
          type="number"
          required
          {...register("phoneNumber", {
            minLength: {
              value: 10,
              message: "*Invalid",
            },
            maxLength: {
              value: 10,
              message: "*Invalid",
            },
          })}
        />
        {errors.phoneNumber && (
          <span className="bg-red-600 text-sm h-5 mt-2 w-fit px-2 text-white rounded-md">
            {errors.phoneNumber?.message}
          </span>
        )}
        <input
          placeholder="First name"
          type="text"
          required
          {...register("firstName")}
        />
        <input
          placeholder="Last name"
          type="text"
          required
          {...register("lastName")}
        />
        <input
          placeholder="Email"
          type="text"
          required
          {...register("email")}
        />
        <input
          placeholder="Address"
          type="text"
          required
          {...register("address")}
        />
        <select
          placeholder="State"
          {...register("state")}
          onChange={handleStateChange}
        >
          {states.map((state: State, idx) => (
            <option key={idx} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
        <select
          placeholder="District"
          {...register("district")}
          onChange={handleDistrictChange}
        >
          {districts?.map((district, idx) => (
            <option key={idx} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>
        <select {...register("pincode")} placeholder="Pincode">
          {pincodes?.map((pincode) => (
            <option key={pincode} value={pincode}>
              {pincode}
            </option>
          ))}
        </select>
        <select {...register("idProofType")} placeholder="ID proof type">
          {idProofOptions.map((item, idx) => (
            <option key={idx} value={item.value as number}>
              {item.desc}
            </option>
          ))}
        </select>
        <input
          placeholder="ID proof number"
          type="text"
          required
          {...register("idProofNumber")}
        />

      </div>
        <button
          className="bg-gray-600 hover:bg-gray-700 rounded-md text-white py-1 w-fit px-2 mt-2"
          type="submit"
        >
          Submit
        </button>
    </form>
    </div>
  );
};

export default VisitorForm;


export interface ApiResponse {
  message: string;
  // other properties if needed
}
