"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLogStore } from "@/store";
import { cn } from "@/lib/utils";
import IconDelete from "./ui/IconDelete";
import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function Logs() {
  const logs = useLogStore((state) => state.logs);
  const setDeleteLog = useLogStore((state) => state.setDeleteLog);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleDelete = async (key: string) => {
    try {
      const { error } = await supabase.from("logs").delete().eq("date", key);
      if (!error) {
        setDeleteLog(key);
        toast({
          title: "Successfully delete log",
          description: `${key} successfully deleted`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Fail to delete log",
          description: error.message,
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Fail to create log",
        description: e as string,
      });
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>List of logs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Date</TableHead>
            <TableHead className="w-1/3">hour</TableHead>
            <TableHead className="w-1/3">Note</TableHead>
            <TableHead className="w-1/3">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(logs).map((key) => {
            const log = logs[key];
            const date = log.date as Date;
            return (
              <TableRow
                key={key}
                className={cn(log.hour <= 5 ? "bg-red-100" : "")}
              >
                <TableCell className="font-medium">
                  {date.toDateString()}
                </TableCell>
                <TableCell>{log.hour}</TableCell>
                <TableCell>{log.note}</TableCell>
                <TableCell>
                  <Button
                    className="bg-white hover:bg-yellow-200"
                    onClick={() => handleDelete(key)}
                  >
                    <IconDelete />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
