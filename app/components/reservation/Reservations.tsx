'use client'

import {SafeReservation} from "@/app/types";
import ClientOnly from "@/app/components/ClientOnly";
import {ReservationList} from "@/app/components/reservation/ReservationList";
import Section from "@/app/components/Section";
import Button from "@/app/components/Button";
import useSelectedDate from "@/app/hooks/useSelectedDate";
import useReservationModal from "@/app/hooks/useReservationModal";
import {useSession} from "next-auth/react";
import EmptyState from "@/app/components/EmptyState";
import {
	useCancelReservation,
	useCompleteReservation,
	useListReservations,
	useUpdateReservation
} from "@/app/queries/reservation";

export const Reservations = () => {
	const selectedDate = useSelectedDate();
	const reservationModal = useReservationModal()

	const { data: session, status } = useSession();
	const { data: reservations = [], isLoading } = useListReservations(selectedDate.date, status === 'authenticated');
	const { mutate: cancelReservation } = useCancelReservation();
	const { mutate: completeReservation  } = useCompleteReservation();

	if (status === 'loading') {
		return <EmptyState title="Loading" subtitle=" " />
	}

	if (status !== 'authenticated') {
		return (
			<EmptyState title="Please login" subtitle=" " />
		)
	}

	const title = (session?.user as any)?.isAdmin ? 'Reservations' : 'My Reservation'


	const handleEdit = (reservation: SafeReservation) => {
		reservationModal.onOpen(reservation)
	}

	const handleCancel = (reservation: SafeReservation) => {
		cancelReservation({ id: reservation.id })
	}

	const handleComplete = (reservation: SafeReservation) => {
		completeReservation({ id: reservation.id })
	}


	return (
		<ClientOnly>
			<Section title={title} actions={status === 'authenticated' && <Button className="w-[200px]" small label="New Reservation" onClick={() => reservationModal.onOpen()} />}>
				<ReservationList reservations={reservations} isLoading={isLoading} onEdit={handleEdit} onCancel={handleCancel} onComplete={(session?.user as any)?.isAdmin && handleComplete}/>
			</Section>
		</ClientOnly>
	)
}
