import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../../layouts/RootLayout/RootLayout";
import {routes} from "@/app/providers/router/router.ts";
import {MainPage} from "@/pages/main/ui/MainPage.tsx";
import {
  CategoryMoviesPage
} from "@/pages/category-movies/ui/CategoryMoviesPage.tsx";
import { FilteredMoviesPage } from "@/pages/filtered-movies/ui/FilteredMoviesPage";


export const router = createBrowserRouter([
  {
    path: routes.root(),
    element: <RootLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: routes.category(":category"), element: <CategoryMoviesPage /> },
      { path: routes.filtered(), element: <FilteredMoviesPage /> },
    ],
  },
]);
