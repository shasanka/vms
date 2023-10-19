"use client";
import { addVisitor } from "@/actions/addVisitor";
import { IVisitor } from "@/interface/common";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const validationSchema = z.object({
  mobileno: z.string().min(10).max(10),
  name: z.string().trim(),
  address: z.string().trim(),
  state: z.string().trim(),
  district: z.string().trim(),
  pincode: z.string().min(6).max(6),
  tomeet: z.string().trim(),
  department: z.string().trim(),
});

const VisitorForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<IVisitor>();
  // const formHandler = async (formData: FormData) => {
  //client side validation
  // const newVisitor = {
  //   mobileno: formData.get("mobileno"),
  //   name: formData.get("name"),
  //   address: formData.get("address"),
  //   state: formData.get("state"),
  //   district: formData.get("district"),
  //   pincode: formData.get("pincode"),
  //   tomeet: formData.get("tomeet"),
  //   department: formData.get("department"),
  // };
  // const validation = validationSchema.safeParse(newVisitor);
  // if (!validation.success) {
  //   console.log(validation.error.issues);
  // }

  //   await addVisitor(formData);
  // };

  const onSubmit: SubmitHandler<IVisitor> = async (data) => {
    console.log(
      "🚀 ~ file: VisitorForm.tsx:47 ~ constonSubmit:SubmitHandler<IVisitor>= ~ data:",
      data
    );
    console.log(errors);
    // await addVisitor(formData);
  };

  console.log(errors);
  return (
    // <form action={formHandler} onSubmit={handleSubmit}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-2">
        <div className="grid grid-rows">
          <input
            //   name="mobileno"
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
        />{" "}
        <input
          placeholder="Address"
          type="text"
          required
          {...register("address")}
        />{" "}
        <input
          placeholder="State"
          type="text"
          required
          {...register("state")}
        />{" "}
        <input
          placeholder="District"
          type="text"
          required
          {...register("district")}
        />{" "}
        <input
          placeholder="Pincode"
          type="number"
          required
          {...register("pincode")}
        />{" "}
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
