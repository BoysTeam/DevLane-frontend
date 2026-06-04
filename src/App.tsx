import { Routes, Route, Navigate } from 'react-router'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import { Toaster } from 'sonner'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

// Route Guard to prevent unauthenticated access
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('jwt-token')
  if (!token) {
    return <Navigate to="/auth" replace />
  }
  return <>{children}</>
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Toaster theme="dark" position="top-right" closeButton richColors />
    </QueryClientProvider>
  )
}
