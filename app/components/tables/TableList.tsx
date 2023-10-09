'use client'

import React, {FC} from 'react';
import map from 'lodash/map';
import EmptyState from "@/app/components/EmptyState";
import Loader from "@/app/components/Loader";
import {SafeTable} from "@/app/types";
import {TableItem} from "@/app/components/tables/TableItem";

type Props = {
	isLoading?: boolean
	tables: SafeTable[]
}
export const TableList: FC<Props> = ({ isLoading, tables}) => {
	if (isLoading) {
		return (
			<Loader />
		)
	}
	return (
		<div className="
			pt-8
			grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8">
			{
				tables.length > 0 ?
					map(tables, (table: SafeTable) => (<TableItem key={table.id} table={table} />))
					: <div className="flex flex-col pt-8"><EmptyState /></div>
			}
		</div>
	)
}
