"use client";
import { DistrictType } from "@/app/api/auth/state/[stateName]/route";
import { useVisitorFormHooks } from "@/hooks/useVisitorFormHooks";
import { IDProofType, IVisitor } from "@/interface/common";
import { generateIOptsFromEnum } from "@/utils/common";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export interface State {
  _id: string;
  name: string;
}

const VisitorForm = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IVisitor>();

  const {
    districts,
    pincodes,
    states,
    handleDistrictChange,
    handleStateChange,
  } = useVisitorFormHooks();

  const onSubmit: SubmitHandler<IVisitor> = async (data) => {
    console.log(
      "🚀 ~ file: VisitorForm.tsx:31 ~ constonSubmit:SubmitHandler<IVisitor>= ~ data:",
      data
    );

    const visitor: IVisitor = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: Number(data.phoneNumber),
      email: data.email,
      address: data.address,
      state: data.state,
      district: data.district,
      pincode: Number(data.pincode),
      idProofType: Number(data.idProofType),
      idProofNumber: data.idProofNumber,
    };
    const res = await fetch(`http://127.0.0.1:3001/api/v1/visitor`, {
      method: "POST",
      body: JSON.stringify(visitor),
      cache: "no-cache",
      headers: new Headers({
        Authorization: `Bearer ${session?.user.accessToken}`,
        "Content-Type": "application/json",
      }),
    });

    if (res.ok) {
      const response = await res.json();
      console.log(
        "🚀 ~ file: VisitorForm.tsx:39 ~ constonSubmit:SubmitHandler<IVisitor>= ~ response:",
        response
      );
    } else {
      const r = await res.json();
      console.log(
        "🚀 ~ file: VisitorForm.tsx:62 ~ constonSubmit:SubmitHandler<IVisitor>= ~ r:",
        res
      );
    }
  };

  const idProofOptions = generateIOptsFromEnum(
    IDProofType,
    [],
    [{ newStr: " ", oldStr: "_" }]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1 lg:grid-cols-2 md:gap-2">
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
          {districts?.map((district: DistrictType, idx) => (
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

        <button className="bg-gray-600 hover:bg-gray-700 rounded-md text-white py-2" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default VisitorForm;
