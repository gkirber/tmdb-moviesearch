import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../../layouts/RootLayout/RootLayout";
import {routes} from "@/app/providers/router/router.ts";
import {MainPage} from "@/pages/main/ui/MainPage.tsx";
import {
  CategoryMoviesPage
} from "@/pages/category-movies/ui/CategoryMoviesPage.tsx";


export const router = createBrowserRouter([
  {
    path: routes.root(),
    element: <RootLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: routes.category(":category"), element: <CategoryMoviesPage /> },
    ],
  },
]);