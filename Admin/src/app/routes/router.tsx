import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedLayout } from './ProtectedLayout'
import { LoginPage } from '@/pages/login'
import { ProductsPage } from '@/pages/products'
import { CategoriesPage } from '@/pages/categories'
import { CampaignsPage } from '@/pages/campaigns'
import { OrdersPage } from '@/pages/orders'
import { UsersPage } from '@/pages/users'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <Navigate to="/products" replace /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'campaigns', element: <CampaignsPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'users', element: <UsersPage /> },
    ],
  },
])
