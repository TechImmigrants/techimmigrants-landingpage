import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: مسیر یافت نشد:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-primary mb-4">۴۰۴</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">صفحه‌ای که دنبالش بودید پیدا نشد</h1>
        <p className="text-muted-foreground mb-6">
          ممکن است آدرس تغییر کرده باشد یا صفحه دیگر وجود نداشته باشد.
        </p>
        <Button asChild size="lg" className="gap-2">
          <Link to="/">
            <Home className="h-5 w-5" />
            بازگشت به صفحه اصلی
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
