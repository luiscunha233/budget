
import { Budget } from "@prisma/client";
import { parseIso } from "ts-date/locale/en";

export function comboxDateMaper(entry: any) {
    let date = parseIso(entry.date.toString());

    return {
      value: date,
      label: date?.toLocaleDateString(undefined, { month: "long", year: "numeric" })
    }
  }