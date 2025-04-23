import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { wisdomArticles } from "@/data/wisdomArticles";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const WisdomPage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Group articles by category
  const categories = [...new Set(wisdomArticles.map(article => article.category))];
  
  // Filter articles based on search query
  const filteredArticles = wisdomArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <div className="min-h-screen bg-divine-cream/50 dark:bg-divine-dark text-divine-dark dark:text-white pb-20">
        <div className="container max-w-xl mx-auto px-4">
          <Header />
          
          <main className="py-4">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-mukti font-bold mb-6 text-center"
            >
              {t("wisdom.title")}
            </motion.h1>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-divine-blue/50 dark:text-white/50" size={18} />
              <Input
                type="text"
                placeholder="Search wisdom articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="w-full justify-start overflow-x-auto space-x-2 pb-2">
                <TabsTrigger value="all">All</TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {filteredArticles.map((article) => (
                  <Link key={article.id} to={`/wisdom/${article.slug}`} className="block">
                    <Card className="divine-card hover:shadow-md transition-all">
                      <CardHeader>
                        <div className="text-xs font-medium text-divine-saffron mb-2">{article.category}</div>
                        <CardTitle className="text-lg">{article.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{article.shortDescription}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <BookOpen size={14} className="mr-1" />
                          <span>5 min read</span>
                        </div>
                        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent group">
                          <span className="text-divine-saffron group-hover:underline">{t("wisdom.readArticle")}</span>
                          <ArrowRight size={16} className="ml-1 text-divine-saffron group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </TabsContent>

              {categories.map((category) => (
                <TabsContent key={category} value={category} className="space-y-4">
                  {filteredArticles
                    .filter((article) => article.category === category)
                    .map((article) => (
                      <Link key={article.id} to={`/wisdom/${article.slug}`} className="block">
                        <Card className="divine-card hover:shadow-md transition-all">
                          <CardHeader>
                            <div className="text-xs font-medium text-divine-saffron mb-2">{article.category}</div>
                            <CardTitle className="text-lg">{article.title}</CardTitle>
                            <CardDescription className="line-clamp-2">{article.shortDescription}</CardDescription>
                          </CardHeader>
                          <CardFooter className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <BookOpen size={14} className="mr-1" />
                              <span>5 min read</span>
                            </div>
                            <Button variant="ghost" className="p-0 h-auto hover:bg-transparent group">
                              <span className="text-divine-saffron group-hover:underline">{t("wisdom.readArticle")}</span>
                              <ArrowRight size={16} className="ml-1 text-divine-saffron group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                </TabsContent>
              ))}
            </Tabs>
          </main>
          
          <Navigation />
        </div>
      </div>
    </>
  );
};

export default WisdomPage;
