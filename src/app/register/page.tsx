"use client";

import { useActionState, useState } from "react";
import { createUser } from "./actions";

type TInitialState = {
    errors: {
        name?: string[]
        email?: string[]
        password?: string[]
    },
    message: string
}

const initialState: TInitialState = { errors: {}, message: "" };

export default function UserRegistrationForm() {
    const [state, formAction, pending] = useActionState(createUser, initialState);

    const [values, setValues] = useState({ name: "", email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                        <p className="mt-2 text-gray-600">Register a new user account</p>
                    </div>

                    {state?.message && (
                        <p className="text-center mb-4 text-green-600 text-sm font-medium">
                            {state.message}
                        </p>
                    )}

                    <form action={formAction} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                className={`w-full text-black px-3 py-2 border rounded-md ${state.errors?.name ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Enter your full name"
                            />
                            {state.errors?.name && (
                                <p className="text-red-500 text-sm">{state.errors.name.join(", ")}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                className={`w-full text-black px-3 py-2 border rounded-md ${state.errors?.email ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Enter your email"
                            />
                            {state.errors?.email && (
                                <p className="text-red-500 text-sm">{state.errors.email.join(", ")}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                className={`w-full text-black px-3 py-2 border rounded-md ${state.errors?.password ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Enter your password"
                            />
                            {state.errors?.password && (
                                <p className="text-red-500 text-sm">{state.errors.password.join(", ")}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={pending}
                            className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
                        >
                            {pending ? "Registering..." : "Register User"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
