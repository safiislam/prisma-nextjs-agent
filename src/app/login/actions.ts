"use server";

import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import db from "@/db/db";
import z from "zod";

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function createUser(prevState: any, formData: FormData) {
    try {
        const validated = schema.safeParse({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        });

        if (!validated.success) {
            return {
                errors: validated.error.flatten().fieldErrors,
                message: "Validation Failed!",
            };
        }

        const { name, email, password } = validated.data;

        const userExists = await db.user.findUnique({
            where: { email },
        });
        if (userExists) {
            return {
                errors: { email: ["Email already exists"] },
                message: "Email already registered!",
            };
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        const jwtPayload = { id: result.id, role: result.role }
        const token = jwt.sign(jwtPayload, 'this is Secret')

        return {
            errors: {},
            message: "User Registered Successfully 🎉",
        };

    } catch (error: any) {
        console.error("Create User Error:", error);

        return {
            errors: {},
            message: "Something went wrong. Try again!",
        };
    }
}
