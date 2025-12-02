"use server";

import { cookies } from "next/headers";

export async function deleteAuthCookie() {
    const cookieStore = await cookies()
    cookieStore.delete('Authorization')
}

export async function getToken() {
    const cookieStore = await cookies()
    const token = cookieStore.get("Authorization")?.value
    return token
}
