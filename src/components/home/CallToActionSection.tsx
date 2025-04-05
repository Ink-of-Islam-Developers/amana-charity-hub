
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const CallToActionSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="bg-amana-primary text-white py-16 md:py-24">
      <div className="container text-center">
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{t("cta.title")}</h2>
          <p className="text-lg md:text-xl text-white/90">
            {t("cta.subtitle")}
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-amana-primary hover:bg-amana-accent">
                {t("cta.donate")}
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {t("cta.volunteer")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
