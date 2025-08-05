'use client';

import React from 'react'
// import axiosInstance from '@/lib/axiosInstance';
import { AuthProvider } from '@/components/context/AuthContext';  
import LoginTemplate from '@/components/templates/loginTemplate/LoginTemplate';

const page = () => {

    // useEffect(() => {
    //     const login = async () => {
    //         console.log("Login page loaded");
    //         const res = await axiosInstance.post('/auth/login',
    //             {
    //                 email: "faisal3@yopmail.com",
    //                 password: "123456789"
    //             }
    //         )

    //         console.log("Login response:", res.data);
    //     }

    //     login();
    // }, []);

    return (
        <AuthProvider>
            <LoginTemplate />
        </AuthProvider>
    )
}

export default page
