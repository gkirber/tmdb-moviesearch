import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/app/providers/theme/ThemeProvider";
import {router} from "@/app/providers/router/router.tsx";

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}


export default App