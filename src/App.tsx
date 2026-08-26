import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { resolveAppLocale } from "./routing/appLocale";

const EnglishRoutes = lazy(() => import("./english/EnglishRoutes"));
const PersianRoutes = lazy(() => import("./PersianRoutes"));

const queryClient = new QueryClient();

const App = () => {
  const locale = resolveAppLocale(window.location.pathname);
  const isPersian = locale === "fa";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isPersian ? "rtl" : "ltr";
  }, [isPersian, locale]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={isPersian ? "/fa" : undefined}>
            <Suspense
              fallback={
                <div className="min-h-screen bg-background" aria-live="polite">
                  <span className="sr-only">Loading Tech Immigrants</span>
                </div>
              }
            >
              {isPersian ? <PersianRoutes /> : <EnglishRoutes />}
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
