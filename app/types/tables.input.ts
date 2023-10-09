import {IsInt, IsNotEmpty, Min} from 'class-validator';

export class CreateTableInput {
	@IsNotEmpty()
	public title!: string;

	@IsInt()
	@Min(1)
	public capacity!: number;
}
