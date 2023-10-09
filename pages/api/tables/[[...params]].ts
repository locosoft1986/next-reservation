import prisma from "@/app/libs/prismadb";
import {Body, createHandler, Get, ParseDatePipe, Post, Query, ValidationPipe} from "next-api-decorators";
import {CreateTableInput} from "@/app/types/tables.input";
import {computeStartEndOfDate} from "@/app/libs/utils";
import {RequiresAdmin} from "@/app/decorators/requiresAdmin.decorator";


class TableRouter {
	@Get()
	public async listTables(
		@Query('date', ParseDatePipe({ nullable: true })) date: Date
	) {
		const queryDate = new Date(date)
		const {startOfDate, endOfDate} = computeStartEndOfDate(queryDate);
		const tables = await prisma.table.findMany({
			include: {
				reservations: {
					where: {
						reservationDate: {
							gte: startOfDate,
							lte: endOfDate
						}
					}
				}
			}
		})
		return tables
	}

	@Post()
	@RequiresAdmin()
	public async createTable(@Body(ValidationPipe) data: CreateTableInput) {
		const table = await prisma.table.create({
			data
		});
		return table
	}
}

export default createHandler(TableRouter);
