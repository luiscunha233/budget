"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export interface ComboxboxValue {
    value:string,
    label:string
}

export interface ComboxboxProps {
    placeholder:string;
    data: ComboxboxValue[] | undefined;
    empty:string,
    onSelect: (value: string) => void;
}
export function DateCombobox(props : ComboxboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  props.onSelect((props.data && props.data.length > 0 ? props.data[0].label : props.placeholder));
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? props.data?.find((entry) => entry.value === value)?.label
            : (props.data && props.data.length > 0 ? props.data[0].label : props.placeholder)}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={" Search "+ props.placeholder + " ..."} className="h-9" />
          <CommandList>
            <CommandEmpty>No dates found.</CommandEmpty>
            <CommandGroup>
              {props.data?.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    props.onSelect(currentValue);
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
