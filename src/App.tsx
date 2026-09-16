import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { CollectionsProvider } from '@/context/CollectionsContext'
import { AuthProvider } from '@/context/AuthContext'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { StickyActions } from '@/components/layout/StickyActions'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { AdminLayout } from '@/components/admin/AdminLayout'

import Home from '@/pages/Home'
import Inventory from '@/pages/Inventory'
import VehicleDetails from '@/pages/VehicleDetails'
import SellYourCar from '@/pages/SellYourCar'
import Finance from '@/pages/Finance'
import About from '@/pages/About'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Contact from '@/pages/Contact'
import ComingSoon from '@/pages/ComingSoon'

import AdminLogin from '@/pages/admin/AdminLogin'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminInventory from '@/pages/admin/AdminInventory'
import AdminCarForm from '@/pages/admin/AdminCarForm'
import AdminLeads from '@/pages/admin/AdminLeads'
import AdminSettings from '@/pages/admin/AdminSettings'

function CustomerLayout() {
  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      <Nav />
      <main className="w-full max-w-full overflow-x-hidden min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>
      <Footer />
      <StickyActions />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CollectionsProvider>
        <BrowserRouter>
          <Routes>
            {/* Protected Admin CMS Area */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="inventory" element={<AdminInventory defaultFilter="all" />} />
              <Route path="cars/new" element={<AdminCarForm />} />
              <Route path="cars/:vehicleId/edit" element={<AdminCarForm />} />
              <Route path="sold" element={<AdminInventory defaultFilter="sold" />} />
              <Route path="reserved" element={<AdminInventory defaultFilter="reserved" />} />
              <Route path="featured" element={<AdminInventory defaultFilter="featured" />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Public Customer Website Routes */}
            <Route element={<CustomerLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/inventory/:vehicleId" element={<VehicleDetails />} />
              <Route path="/sell-your-car" element={<SellYourCar />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/about" element={<About />} />
              <Route path="/testimonials" element={<ComingSoon title="Testimonials" />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<ComingSoon title="Privacy Policy" />} />
              <Route path="/terms-and-conditions" element={<ComingSoon title="Terms & Conditions" />} />
              <Route path="/wishlist" element={<ComingSoon title="Wishlist" />} />
              <Route path="/compare" element={<ComingSoon title="Compare" />} />
              <Route path="*" element={<ComingSoon title="Page Not Found" note="Let's get you back home." />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CollectionsProvider>
    </AuthProvider>
  )
}
