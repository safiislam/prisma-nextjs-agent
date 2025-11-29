/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import db from "@/db/db"
import z from "zod"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})



export async function loginUser(initialState: any, formData: FormData) {
    const validatedFields = schema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation Failed!',
        }
    }
    try {
        const user = await db.user.findFirst({ where: { email: validatedFields.data.email } })
        if (!user) {
            return {
                error: {},
                message: 'Wrong credentials'
            }
        }
        const isPasswordTrue = await bcrypt.compare(validatedFields.data.password, user.password);
        if (!isPasswordTrue) {
            return {
                errors: { password: ['Wrong Password'] },
                message: 'Wrong password'
            }
        }
        const jwtPayload = { id: user.id, role: user.role }
        const token = jwt.sign(jwtPayload, process.env.NEXT_PUBLIC_JWT_SECRET as string, { expiresIn: 60 * 60 });
        (await cookies()).set('Authorization', token)
        return {
            errors: {},
            message: "User Login Successfully 🎉",
        };
    } catch (error: any) {
        return {
            errors: {},
            message: "Something went wrong. Try again!",
        };
    }
}
