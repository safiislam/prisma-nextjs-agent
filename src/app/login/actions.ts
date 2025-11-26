"use server";

;
import db from "@/db/db";
import z from "zod";

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function createUser(prevState: any, formData: FormData) {
    const validatedFields = schema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Validation Failed!",
        };
    }
    console.log(validatedFields)
    const data = await db.user.create({
        data: validatedFields.data
    })

    if (data) {
        return {
            errors: {},
            message: "User Registered Successfully 🎉",
        };
    }
    else {
        return {
            errors: {},
            message: "Went Some Issue"
        }
    }
}
