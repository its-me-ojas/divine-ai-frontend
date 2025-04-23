import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import Index from "./pages/Index";
import VersesPage from "./pages/VersesPage";
import StreaksPage from "./pages/StreaksPage";
import BookmarksPage from "./pages/BookmarksPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import WisdomPage from "./pages/WisdomPage";
import WisdomArticlePage from "./pages/WisdomArticlePage";
import ChatPage from "./pages/ChatPage";
import ErrorBoundary from "./components/ErrorBoundary";
import "./i18n/config";
import ReadPage from "./pages/ReadPage";

// Scroll restoration component
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/verses" element={<VersesPage />} />
                <Route path="/wisdom" element={<WisdomPage />} />
                <Route path="/wisdom/:slug" element={<WisdomArticlePage />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
                <Route path="/streaks" element={<StreaksPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/read" element={<ReadPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
