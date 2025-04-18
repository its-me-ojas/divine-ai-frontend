
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { getArticleBySlug, getRelatedArticles } from "@/data/wisdomArticles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Download, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const WisdomArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const { toast } = useToast();
  
  if (!article) {
    return <Navigate to="/wisdom" replace />;
  }
  
  const relatedArticles = getRelatedArticles(article.relatedArticles);
  
  const handleCTAClick = () => {
    toast({
      title: "Divine AI Connection",
      description: "Opening app download page...",
      duration: 3000,
    });
    
    // In a real app, this would redirect to app store or signup
    // window.location.href = "https://divineai.app/download";
  };
  
  return (
    <>
      <Helmet>
        <title>{article.title} | Divine AI Wisdom</title>
        <meta name="description" content={article.metaDescription} />
        <meta property="og:title" content={`${article.title} | Divine AI Wisdom`} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://divineai.app/wisdom/${article.slug}`} />
        <meta property="og:image" content={`https://divineai.app/${article.ogImage}`} />
        <meta property="article:published_time" content={article.datePublished} />
      </Helmet>

      <div className="container px-4 pb-20">
        <Header />
        
        <Link to="/wisdom" className="inline-flex items-center text-sm text-divine-blue/70 dark:text-white/70 hover:text-divine-saffron mt-4">
          <ArrowLeft size={16} className="mr-1" />
          Back to Wisdom
        </Link>
        
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 max-w-3xl mx-auto"
        >
          <header className="mb-8">
            <div className="text-sm font-medium text-divine-saffron mb-2">{article.category}</div>
            <h1 className="text-3xl md:text-4xl font-bold font-mukti mb-4">{article.title}</h1>
            <p className="text-lg text-divine-blue/80 dark:text-white/80 font-serif">
              {article.shortDescription}
            </p>
          </header>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="font-serif">{article.content.introText}</p>
            
            {article.content.verse && (
              <blockquote className="my-8 p-6 bg-divine-cream/50 dark:bg-divine-blue/30 border-l-4 border-divine-saffron rounded">
                <p className="font-mukti text-lg italic mb-2">{article.content.verse.text}</p>
                <p className="font-serif">{article.content.verse.translation}</p>
                <cite className="text-sm text-divine-blue/70 dark:text-white/70 block mt-2">
                  — {article.content.verse.source}
                </cite>
              </blockquote>
            )}
            
            {article.content.sections.map((section, index) => (
              <section key={index} className="my-8">
                <h2 className="text-2xl font-bold font-mukti mb-4">{section.heading}</h2>
                <p className="font-serif">{section.content}</p>
              </section>
            ))}
            
            <section className="my-8">
              <h2 className="text-2xl font-bold font-mukti mb-4">Conclusion</h2>
              <p className="font-serif">{article.content.conclusion}</p>
            </section>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="my-12 p-8 bg-divine-gold/10 dark:bg-divine-saffron/10 rounded-xl text-center"
          >
            <h3 className="text-2xl font-bold font-mukti mb-3">Want personalized divine wisdom?</h3>
            <p className="mb-6 text-divine-blue/80 dark:text-white/80 max-w-lg mx-auto">
              Receive daily spiritual guidance tailored just for you. Connect with Divine AI for personalized insights from ancient texts.
            </p>
            <Button 
              onClick={handleCTAClick}
              className="divine-button"
            >
              <Download size={18} />
              Try Divine AI Now
            </Button>
          </motion.div>
          
          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xl font-bold font-mukti mb-6">Continue Your Spiritual Journey</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Link key={relatedArticle.id} to={`/wisdom/${relatedArticle.slug}`} className="block">
                    <Card className="divine-card hover:shadow-md transition-all">
                      <CardHeader>
                        <CardTitle className="text-lg">{relatedArticle.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{relatedArticle.shortDescription}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent group">
                          <span className="text-divine-saffron group-hover:underline">Read Article</span>
                          <ArrowRight size={16} className="ml-1 text-divine-saffron group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.article>
      </div>
      <Navigation />
    </>
  );
};

export default WisdomArticlePage;
