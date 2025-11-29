import AppError from '@/utils/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken'
import status from 'http-status'

export type UserRole = "CUSTOMER" | "ADMIN";

export interface TJwt extends JwtPayload {
    id: string;
    role: UserRole;
}

export async function jwtVerify(token: string): Promise<TJwt> {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string) as TJwt;
    return decoded
}

export async function adminVerify(token: string): Promise<TJwt> {
    try {
        const decodedData = await jwtVerify(token)
        if (decodedData.role === "ADMIN") {
            return decodedData
        }
        else {

            throw new AppError(status.UNAUTHORIZED, 'Role Is Not Verify');
        }
    } catch (error: any) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(
            status.UNAUTHORIZED,
            error?.message || "Invalid token",
            error?.stack
        );
    }
}
