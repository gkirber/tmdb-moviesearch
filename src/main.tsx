import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux"
import {router} from "@/app/providers/router/router.tsx"
import {store} from "@/app/providers/store/store.ts"
import {ThemeProvider} from "@/app/providers/theme/ThemeProvider.tsx"
import {ToastProvider} from "@/app/providers/toast/ToastProvider.tsx"
import { RouterProvider } from "react-router-dom"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)