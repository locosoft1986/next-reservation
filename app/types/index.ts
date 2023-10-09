import { Table, Reservation, User } from "@prisma/client";

export type SafeTable = Omit<Table, "createdAt"> & {
  createdAt: string;
  reservations?: SafeReservation[]
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "reservationDate" | "userId"
> & {
  createdAt: string;
  reservationDate: string;
  table: SafeTable;
  user: SafeUser
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" | "hashedPassword"
>;
