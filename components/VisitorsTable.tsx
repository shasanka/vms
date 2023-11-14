"use client";
import { IVisitor } from "@/interface/common";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

const VisitorsTable = () => {
  const { data: session } = useSession();
  const { data, isLoading, isError } = useQuery<IVisitor[]>({
    queryKey: ["visitors"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/visitor`,
          {
            headers: {
              'Authorization': `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
     
        return await res.data.data
      } catch (error: any) {
        throw new Error(error);
      }
    },
    enabled:!!session?.user.accessToken,
  });


  const columns = [
    {
      key: "phoneNumber",
      label: "Phone no",
    },
    {
      key: "firstName",
      label: "First name",
    },
    {
      key: "lastName",
      label: "Last name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "state",
      label: "State",
    },
    {
      key: "district",
      label: "District",
    },
    {
      key: "pincode",
      label: "Pincode",
    },
    {
      key: "idProofType",
      label: "ID proof type",
    },
    {
      key: "idProofNumber",
      label: "ID proof number",
    },
  ];


  if (isLoading) return <h1>Loading</h1>;
  if (isError) return <h1>Error</h1>;
  const router = useRouter();
  console.log(data);
  return (
    <>
    

    <Table
      aria-label="Example table with dynamic content"
      selectionMode="single"
      selectionBehavior="replace"
      onRowAction={(key) => router.push(`home/${key}`)}
      >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data||[]}>
        {(item) => {
          return (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
            </TableRow>
          )
        }}
      </TableBody>
    </Table>
        </>
  );
};

export default VisitorsTable;
