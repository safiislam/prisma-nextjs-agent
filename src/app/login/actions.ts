'use server'

import z from "zod"




const schema = z.object({
    name: z.string({ error: "Name is required" }),
    email: z.string({ error: "Email is required" }),
    password: z.string({ error: "Password is required" }),
})



export async function createUser(initialState: any, fromData: FormData) {
    const validatedFields = schema.safeParse({
        email: fromData.get('email'),
        name: fromData.get('name'),
        password: fromData.get('password'),
        // address: fromData.get('address'),
        // phone: fromData.get('phone'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

}
