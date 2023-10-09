import {IsInt, IsNotEmpty, Min} from 'class-validator';

export class UpsertReservationInput {
	@IsNotEmpty()
	public firstName!: string;

	@IsNotEmpty()
	public lastName!: string;

	@IsNotEmpty()
	public mobile!: string;

	@IsInt()
	@Min(1)
	public people!: number;

	@IsNotEmpty()
	public tableId!: string;

	@IsNotEmpty()
	public reservationDate!: Date;
}

export class MarkCompleteReservationInput {
	public isCompleted!: boolean;
}
