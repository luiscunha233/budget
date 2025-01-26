"use client";

import React from "react";
import { MonthPicker } from "@/components/ui/monthpicker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "../../ui/button";
import { format } from "date-fns/format";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter,usePathname, notFound, redirect } from "next/navigation";
import { split } from "postcss/lib/list";



export default function BudgetMonthPicker() {
    
    const router = useRouter();
    const pathname = usePathname();
    let pickedDate = new Date();
    const splitPath = pathname.split("/");
    
    if(splitPath.length > 4 || splitPath.length == 3) {
        notFound();
    }

    if(splitPath.length == 4) {
        pickedDate = new Date(`${splitPath[2]}-${splitPath[3].toString().padStart(2, '0')}-01`);
    }
    
    const [date, setDate] = React.useState<Date>(pickedDate);

    const onMonthSelect = (date: Date) => {
        redirect(`/budgetGroups/${date.getFullYear()}/${date.getMonth() + 1}`);
    };

    return <Popover>
    <PopoverTrigger asChild>
        <Button variant={"outline"} className={cn(" justify-start text-left font-normal", !date && "text-muted-foreground")}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "MMM yyyy") : <span>Pick a month</span>}
        </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
        <MonthPicker onMonthSelect={onMonthSelect} selectedMonth={date} />
    </PopoverContent>
</Popover>
}