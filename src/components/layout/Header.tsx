
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavItems = [
    {
      title: t("nav.home"),
      href: "/",
    },
    {
      title: t("nav.events"),
      href: "/events",
    },
    {
      title: t("nav.about"),
      href: "/about",
    },
    {
      title: t("nav.contact"),
      href: "/contact",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-amana-primary">Amana</span>
          </Link>
          <nav className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {mainNavItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link to={item.href}>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-base font-medium transition-colors hover:bg-amana-light hover:text-amana-dark focus:bg-amana-light focus:text-amana-dark focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent" : ""}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("am")} className={language === "am" ? "bg-accent" : ""}>
                አማርኛ
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/contact">
            <Button variant="outline" className="hidden md:flex">
              {t("hero.donate")}
            </Button>
          </Link>
          
          <Link to="/admin/login">
            <Button className="hidden md:flex">
              {t("nav.adminLogin")}
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container py-3 flex flex-col space-y-3">
            {mainNavItems.map((item) => (
              <Link 
                key={item.title} 
                to={item.href}
                className="px-3 py-2 text-base hover:bg-amana-light rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-2 flex flex-col space-y-3">
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  {t("hero.donate")}
                </Button>
              </Link>
              <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">
                  {t("nav.adminLogin")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
