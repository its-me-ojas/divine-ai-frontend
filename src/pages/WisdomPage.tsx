import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { wisdomArticles } from "@/data/wisdomArticles";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const WisdomPage = () => {
  const { t } = useTranslation();
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("wisdom.title")} | Spiritual Insights from Ancient Texts</title>
        <meta name="description" content={t("wisdom.subtitle")} />
        <meta property="og:title" content={`${t("wisdom.title")} | Spiritual Insights from Ancient Texts`} />
        <meta property="og:description" content={t("wisdom.subtitle")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://divineai.app/wisdom" />
        <meta property="og:image" content="https://divineai.app/wisdom-banner.jpg" />
      </Helmet>

      <div className="container px-4 pb-20">
        <Header />
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold font-mukti text-center mt-6 mb-2">{t("wisdom.title")}</h1>
          <p className="text-divine-blue/70 dark:text-white/70 text-center mb-8 max-w-2xl mx-auto">
            {t("wisdom.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {wisdomArticles.map((article) => (
            <motion.div key={article.id} variants={itemVariants}>
              <Link to={`/wisdom/${article.slug}`} className="block h-full">
                <Card className="divine-card h-full hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
                  <CardHeader>
                    <div className="text-xs font-medium text-divine-saffron mb-2">{article.category}</div>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                    <CardDescription>{article.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <BookOpen size={14} className="mr-1" />
                      <span>5 min read</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="p-0 h-auto hover:bg-transparent group">
                      <span className="text-divine-saffron group-hover:underline">{t("wisdom.readArticle")}</span>
                      <ArrowRight size={16} className="ml-1 text-divine-saffron group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Navigation />
    </>
  );
};

export default WisdomPage;
