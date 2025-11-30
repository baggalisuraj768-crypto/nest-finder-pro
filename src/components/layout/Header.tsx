import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, GitCompare, User, Search, Home, Building2, Users, Info, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import AuthModal from "@/components/modals/AuthModal";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/listings", label: "Listings", icon: Building2 },
  { href: "/agents", label: "Agents", icon: Users },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Phone },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const location = useLocation();
  const { favoritesCount, compareCount, isAuthenticated, user, logout } = useApp();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-xl font-bold text-foreground">Nest</span>
                <span className="font-display text-xl font-bold text-primary">Finder</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Link to="/listings">
                <Button variant="ghost" size="icon" className="relative">
                  <Search className="w-5 h-5" />
                </Button>
              </Link>
              
              <Link to="/favorites">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="w-5 h-5" />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                      {favoritesCount}
                    </span>
                  )}
                </Button>
              </Link>

              <Link to="/compare">
                <Button variant="ghost" size="icon" className="relative">
                  <GitCompare className="w-5 h-5" />
                  {compareCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                      {compareCount}
                    </span>
                  )}
                </Button>
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center gap-2 ml-2">
                  <span className="text-sm text-muted-foreground">Hi, {user?.name}</span>
                  <Button variant="outline" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setAuthModalOpen(true)}
                  className="ml-2 btn-accent"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link to="/favorites" className="relative p-2">
                <Heart className="w-5 h-5 text-foreground" />
                {favoritesCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                    {favoritesCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border bg-card"
            >
              <nav className="container-custom py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                ))}
                
                <Link
                  to="/compare"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <GitCompare className="w-5 h-5" />
                  Compare ({compareCount})
                </Link>

                <div className="pt-4 border-t border-border mt-4">
                  {isAuthenticated ? (
                    <div className="px-4 space-y-3">
                      <p className="text-sm text-muted-foreground">Logged in as {user?.name}</p>
                      <Button variant="outline" className="w-full" onClick={logout}>
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setAuthModalOpen(true);
                      }}
                      className="w-full btn-accent"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Login / Sign Up
                    </Button>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
}
