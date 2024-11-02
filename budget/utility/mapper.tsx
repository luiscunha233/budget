import { Budget } from "@/model/model";
import { parseIso } from "ts-date/locale/en";

export function comboxDateMaper(entry: Budget) {
    console.log(entry.date);
    let date = parseIso(entry.date.toString());

    return {
      value: date,
      label: date?.toLocaleDateString(undefined, { month: "long", year: "numeric" })
    }
  }