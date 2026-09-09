import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedLayout } from './ProtectedLayout'
import { RouteError } from './RouteError'

// Route-lar tələb olunanda yüklənir — hər səhifə öz chunk-ında (widget-lər, dialoqlar,
// login illüstrasiyası ilk bundle-a düşmür).
const LoginPage = lazy(() => import('@/pages/login').then((m) => ({ default: m.LoginPage })))
const OrdersPage = lazy(() => import('@/pages/orders').then((m) => ({ default: m.OrdersPage })))
const CampaignsPage = lazy(() => import('@/pages/campaigns').then((m) => ({ default: m.CampaignsPage })))
const CategoriesPage = lazy(() => import('@/pages/categories').then((m) => ({ default: m.CategoriesPage })))
const ProductsPage = lazy(() => import('@/pages/products').then((m) => ({ default: m.ProductsPage })))
const UsersPage = lazy(() => import('@/pages/users').then((m) => ({ default: m.UsersPage })))

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Suspense fallback={null}>
        <LoginPage />
      </Suspense>
    ),
    errorElement: <RouteError />,
  },
  {
    path: '/',
    element: <ProtectedLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Navigate to="/orders" replace /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'campaigns', element: <CampaignsPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'users', element: <UsersPage /> },
    ],
  },
])
