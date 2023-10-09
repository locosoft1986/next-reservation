'use client'
import React, {FC} from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import {SessionProvider} from "next-auth/react";


type Props = {
	children: React.ReactNode
}
export const ReactQueryProvider: FC<Props> = ({ children }) => {
	const [queryClient] = React.useState(() => new QueryClient())

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				{children}
			</SessionProvider>
		</QueryClientProvider>
	)
}
