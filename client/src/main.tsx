import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Login from './components/login.tsx'
import SignUp from './components/signup.tsx'
import { UserProvider } from './context/UserContext.tsx'
import ReviewPage from './components/ReviewPage.tsx'
import Home from './components/Home.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // This is the default route, now set to Login
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/home", // The home path
        element: <Home />,
      },
      {
        path: "review/:id", // Add the review page route
        element: <ReviewPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);