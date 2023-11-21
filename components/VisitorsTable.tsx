"use client";
import { IVisitor } from "@/interface/common";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { DataGrid } from "@mui/x-data-grid";
import { DateRangePicker } from "react-date-range";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

const VisitorsTable = () => {
  // const router = useRouter();
  const { data: session } = useSession();
  const { data, isLoading, isError } = useQuery<IVisitor[]>({
    queryKey: ["visitors"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/visitor`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("🚀 ~ file: VisitorsTable.tsx:33 ~ queryFn: ~ res:", res);

        return await res.data.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    enabled: !!session?.user.accessToken,
  });

  const columns = [
    {
      field: "phoneNumber",
      headerName: "Phone no",
    },
    {
      field: "firstName",
      headerName: "First name",
    },
    {
      field: "lastName",
      headerName: "Last name",
    },
    {
      field: "email",
      headerName: "Email",
    },
    {
      field: "state",
      headerName: "State",
    },
    {
      field: "district",
      headerName: "District",
    },
    {
      field: "pincode",
      headerName: "Pincode",
    },
    {
      field: "idProofType",
      headerName: "ID proof type",
    },
    {
      field: "idProofNumber",
      headerName: "ID proof number",
    },
  ];

  const [startValue, setStartValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17")
  );
  const [endValue, setEndValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17")
  );
  if (isLoading) return <h1>Loading</h1>;
  if (isError) return <h1>Error</h1>;
  
  const handleChangeEndDate = (value: Dayjs | null) => {
    setEndValue(value);
  };
  const handleChangeStartDate = (value: Dayjs | null) => {
    setEndValue(value);
  };
  console.log("🚀 ~ file: VisitorsTable.tsx:81 ~ VisitorsTable ~ startValue:", startValue)

  const getVisitors = ()=>{

  }

  return (
    <div className="flex flex-col gap-2">
      <DatePicker
        label="Start date"
        value={startValue}
        onChange={(newValue) => handleChangeStartDate(newValue)}
      />
      <DatePicker
        label="End date"
        value={endValue}
        onChange={(newValue) => handleChangeEndDate(newValue)}
      />
      <button onClick={getVisitors} className="bg-gray-600 px-2 py-1 rounded-md text-white hover:bg-gray-700 ">Submit</button>
      <DataGrid
        getRowId={(row) => row.phoneNumber}
        rows={data || []}
        columns={columns}
        density="compact"
      />
    </div>
  );
};

export default VisitorsTable;
