/* eslint-disable no-unused-vars */
import "./global.scss"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// React Router
import { BrowserRouter } from "react-router-dom";
// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Settings Context & Global Context
import { GlobalContextProvider } from "./context/GlobalContext.jsx";
import { SettingsContextProvider } from "./context/SettingsContext.jsx";
// i18n
import i18n from './utils/i18n/index.js'

// toaster notifications 
import { Toaster } from "react-hot-toast"


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalContextProvider>
    <SettingsContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
          <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </SettingsContextProvider>
  </GlobalContextProvider>
)