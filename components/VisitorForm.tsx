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

  const onSubmit: SubmitHandler<IVisitor> = (data) => console.log(data);

  const idProofOptions = generateIOptsFromEnum(
    IDProofType,
    [],
    [{ newStr: " ", oldStr: "_" }]
  );

  return (
    // <form action={formHandler} onSubmit={handleSubmit}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-2">
        <div className="grid grid-rows">
          <input
            placeholder="Phone Number"
            type="number"
            required
            {...register("phone_no", {
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
          {errors.phone_no && (
            <span className="bg-red-600 text-sm h-5 mt-2 w-fit px-2 text-white rounded-md">
              {errors.phone_no?.message}
            </span>
          )}
        </div>
        <input
          placeholder="First name"
          type="text"
          required
          {...register("first_name")}
        />
        <input
          placeholder="Last name"
          type="text"
          required
          {...register("last_name")}
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
        <select {...register("id_proof_type")} placeholder="ID proof type">
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
          {...register("id_proof_number")}
        />

        <button className="bg-green-600 hover:bg-green-700 rounded-md text-white py-2">
          Submit
        </button>
      </div>
    </form>
  );
};

export default VisitorForm;
