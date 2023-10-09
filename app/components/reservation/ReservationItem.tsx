'use client'

import React, {FC} from 'react';
import Button from "@/app/components/Button";
import {SafeReservation} from "@/app/types";
import moment from 'moment';

type Props = {
	reservation: SafeReservation
	onCancel: VoidFunction
	onEdit: VoidFunction
	onComplete?: VoidFunction
}
export const ReservationItem: FC<Props> = ({ reservation,  onCancel, onEdit, onComplete}) => {
	return (
		<div className="flex justify-between items-center p-3 border-b-2">
			<div className="flex gap-2">
				<div className="font-bold">{moment(reservation.reservationDate).format('YYYY-MM-DD')}</div>
				<div>{reservation.firstName && reservation.lastName ? `${reservation.firstName} ${reservation.lastName}` : `${reservation.user.firstName} ${reservation.user.lastName}`}</div>
				<div>{`${reservation.people} People (${reservation.mobile || reservation.user.mobile})`}</div>
				<div>At {`${reservation.table.title}`}</div>
			</div>
			<div className="flex">
				{reservation.isCompleted ? <div>Completed</div> : (
					<>
						<Button outline label="Cancel" onClick={onCancel}/>
						{onComplete && <Button outline label="Complete" onClick={onComplete}/>}
						<Button className="ml-2" label="Edit" onClick={onEdit} />
					</>
				)}
			</div>
		</div>
	)
}
