import {createMiddlewareDecorator, NextFunction, UnauthorizedException} from "next-api-decorators";
import {NextApiRequest, NextApiResponse} from "next";
import {getToken} from "next-auth/jwt";
import prisma from "@/app/libs/prismadb";

declare module 'next' {
	interface NextApiRequest {
		user?: any
	}
}
export const RequiresAuth = createMiddlewareDecorator(
	async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
		const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
		if (!token || !token.email) {
			throw new UnauthorizedException();
		}
		const currentUser = await prisma.user.findUnique({
			where: {
				email: token.email as string,
			}
		});

		req.user = currentUser;
		next();
	}
);
