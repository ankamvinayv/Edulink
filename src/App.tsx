import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ReactDOM from 'react-dom';
import { AppProvider } from './context/AppContext';
import RoleSelectionPage from './components/RoleSelectionPage';
import AdminLogin from "./pages/AdminLogin";
import StudentAuth from "./pages/StudentAuth";
import { FeeProvider } from './context/FeeContext';


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <FeeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/student-auth" element={<StudentAuth />} />
            <Route path="/select-role" element={<RoleSelectionPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </FeeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
