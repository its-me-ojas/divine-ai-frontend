
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col transition-theme">
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Divine AI Sadhana Path</h1>
          <p className="text-xl text-muted-foreground">
            Explore ancient Hindu wisdom through modern AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="transition-theme">
            <CardHeader>
              <CardTitle>Spiritual Wisdom</CardTitle>
              <CardDescription>
                Discover insights from ancient Hindu texts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Access timeless knowledge from the Vedas, Upanishads, Bhagavad Gita and more.
                Our AI-powered platform makes these teachings accessible and relevant.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Explore Wisdom</Button>
            </CardFooter>
          </Card>

          <Card className="transition-theme">
            <CardHeader>
              <CardTitle>Digital Sadhana</CardTitle>
              <CardDescription>
                Practice spiritual disciplines with technological support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Enhance your meditation, prayer, and study with AI-assisted tools.
                Track your progress and build consistency in your spiritual practice.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Start Sadhana</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-primary/5 rounded-lg p-8 text-center transition-theme">
          <h2 className="text-2xl font-bold mb-4">Begin Your Spiritual Journey</h2>
          <p className="mb-6">
            Our platform combines the depth of Hindu philosophy with the convenience of modern technology.
            Start your journey toward self-realization and inner peace today.
          </p>
          <Button size="lg" className="transition-theme">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
