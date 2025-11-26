"use client";

import { useActionState, useState } from 'react';
import { createUser } from './actions';

interface UserFormData {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}
const initialState = {
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
}

export default function UserRegistrationForm() {
    const [state, fromAction, pending] = useActionState(createUser, initialState)
    // const onSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()

    // };
    const errors = state?.errors
    console.log(state)

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                        <p className="mt-2 text-gray-600">Register a new user account</p>
                    </div>

                    <form action={fromAction} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors?.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your full name"
                            />
                            {/* {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )} */}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors?.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your email"
                            />
                            {/* {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )} */}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors?.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your password"
                            />
                            {/* {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )} */}
                        </div>
                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                {pending ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Registering...
                                    </div>
                                ) : (
                                    'Register User'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}