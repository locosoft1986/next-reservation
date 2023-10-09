'use client'

import React, {FC} from 'react';
import Button from "@/app/components/Button";
import {SafeTable} from "@/app/types";
import {BsPeople} from "react-icons/bs";

type Props = {
	table: SafeTable
}
export const TableItem: FC<Props> = ({ table}) => {
	return (
		<div className="flex flex-col justify-between p-3 border-2">
			<div className="font-bold">
				{table.title}
			</div>
			<div className="flex leading-4">
				<BsPeople />
				<span className="ml-2">{table.capacity}</span>
			</div>
			<div>
				{!!table.reservations?.length ? 'OCCUPIED' : 'EMPTY'}
			</div>
		</div>
	)
}
