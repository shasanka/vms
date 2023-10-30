"use client"
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

interface IVisitorsTableProps {
  visitors: IVisitor[];
}
const VisitorsTable = ({ visitors }: IVisitorsTableProps) => {
  const columns = [
    {
      key: "phoneNo",
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
  ];
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={visitors}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default VisitorsTable;
