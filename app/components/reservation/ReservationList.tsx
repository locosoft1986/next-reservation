'use client'

import React, {FC} from 'react';
import map from 'lodash/map';
import {ReservationItem} from "./ReservationItem";
import EmptyState from "@/app/components/EmptyState";
import Loader from "@/app/components/Loader";
import {SafeReservation} from "@/app/types";

type Props = {
	isLoading?: boolean
	reservations: SafeReservation[]
	onEdit: (reservation: SafeReservation) => void
	onCancel: (reservation: SafeReservation) => void
	onComplete?: (reservation: SafeReservation) => void
}
export const ReservationList: FC<Props> = ({ isLoading, reservations, onEdit, onCancel, onComplete}) => {
	if (isLoading) {
		return (
			<Loader />
		)
	}
	return (
		<div className="flex flex-col pt-8">
			{
				reservations.length > 0 ?
					map(reservations, (reservation: SafeReservation) => (<ReservationItem key={reservation.id} reservation={reservation} onEdit={() => onEdit(reservation)} onCancel={() => onCancel(reservation)} onComplete={onComplete ? () => onComplete(reservation) : undefined}/>))
					: <EmptyState />
			}
		</div>
	)
}
