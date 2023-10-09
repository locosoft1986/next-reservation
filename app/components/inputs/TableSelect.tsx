'use client';

import Select from 'react-select'

import {SafeTable} from "@/app/types";
import React, {FC, useMemo} from "react";
import map from 'lodash/map';
import {FieldErrors} from "react-hook-form";

export type TableSelectValue = {
  label: string;
  value: string;
  capacity: number;
}

interface Props {
  id: string;
  tables?: SafeTable[];
  selectedIndex?: number;
  onChange: (value: TableSelectValue) => void;
  errors: FieldErrors
}

const TableSelect: FC<Props> = ({
  id,
  tables= [],
  selectedIndex,
  onChange,
  errors,
}) => {
  const options = useMemo(() => map(tables, ({id, title, capacity}: SafeTable) => ({
      label: title, value: id, capacity,
  })), [])

  return (
    <div className="w-full relative">
      <Select
        placeholder="Select a table"
        isClearable
        options={options}
        value={selectedIndex != -1 && options[selectedIndex || 0]}
        onChange={(value: TableSelectValue) => onChange(value)}
        formatOptionLabel={(option: any) => (
          <div className="
          flex flex-row items-center gap-3">
            <div>{option.label}</div>
            <div>
              for
              <span className="text-neutral-500 mx-1">
                {option.capacity}
              </span>
              people
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => `
                  text-lg
                  ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                  ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
              `,
          option: () => 'text-lg'
        }}
        theme={(theme: any) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
      { errors[id] && (
         <p className="text-rose-500 text-xs pl-2">{`${errors?.[id]?.message}`}</p>
      )}
    </div>
   );
}

export default TableSelect;
