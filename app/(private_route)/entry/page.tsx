"use client";
import React, { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export interface IEntry {
  phoneNo: number;
  visitorId: string;
  checkinTimestamp: string;
  checkoutTimestamp: string;
  status: string;
}

const Entry = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IEntry>();

  const watcher = watch("phoneNo");

  const onSubmit: SubmitHandler<IEntry> = async (data) => {
    const res = await fetch("api/visitor", {
      method: "POST",
      body: JSON.stringify(data),
      next: { tags: ["visitors"] },
    });

    // useEffect(()=>{

    //   console.log("🚀 ~ file: page.tsx:36 ~ useEffect ~ watcher:", watcher)

    // },[watcher])

    // if (res.ok) {
    //   const response = await res.json();

    // } else {
    //   console.log("pk");
    // }
  };

  useEffect(() => {
    if (watcher) console.log(watcher);
  }, [watcher]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1 lg:grid-cols-2 md:gap-2">
        <input
          placeholder="Phone number"
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
          placeholder="Visitor ID"
          type="number"
          required
          {...register("visitorId", {
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
        {errors.visitorId && (
          <span className="bg-red-600 text-sm h-5 mt-2 w-fit px-2 text-white rounded-md">
            {errors.visitorId?.message}
          </span>
        )}
        <input
          placeholder="Checkin timestamp"
          type="text"
          required
          {...register("checkinTimestamp")}
        />
        <input
          placeholder="Checkout timestamp"
          type="text"
          required
          {...register("checkoutTimestamp")}
        />
        <input
          placeholder="Status"
          type="text"
          required
          {...register("status")}
        />
      </div>
    </form>
  );
};
export default Entry;
