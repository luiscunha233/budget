import { HSLColor } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import IncomeAllocations from "./IncomeAllocations";


export default function IncomeDisplay(props: { month: number, year: number , colors : HSLColor[] }) {
    return <Card className="w-fit mt-4 pt-4">
        <CardContent className="flex flex-row items-center gap-4">
            <div className="font-bold text-2xl">2300€</div>
            <div>
                <div className="font-bold text-sm">Allocation</div>
                <IncomeAllocations income={2300} month={props.month} year={props.year} colors={props.colors} />
            </div>
        </CardContent>
    </Card>
}