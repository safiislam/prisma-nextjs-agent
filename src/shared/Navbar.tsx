"use client";

import { use, useEffect, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { deleteAuthCookie, getToken } from '@/utils/deleteAuthCookie';
import { redirect } from 'next/navigation';

const navData = [
    {
        title: 'Home',
        url: '/',
    },
    {
        title: 'Products',
        url: '/products',
    },
    {
        title: 'About',
        url: '/about',
    },
    {
        title: 'Contact us',
        url: '/contact',
    }
]

export default function Navbar({ token }) {
    // const [token, setToken] = useState<string | null>(null);

    // useEffect(() => {
    //     getToken().then((data) => setToken(data as string));
    // }, []);
    const [isOpen, setIsOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const handelLogin = async () => {
        if (token) {
            await deleteAuthCookie()
            // setToken(null)
        }
        else {
            redirect('/login')
        }
    }

    return (
        <nav className="bg-white shadow-lg border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="shrink-0">
                        <h1 className="text-2xl font-bold text-blue-600">Logo</h1>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navData.map((item, index) => (
                                <div key={index} className="relative">
                                    {item.title === 'Products' ? (
                                        <div className="relative group">
                                            <button
                                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
                                                onMouseEnter={() => setIsProductsOpen(true)}
                                                onMouseLeave={() => setIsProductsOpen(false)}
                                            >
                                                {item.title}
                                                <ChevronDown className="ml-1 h-4 w-4" />
                                            </button>

                                            {/* Products Dropdown */}
                                            <div
                                                className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 transition-all duration-200 ${isProductsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                                                    }`}
                                                onMouseEnter={() => setIsProductsOpen(true)}
                                                onMouseLeave={() => setIsProductsOpen(false)}
                                            >
                                                <a href="/products/electronics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                                                    Electronics
                                                </a>
                                                <a href="/products/clothing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                                                    Clothing
                                                </a>
                                                <a href="/products/books" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                                                    Books
                                                </a>
                                                <a href="/products/home" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                                                    Home & Garden
                                                </a>
                                            </div>
                                        </div>
                                    ) : (
                                        <a
                                            href={item.url}
                                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                        >
                                            {item.title}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Button - Desktop */}
                    <div onClick={handelLogin} className="hidden md:block">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                            {token ? 'Get Started' : "Login"}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                    {navData.map((item, index) => (
                        <div key={index}>
                            {item.title === 'Products' ? (
                                <div>
                                    <button
                                        onClick={() => setIsProductsOpen(!isProductsOpen)}
                                        className="flex justify-between items-center w-full text-left text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        {item.title}
                                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''
                                            }`} />
                                    </button>

                                    {/* Mobile Products Dropdown */}
                                    <div className={`ml-4 mt-1 space-y-1 transition-all duration-200 ${isProductsOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                                        }`}>
                                        <a href="/products/electronics" className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                                            Electronics
                                        </a>
                                        <a href="/products/clothing" className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                                            Clothing
                                        </a>
                                        <a href="/products/books" className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                                            Books
                                        </a>
                                        <a href="/products/home" className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                                            Home & Garden
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <a
                                    href={item.url}
                                    className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.title}
                                </a>
                            )}
                        </div>
                    ))}

                    {/* Mobile CTA Button */}
                    <div className="pt-2">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base font-medium transition-colors duration-200">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}