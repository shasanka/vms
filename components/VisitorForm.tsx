"use client";
import { IVisitor } from "@/interface/common";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const VisitorForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<IVisitor>();
  const onSubmit: SubmitHandler<IVisitor> = async (data) => {
    console.log(
      "🚀 ~ file: VisitorForm.tsx:47 ~ constonSubmit:SubmitHandler<IVisitor>= ~ data:",
      data
    );
    console.log(errors);
    // await addVisitor(formData);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const params = {
      data: "Assam",
    };
    const searchParams = new URLSearchParams(params).toString();
    const url = `/api/auth/district?${searchParams}`;
    const res = await fetch(url, {
      method: "GET",
    });
    console.log("🚀 ~ file: VisitorForm.tsx:34 ~ handleChange ~ res:", res);
  };

  console.log(errors);
  return (
    // <form action={formHandler} onSubmit={handleSubmit}>
    <form onSubmit={handleSubmit(onSubmit)}>
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
        />{" "}
        <input
          placeholder="Address"
          type="text"
          required
          {...register("address")}
        />{" "}
        <input placeholder="State" type="" required {...register("state")} />{" "}
        <select
          placeholder="District"
          {...register("district")}
          onChange={handleChange}
        >
          <option value="Assam">Assam</option>
          <option value="Maharastra">Maharastra</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
        </select>
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
