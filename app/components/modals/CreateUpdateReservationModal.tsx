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
import {useEffect, useMemo} from "react";
import useReservationModal from "@/app/hooks/useReservationModal";
// import getCurrentUser from "@/app/actions/getCurrentUser";
import {SafeTable} from "@/app/types";
import TableSelect from "@/app/components/inputs/TableSelect";
import findIndex from 'lodash/findIndex'
import useSelectedDate from "@/app/hooks/useSelectedDate";
import {useListTables} from "@/app/queries/table";
import {useCreateReservation, useUpdateReservation} from "@/app/queries/reservation";


const validationSchema = z
	.object({
		id: z.string(),
		firstName: z.string().min(1, { message: "First name is required" }),
		lastName: z.string().min(1, { message: "Last name is required" }),
		mobile: z.string().min(1, { message: "Mobile phone number is required" }),
		people: z
			.coerce
			.number()
			.gte(1, { message: "Capacity must be greater than zero." }),
		tableId: z.string().min(1, { message: "Must select a table" }),
		tableCapacity: z.number()
	})
	.superRefine((values, ctx) => {
		if (values.tableCapacity < values.people) {
			ctx.addIssue({
				message: 'Number of people should be no more than table\'s capacity.',
				code: z.ZodIssueCode.custom,
				path: ['people'],
			});
		}
	})

type ValidationSchema = z.infer<typeof validationSchema>;


const CreateUpdateReservationModal = () => {
	const reservationModal = useReservationModal()
	const selectedDate = useSelectedDate()

	const {data: tables = [], isLoading: isTableLoading} = useListTables(selectedDate.date);
	const {mutate: createReservation, isLoading: isCreating} = useCreateReservation();
	const {mutate: updateReservation, isLoading: isUpdating} = useUpdateReservation();
	const availableTables = useMemo(() => {
		return !reservationModal.reservation ? tables.filter((table: SafeTable) => table.reservations?.length === 0) : tables
	}, [tables, reservationModal.reservation])
	const isLoading = isTableLoading || isCreating || isUpdating

	const {
		watch,
		setValue,
		reset,
		register,
		clearErrors,
		handleSubmit,
		formState: {
			errors,
		},
	} = useForm<ValidationSchema>({
		defaultValues: {
			id: reservationModal.reservation?.id,
			firstName: reservationModal.reservation?.firstName || '',
			lastName: reservationModal.reservation?.lastName || '',
			mobile: reservationModal.reservation?.mobile || '',
			people: 1,
			tableId: reservationModal.reservation?.tableId || undefined,
			tableCapacity: reservationModal.reservation?.table?.capacity || 0
		},
		resolver: zodResolver(validationSchema),
	});

	const tableId = watch('tableId');
	const selectedTableIndex = useMemo(() => {
		return tableId ? findIndex(availableTables, (table: SafeTable) => table.id === tableId) : -1
	}, [tableId])

	const setCustomValue = (id: any, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true
		})
	}

	useEffect(() => {
		if (!reservationModal.isOpen) {
			reset();
		}
	}, [reservationModal.isOpen])

	useEffect(() => {
		if (reservationModal.reservation) {
			setCustomValue('id', reservationModal.reservation.id);
			setCustomValue('firstName', reservationModal.reservation.firstName);
			setCustomValue('lastName', reservationModal.reservation.lastName);
			setCustomValue('mobile', reservationModal.reservation.mobile);
			setCustomValue('people', reservationModal.reservation.people);
			setCustomValue('people', reservationModal.reservation.people);
			const tableIndex = findIndex(tables, (table: SafeTable) => table.id === reservationModal.reservation.tableId)
			setCustomValue('tableId', tables[tableIndex].id);
			setCustomValue('tableCapacity', tables[tableIndex].capacity);
			clearErrors();
		}
	}, [reservationModal.reservation])

	const onSubmit: SubmitHandler<FieldValues> =
		({tableCapacity, id, ...data}) => {
			!id ? createReservation({...data, reservationDate: selectedDate.date}) : updateReservation({id, payload: {...data, reservationDate: selectedDate.date}});
			reservationModal.onClose();
		}

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<input id="id" {...register('id')} type="hidden" />
			<input id="tableId" {...register('tableId')} type="hidden" />
			<input id="tableCapacity" {...register('tableCapacity')} type="hidden" />
			<Input
				id="firstName"
				label="First Name"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="lastName"
				label="Last Name"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="mobile"
				label="Mobile"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="people"
				label="People"
				type="number"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<TableSelect
				id="tableId"
				tables={availableTables}
				selectedIndex={selectedTableIndex}
				onChange={(newTable) => {
					setCustomValue('tableId', newTable?.value);
					setCustomValue('tableCapacity', newTable?.capacity || 0);
				}}
				errors={errors}
			/>
		</div>
	)


	return (
		<Modal
			disabled={isLoading}
			isOpen={reservationModal.isOpen}
			title={reservationModal.reservation?.id ? 'Update Reservation' : 'Create Reservation'}
			actionLabel="Submit"
			onClose={reservationModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
		/>
	);
}

export default CreateUpdateReservationModal;
