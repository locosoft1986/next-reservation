'use client';

import {
	FieldValues,
	SubmitHandler,
	useForm
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from 'zod';


import Modal from "./Modal";
import Input from "../inputs/Input";
import useTableModal from "@/app/hooks/useTableModal";
import {useEffect} from "react";
import {useCreateTable} from "@/app/queries/table";


const validationSchema = z
	.object({
		title: z.string().min(1, { message: "Table title is required" }),
		capacity: z
			.coerce
			.number()
			.gte(1, { message: "capacity must be greater than zero." }),
	})

type ValidationSchema = z.infer<typeof validationSchema>;

const CreateTableModal = () => {
	const tableModal = useTableModal();

	const {mutate: createTable, isLoading } = useCreateTable()

	const {
		reset,
		register,
		handleSubmit,
		formState: {
			errors,
		},
	} = useForm<ValidationSchema>({
		defaultValues: {
			title: '',
			capacity: 1
		},
		resolver: zodResolver(validationSchema),
	});

	useEffect(() => {
		reset();
	}, [tableModal.isOpen])

	const onSubmit: SubmitHandler<FieldValues> =
		(data) => {
			createTable(data)
			tableModal.onClose();
		}

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Input
				id="title"
				label="Title"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="capacity"
				label="Capacity"
				type="number"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	)


	return (
		<Modal
			disabled={isLoading}
			isOpen={tableModal.isOpen}
			title="New Table"
			actionLabel="Submit"
			onClose={tableModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
		/>
	);
}

export default CreateTableModal;
