import { SiteHeader } from "@/english/components/SiteHeader";
import "@/english/styles/index.css";
import {
  persianInstitutionalBrand,
  persianInstitutionalNavigation,
} from "./persianInstitutionalContent";

export function Navbar() {
  return (
    <SiteHeader
      ariaLabel="ناوبری سایت"
      brand={persianInstitutionalBrand}
      className="ti-theme ti-theme--fa ti-header--standalone"
      direction="rtl"
      language={{
        direction: "ltr",
        hint: null,
        href: "/",
        label: "English",
        locale: "en",
      }}
      locale="fa"
      mobileMenuLabel="باز کردن منوی سایت"
      navigation={persianInstitutionalNavigation}
      navigationLabel="بخش‌های سایت"
    />
  );
}
