"use client";
import { DistrictType } from "@/app/api/auth/state/[stateName]/route";
import { useVisitorFormHooks } from "@/hooks/useVisitorFormHooks";
import { IDProofType, IVisitor } from "@/interface/common";
import { generateIOptsFromEnum } from "@/utils/common";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export interface State{
  _id:string;
  name:string
}

const VisitorForm = () => {
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
    const res = await fetch("api/visitor", {
      method: "POST",
      body: JSON.stringify(data),
      next:{tags:['visitors']}
      
    });

    if (res.ok) {
      const response = await res.json();

    } else {
      console.log("pk");
    }
  };

  const idProofOptions = generateIOptsFromEnum(
    IDProofType,
    [],
    [{ newStr: " ", oldStr: "_" }]
  );

  return (
    // <h></h1>
    // <form action={formHandler} onSubmit={handleSubmit}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1 lg:grid-cols-2 md:gap-2">
          <input
            placeholder="Phone Number"
            type="number"
            required
            {...register("phoneNo", {
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
          {errors.phoneNo && (
            <span className="bg-red-600 text-sm h-5 mt-2 w-fit px-2 text-white rounded-md">
              {errors.phoneNo?.message}
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
          {states.map((state:State, idx) => (
            <option key={idx} value={state.name} >
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

        <button className="bg-gray-600 hover:bg-gray-700 rounded-md text-white py-2">
          Submit
        </button>
      </div>
    </form>
  );
};

export default VisitorForm;
