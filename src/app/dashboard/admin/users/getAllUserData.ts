"use server";

import { cookies } from "next/headers";
import status from "http-status";
import AppError from "@/utils/AppError";
import { adminVerify } from "../../jwtVerify";

export async function getAllUserData() {

    try {
        const token = (await cookies()).get("Authorization")?.value;

        if (!token) {
            throw new AppError(status.UNAUTHORIZED, "Invalid token");
        }
        const admin = await adminVerify(token);

        return admin;

    } catch (error) {
        const cookie = (await cookies()).get('Authorization');
        if (cookie) {
            (await cookies()).delete('Authorization');   // <--- NOW VALID
        }

        // Redirect always must be last
        // redirect("/");
    }
}
