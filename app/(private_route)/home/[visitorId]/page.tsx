"use client"

import { IEntry } from "@/interface/common";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";



const VisitorPageWithId = ({
  params,
}: {
  params: { visitorId: string };
}) => {
  const queryClient = useQueryClient()
  const { data: session } = useSession();
  const {data, isLoading, isError} = useQuery({
    queryKey: ["visitor"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/entry/${params.visitorId}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if(res.status === 200){

          return await res.data.data as IEntry[];
        }else return null

      } catch (error: any) {
        throw new Error(error);
      }
    },
    enabled: !!session?.user.accessToken,
  });
  
  useEffect(() => {
    return () => {
      // Cleanup function, will be called when the component is unmounted
      // Clear the data here
      queryClient.removeQueries(["visitor"]);
    };
  }, []);
  if(isLoading) return <h1>Loading</h1>
  if(isError) return <h1>Error</h1>

  return (
    <>
      {
        data?.map((val:any)=>val.createdAt)
      }
    </>
  );
};

export default VisitorPageWithId;
