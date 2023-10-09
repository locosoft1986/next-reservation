import {client} from "../client";
import {FieldValues} from "react-hook-form";
import {useMutation} from "react-query";
import {toast} from "react-hot-toast";

function register(user: FieldValues) {
	return client.post<FieldValues>(`/api/register`, user).then(response => response.data)
}

export const useRegisterUser = (onSuccess: VoidFunction) => {
	return useMutation(
		(payload: FieldValues) =>
			register(payload),
		{
			onSuccess: () => {
				toast.success('Registered!');
				onSuccess()
			},
			onError: () => {
				toast.error('Something Wrong!');
			}
		}
	)
}
