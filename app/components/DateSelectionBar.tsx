'use client';

import React, {useState} from 'react';
import Button from "@/app/components/Button";
import {format} from "date-fns";
import Calendar from "@/app/components/inputs/Calendar";
import useSelectedDate from "@/app/hooks/useSelectedDate";

export const DateSelectionBar = () => {
	const [showSelectDate, setShowSelectDate] = useState<boolean>(false);
	const selectedDate = useSelectedDate();

	return (
		<div className="flex items-center justify-center">
			<div className="relative">
				<Button className="w-[200px]" small outline label={format(selectedDate.date, 'PP')} onClick={() => setShowSelectDate(!showSelectDate)}/>
				{
					showSelectDate && (
						<div className="absolute top-[30px] border-2 z-[1000]">
							<Calendar onChange={(value) => {
								selectedDate.setDate(value);
								setShowSelectDate(false)
							}} value={selectedDate.date} />
						</div>
					)
				}
			</div>
		</div>
	)
}
