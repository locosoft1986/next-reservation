import {createMiddlewareDecorator, NextFunction, UnauthorizedException} from "next-api-decorators";
import {NextApiRequest, NextApiResponse} from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";
import {getToken} from "next-auth/jwt";
import prisma from "@/app/libs/prismadb";

declare module 'next' {
	interface NextApiRequest {
		user?: any
	}
}
export const RequiresAdmin = createMiddlewareDecorator(
	async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
		const token = await getToken({ req, secret: process.env.JWT_SECRET });
		if (!token?.email) {
			throw new UnauthorizedException();
		}

		const currentUser = await prisma.user.findUnique({
			where: {
				email: token.email as string,
			}
		});

		if (!currentUser?.isAdmin) {
			throw new UnauthorizedException();
		}

		req.user = currentUser;
		next();
	}
);
