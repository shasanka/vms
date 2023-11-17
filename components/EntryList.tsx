"use client";
import { EEntryStatus, IEntry } from "@/interface/common";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { useQuery } from "react-query";

import { DataGrid, GridColDef, } from '@mui/x-data-grid';

const EntryList = () => {
  const { data: session } = useSession();
  const { data } = useQuery({
    queryKey: "entry",
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/entry`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 200) {
          // enqueueSnackbar('Got all entries')
          return res.data.data as IEntry[];
        } else {
          return [];
        }
      } catch (E) {
        console.log(E);
      }
    },
  });

  const columns: GridColDef[] = [
    { field: 'visitorId', headerName: 'Visitor ID', minWidth: 150, flex:1 },
    { field: 'createdAt', headerName: 'Registration', minWidth: 150, flex:1, },
    { field: 'status', headerName: 'Status', width: 150,valueGetter:(params)=>{
        return EEntryStatus[params.row.status]
    }  },
  ];

  return (
    <DataGrid getRowId={row=>row._id} rows={data || []} columns={columns} density="compact"/>
  );
};

export default EntryList;
