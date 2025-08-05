import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DialogTitle } from "@radix-ui/react-dialog"
import axiosInstance from "@/lib/axiosInstance"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"

export const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error: any) { 
    } finally { 
      toast.success('Logged out successfully');
      document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.replace('/login');
      setLoading(false);
    }
  }

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 z-10 bg-black border-b border-gray-800 shadow-2xl fixed top-0">
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden bg-gray-900 border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-white">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-8 bg-black border-gray-800">
          <DialogTitle className="sr-only">Main Navigation</DialogTitle>

          {/* Mobile Logo */}
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-lg">
              <MedicalIcon className="h-5 w-5 text-black" />
            </div>
            <div>
              <h3 className="text-white text-lg font-light tracking-wide">RPH Medicine</h3>
              <p className="text-gray-400 text-xs">Management System</p>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex flex-col gap-2 py-6">
            <Link
              href="/dashboard"
              className="flex w-full items-center py-3 px-4 text-white hover:bg-gray-900 rounded-lg transition-all duration-200 group"
              prefetch={false}
            >
              <DashboardIcon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white transition-colors" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link
              href="/medicines"
              className="flex w-full items-center py-3 px-4 text-white hover:bg-gray-900 rounded-lg transition-all duration-200 group"
              prefetch={false}
            >
              <MedicineIcon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white transition-colors" />
              <span className="font-medium">Medicines</span>
            </Link>
            <Link
              href="/patients"
              className="flex w-full items-center py-3 px-4 text-white hover:bg-gray-900 rounded-lg transition-all duration-200 group"
              prefetch={false}
            >
              <PatientIcon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white transition-colors" />
              <span className="font-medium">Patients</span>
            </Link>

            <div className="border-t border-gray-800 mt-4 pt-4">
              <Button
                onClick={handleLogout}
                disabled={loading}
                className="w-full bg-gray-900 hover:bg-red-900 text-white border border-gray-700 hover:border-red-700 transition-all duration-200 disabled:opacity-50"
              >
                <LogoutIcon className="h-4 w-4 mr-2" />
                {loading ? 'Logging out...' : 'Logout'}
              </Button>
            </div>
          </div>
        </SheetContent>
        <div className="absolute inset-0 flex lg:hidden items-center justify-center pointer-events-none">
          <div className="flex items-center gap-3">
            <MedicalIcon className="h-8 w-8 text-white" />
            <h3 className="text-white text-lg font-semibold">RPH Medicine</h3>
          </div>
        </div>

      </Sheet>

      {/* Desktop Logo */}
      <Link href="/dashboard" className="mr-6 hidden lg:flex items-center group" prefetch={false}>
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-lg group-hover:shadow-xl transition-shadow duration-200">
          <MedicalIcon className="h-5 w-5 text-black" />
        </div>
        <div>
          <h3 className="text-white text-lg font-light tracking-wide">RPH Medicine</h3>
          <p className="text-gray-400 text-xs">Management System</p>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden lg:flex gap-2 items-center">
        <Link
          href="/dashboard"
          className="group inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 hover:bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-all duration-200 border border-gray-700 hover:border-gray-600"
          prefetch={false}
        >
          <DashboardIcon className="h-4 w-4 mr-2 text-gray-400 group-hover:text-white transition-colors" />
          Dashboard
        </Link>
        <Link
          href="/medicines"
          className="group inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 hover:bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-all duration-200 border border-gray-700 hover:border-gray-600"
          prefetch={false}
        >
          <MedicineIcon className="h-4 w-4 mr-2 text-gray-400 group-hover:text-white transition-colors" />
          Medicines
        </Link>
        <Link
          href="/patients"
          className="group inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 hover:bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-all duration-200 border border-gray-700 hover:border-gray-600"
          prefetch={false}
        >
          <PatientIcon className="h-4 w-4 mr-2 text-gray-400 group-hover:text-white transition-colors" />
          Patients
        </Link>

        <div className="w-px h-6 bg-gray-700 mx-2"></div>

        <Button
          onClick={handleLogout}
          disabled={loading}
          className="group inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 hover:bg-red-900 text-white px-4 py-2 text-sm font-medium transition-all duration-200 border border-gray-700 hover:border-red-700 disabled:opacity-50"
        >
          <LogoutIcon className="h-4 w-4 mr-2" />
          {loading ? 'Logging out...' : 'Logout'}
        </Button>
      </nav>
    </header>
  )
}

// Professional Medical Icons
function MenuIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function MedicalIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12h6m-3-3v6" />
      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
    </svg>
  )
}

function DashboardIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  )
}

function MedicineIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  )
}

function PatientIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="m22 21-3-3" />
      <path d="m16 16 3 3" />
    </svg>
  )
}

function LogoutIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16,17 21,12 16,7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}