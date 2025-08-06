'use client';

import React from 'react'
// import axiosInstance from '@/lib/axiosInstance';
import { AuthProvider } from '@/components/context/AuthContext';  
import LoginTemplate from '@/components/templates/loginTemplate/LoginTemplate';

const page = () => {
 

    return (
        <AuthProvider>
            <LoginTemplate />
        </AuthProvider>
    )
}

export default page
