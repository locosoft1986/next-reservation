'use client'

import ClientOnly from "@/app/components/ClientOnly";
import Section from "@/app/components/Section";
import Button from "@/app/components/Button";
import {TableList} from "@/app/components/tables/TableList";
import useSelectedDate from "@/app/hooks/useSelectedDate";
import useTableModal from "@/app/hooks/useTableModal";
import {useListTables} from "@/app/queries/table";
import {useSession} from "next-auth/react";


export const Tables = () => {
	const { data: session } = useSession()
	const selectedDate = useSelectedDate();
	const tableModal = useTableModal();
	const {data: tables = [], isLoading} = useListTables(selectedDate.date)

	return (
		<ClientOnly>
			<Section className="mt-24" title="Tables" actions={(session?.user as any)?.isAdmin && <Button className="w-[200px]" small label="New Table" onClick={tableModal.onOpen} />}>
				<TableList tables={tables} isLoading={isLoading}/>
			</Section>
		</ClientOnly>
	)
}
