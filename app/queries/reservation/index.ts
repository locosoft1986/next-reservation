import {client} from "../client";
import {FieldValues} from "react-hook-form";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {toast} from "react-hot-toast";
import {LIST_RESERVATIONS_QUERY, LIST_TABLES_QUERY} from "@/app/queries/consts";



function listReservations(date: Date) {
	return client.get(`/api/reservations`, { params: {
			date
		}}).then(response => response.data)
}
function createReservation(reservation: FieldValues) {
	return client.post<FieldValues>(`/api/reservations`, reservation).then(response => response.data)
}

function updateReservation(id: string, reservation: FieldValues) {
	return client.put<FieldValues>(`/api/reservations/${id}`, reservation).then(response => response.data)
}

function cancelReservation(id: string) {
	return client.delete(`/api/reservations/${id}`).then(response => response.data)
}

function completeReservation(id: string) {
	return client.put(`/api/reservations/${id}/complete`).then(response => response.data)
}

export const useListReservations = (date: Date, authenticated: boolean) => {
	return useQuery([LIST_RESERVATIONS_QUERY, date], () => listReservations(date), {enabled: authenticated})
}

export const useCreateReservation = () => {
	const reactQueryClient = useQueryClient();

	return useMutation(
		(payload: FieldValues) =>
			createReservation(payload),
		{
			onSuccess: () => {
				toast.success('New Reservation Created!');
				reactQueryClient.invalidateQueries([LIST_RESERVATIONS_QUERY]);
				reactQueryClient.invalidateQueries([LIST_TABLES_QUERY]);
			},
			onError: () => {
				toast.error('Something Wrong!');
			}
		}
	)
}

export const useUpdateReservation = () => {
	const reactQueryClient = useQueryClient();

	return useMutation(
		({id, payload}: {id: string, payload: FieldValues}) =>
			updateReservation(id, payload),
		{
			onSuccess: () => {
				toast.success('Reservation Updated!');
				reactQueryClient.invalidateQueries([LIST_RESERVATIONS_QUERY]);
				reactQueryClient.invalidateQueries([LIST_TABLES_QUERY]);
			},
			onError: () => {
				toast.error('Something Wrong!');
			}
		}
	)
}

export const useCancelReservation = () => {
	const reactQueryClient = useQueryClient();

	return useMutation(
		({id}: {id: string}) =>
			cancelReservation(id),
		{
			onSuccess: () => {
				toast.success('Reservation Canceled!');
				reactQueryClient.invalidateQueries([LIST_RESERVATIONS_QUERY]);
				reactQueryClient.invalidateQueries([LIST_TABLES_QUERY]);
			},
			onError: () => {
				toast.error('Something Wrong!');
			}
		}
	)
}
export const useCompleteReservation = () => {
	const reactQueryClient = useQueryClient();

	return useMutation(
		({id}: {id: string}) =>
			completeReservation(id),
		{
			onSuccess: () => {
				toast.success('Reservation Completed!');
				reactQueryClient.invalidateQueries([LIST_RESERVATIONS_QUERY]);
				reactQueryClient.invalidateQueries([LIST_TABLES_QUERY]);
			},
			onError: () => {
				toast.error('Something Wrong!');
			}
		}
	)
}
