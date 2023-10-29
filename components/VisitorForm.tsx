"use client";
import { DistrictType } from "@/app/api/auth/district/route";
import { useVisitorFormHooks } from "@/hooks/useVisitorFormHooks";
import { IDProofType, IVisitor } from "@/interface/common";
import { generateIOptsFromEnum } from "@/utils/common";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
    const res = await fetch("api/register_visitor", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(
      "🚀 ~ file: VisitorForm.tsx:29 ~ constonSubmit:SubmitHandler<IVisitor>= ~ res:",
      res
    );

    if (res.ok) {
      const response = await res.json();
      console.log(
        "🚀 ~ file: VisitorForm.tsx:38 ~ constonSubmit:SubmitHandler<IVisitor>= ~ response:",
        response
      );
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
      <div className="grid grid-cols-2 gap-2">
        <div className="grid grid-rows">
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
        </div>
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
          {states.map((state, idx) => (
            <option key={idx} value={state} defaultValue={"ASSAM"}>
              {state}
            </option>
          ))}
        </select>
        <select
          placeholder="District"
          {...register("district")}
          onChange={handleDistrictChange}
        >
          {districts?.map((district: DistrictType, idx) => (
            <option key={idx} value={district._id}>
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

        <button className="bg-green-600 hover:bg-green-700 rounded-md text-white py-2">
          Submit
        </button>
      </div>
    </form>
  );
};

export default VisitorForm;
