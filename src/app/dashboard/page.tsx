'use client'
import { useAuth } from '@/components/context/AuthContext'
import { Layout } from '@/components/layout/Layout';
import { DashboardTemplate } from '@/components/templates/dashboardTemplate/DashboardTemplate';
import React from 'react'

const page = () => {

  const { loading } = useAuth() as { loading: boolean }


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <Layout>
      <DashboardTemplate />
    </Layout>
  )
}

export default page
