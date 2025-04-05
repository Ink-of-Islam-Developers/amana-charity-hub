
import { createContext, useState, useContext, ReactNode } from "react";

type Language = "en" | "am";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  en: {
    // Hero Section
    "hero.title": "Helping Those Who Need It Most",
    "hero.subtitle": "Amana Charity & Edir connects donors with families in need through transparent and impactful aid distribution. Together, we can make a difference.",
    "hero.donate": "Donate Now",
    "hero.learnMore": "Learn More",
    
    // Navigation
    "nav.home": "Home",
    "nav.events": "Events",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.adminLogin": "Admin Login",
    
    // Call to Action Section
    "cta.title": "Make a Difference Today",
    "cta.subtitle": "Your support can transform lives. Join our mission to help those in need and create lasting change in our community.",
    "cta.donate": "Donate Now",
    "cta.volunteer": "Volunteer with Us",
    
    // Footer
    "footer.about": "Empowering communities through transparent charity and support for those in need.",
    "footer.quickLinks": "Quick Links",
    "footer.contactUs": "Contact Us",
    "footer.newsletter": "Newsletter",
    "footer.subscribe": "Subscribe to our newsletter for updates on our charity work and events.",
    "footer.subscribeButton": "Subscribe",
    "footer.rights": "All rights reserved."
  },
  am: {
    // Hero Section
    "hero.title": "እርዳታ ለሚፈልጉ ሰዎች",
    "hero.subtitle": "አማና የበጎ አድራጎት ድርጅት ለገንዘብ ለጋሾችን ከችግረኛ ቤተሰቦች ጋር በግልጽና ውጤታማ የእርዳታ ስርጭት ያገናኛል። አብረን ልዩነት መፍጠር እንችላለን።",
    "hero.donate": "አሁን ይለግሱ",
    "hero.learnMore": "የበለጠ ይወቁ",
    
    // Navigation
    "nav.home": "መነሻ",
    "nav.events": "ዝግጅቶች",
    "nav.about": "ስለ እኛ",
    "nav.contact": "ያግኙን",
    "nav.adminLogin": "የአስተዳደር መግቢያ",
    
    // Call to Action Section
    "cta.title": "ዛሬ ልዩነት ይፍጠሩ",
    "cta.subtitle": "የእርስዎ ድጋፍ ሕይወትን መለወጥ ይችላል። እርዳታ በሚፈልጉት ላይ ዘላቂ ለውጥ ለመፍጠር በተልዕኮአችን ይቀላቀሉን።",
    "cta.donate": "አሁን ይለግሱ",
    "cta.volunteer": "ከእኛ ጋር ይሳተፉ",
    
    // Footer
    "footer.about": "ግልፅ በሆነ የበጎ አድራጎት እና እርዳታ በማቅረብ ማህበረሰቦችን ማብቃት።",
    "footer.quickLinks": "ፈጣን አገናኞች",
    "footer.contactUs": "አግኙን",
    "footer.newsletter": "የዜና መጽሄት",
    "footer.subscribe": "ስለ በጎ አድራጎት ሥራችን እና ዝግጅቶች ዝማኔዎችን ለመቀበል ይመዝገቡ።",
    "footer.subscribeButton": "ተመዝገቡ",
    "footer.rights": "መብቱ በህግ የተጠበቀ ነው።"
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Provider component
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
