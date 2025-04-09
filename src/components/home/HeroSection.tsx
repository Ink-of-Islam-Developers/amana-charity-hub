import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-b from-amana-light to-white py-20 md:py-32">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amana-dark leading-tight">
              <span className="text-amana-primary">{t("hero.title")}</span>
            </h1>
            <p className="text-lg text-gray-700 md:pr-10">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-amana-primary hover:bg-amana-dark"
                >
                  {t("hero.donate")}
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-amana-primary text-amana-primary hover:bg-amana-light"
                >
                  {t("hero.learnMore")}
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-video md:aspect-square rounded-xl overflow-hidden shadow-xl animate-fade-in animate-delay-200">
            <img
              src="\public\african-farmer-s-hands-close-up.jpg"
              alt="A group of volunteers helping community members"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="p-6 text-white">
                <p className="font-semibold">
                  Making an impact in our community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;
