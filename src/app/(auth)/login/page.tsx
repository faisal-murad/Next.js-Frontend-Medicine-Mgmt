'use client';

import React from 'react' 
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
