"use client";
import { DistrictType } from "@/app/api/auth/district/route";
import { useVisitorFormHooks } from "@/hooks/useVisitorFormHooks";
import { IVisitor } from "@/interface/common";
import React from "react";
import { useForm } from "react-hook-form";

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

  return (
    // <form action={formHandler} onSubmit={handleSubmit}>
    <form>
      <div className="grid grid-cols-2 gap-2">
        <div className="grid grid-rows">
          <input
            placeholder="Mobile Number"
            type="number"
            required
            {...register("mobileno", {
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
          {errors.mobileno && (
            <span className="bg-red-600 text-sm h-5 mt-2 w-fit px-2 text-white rounded-md">
              {errors.mobileno?.message}
            </span>
          )}
        </div>
        <input
          placeholder="Fullname"
          type="text"
          required
          {...register("name")}
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
        <input
          placeholder="Whom to meet?"
          type="text"
          required
          {...register("tomeet")}
        />{" "}
        <input
          placeholder="Department"
          type="text"
          required
          {...register("department")}
        />
        <button className="bg-green-600 hover:bg-green-700 rounded-md text-white py-2">
          Submit
        </button>
      </div>
    </form>
  );
};

export default VisitorForm;
