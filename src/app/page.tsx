import Calendar from "@/components/Calendar";
import Logs from "@/components/Logs";
import Navbar from "@/components/Navbar";
import { NewLog } from "@/components/NewLog";
import InitLog from "@/state/InitLog";
import { IResultLog } from "@/store";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    redirect("/auth");
  }

  const { data: logs } = await supabase.from("logs").select("*").order("date", { ascending: true });


  return (
    <div className="p-5 space-y-10">
      <InitLog logs={logs as IResultLog[]} />
      <Navbar />
      <NewLog />
      <Calendar />
      <Logs />
    </div>
  );
}
