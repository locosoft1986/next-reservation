import {client} from "../client";
import {FieldValues} from "react-hook-form";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {toast} from "react-hot-toast";
import {LIST_TABLES_QUERY} from "@/app/queries/consts";



function listTable(date: Date) {
	return client.get(`/api/tables`, { params: {
			date
		}}).then(response => response.data)
}
function createTable(table: FieldValues) {
	return client.post<FieldValues>(`/api/tables`, table).then(response => response.data)
}

export const useListTables = (date: Date) => {
	return useQuery([LIST_TABLES_QUERY, date], () => listTable(date))
}

export const useCreateTable = () => {
	const reactQueryClient = useQueryClient();

	return useMutation(
		(payload: FieldValues) =>
			createTable(payload),
		{
			onSuccess: () => {
				toast.success('New Table Created!');
				reactQueryClient.invalidateQueries([LIST_TABLES_QUERY]);
			},
			onError: () => {
				toast.error('Something Wrong!');
			}
		}
	)
}
