import {
	Body,
	createHandler, Delete,
	Get,
	Param,
	ParseDatePipe,
	Post,
	Put,
	Query,
	Req,
	ValidationPipe
} from "next-api-decorators";
import {RequiresAuth} from "@/app/decorators/requiresAuth.decorator";
import {computeStartEndOfDate} from "@/app/libs/utils";
import prisma from "@/app/libs/prismadb";
import {UpsertReservationInput} from "@/app/types/reservations.input";
import {RequiresAdmin} from "@/app/decorators/requiresAdmin.decorator";


class ReservationRouter {
	@Get()
	@RequiresAuth()
	public async listReservations(
		@Req() request: any,
		@Query('date', ParseDatePipe({ nullable: true })) date: Date
	) {
		const currentUser = request.user;
		const queryDate = new Date(date)
		const {startOfDate, endOfDate} = computeStartEndOfDate(queryDate);
		const reservationQuery = {
			gte: startOfDate,
			lte: endOfDate
		};
		const query = currentUser.isAdmin ? {
			where: {
				reservationDate: reservationQuery
			},
			include: {
				user: true,
				table: true
			}
		} : {
			where: {
				reservationDate: reservationQuery,
				userId: currentUser.id
			},
			include: {
				user: true,
				table: true
			}
		}
		const reservations = await prisma.reservation.findMany(query)
		return reservations
	}

	@Post()
	@RequiresAuth()
	public async createReservation(
		@Req() request: any,
		@Body(ValidationPipe) data: UpsertReservationInput
	) {
		const reservation = await prisma.reservation.create({
			data: {
				...data,
				userId: request.user.id
			}
		});
		return reservation
	}

	@Put('/:id')
	@RequiresAuth()
	public async updateReservation(
		@Req() request: any,
		@Param('id') id: string,
		@Body(ValidationPipe) data: UpsertReservationInput
	) {
		const reservation = await prisma.reservation.update({
			where: {
				id,
			},
			data: {
				...data,
				userId: request.user.id
			}
		});
		return reservation
	}
	@Put('/:id/complete')
	@RequiresAdmin()
	public async completeReservation(
		@Req() request: any,
		@Param('id') id: string,
		@Body(ValidationPipe) data: UpsertReservationInput
	) {
		const reservation = await prisma.reservation.update({
			where: {
				id,
			},
			data: {
				isCompleted: true
			}
		});
		return reservation
	}

	@Delete('/:id')
	@RequiresAuth()
	public async cancelReservation(
		@Req() request: any,
		@Param('id') id: string
	) {
		await prisma.reservation.delete({
			where: {
				id,
			}
		});
		return id
	}
}

export default createHandler(ReservationRouter)
