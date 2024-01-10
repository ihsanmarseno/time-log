"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useLogStore } from "@/store";
import { SelectSingleEventHandler } from "react-day-picker";

export function DatePicker() {
	const log = useLogStore((state) => state.log);
	const setDate = useLogStore((state) => state.setDate);
	const date = log.date as Date;
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"justify-start text-left font-normal col-span-3",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{log.date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={log.date as Date}
					onSelect={setDate as SelectSingleEventHandler}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}