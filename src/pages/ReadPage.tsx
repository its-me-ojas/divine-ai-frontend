import { useState } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bookmark, Share2, Volume2, ChevronLeft, ChevronRight } from "lucide-react";

// Sample data - replace with actual API data later
const chapters = [
  {
    id: 1,
    title: "Arjuna Vishada Yoga",
    verses: [
      {
        id: 1,
        sanskrit: "धृतराष्ट्र उवाच धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः। मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥",
        translation: "Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled at the holy place of Kurukshetra, eager for battle?",
        explanation: "The first verse of the Bhagavad Gita sets the scene for the great battle of Kurukshetra. Dhritarashtra, the blind king, asks his minister Sanjaya about the events on the battlefield."
      },
      {
        id: 2,
        sanskrit: "सञ्जय उवाच दृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा। आचार्यमुपसङ्गम्य राजा वचनमब्रवीत्॥",
        translation: "Sanjaya said: Having seen the army of the Pandavas drawn up in battle array, King Duryodhana approached his teacher Drona and spoke these words:",
        explanation: "Sanjaya describes how Duryodhana, seeing the Pandava army arrayed for battle, went to his teacher Drona to express his concerns."
      },
      {
        id: 3,
        sanskrit: "पश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम्। व्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता॥",
        translation: "Behold, O Teacher, this mighty army of the sons of Pandu, arrayed by the son of Drupada, your wise disciple.",
        explanation: "Duryodhana points out the well-organized Pandava army to Drona, noting that it was arranged by Drupada's son, who was once Drona's student."
      }
    ]
  },
  {
    id: 2,
    title: "Sankhya Yoga",
    verses: [
      {
        id: 1,
        sanskrit: "सञ्जय उवाच तं तथा कृपयाविष्टमश्रुपूर्णाकुलेक्षणम्। विषीदन्तमिदं वाक्यमुवाच मधुसूदनः॥",
        translation: "Sanjaya said: To him who was thus overcome with pity and despondency, with eyes full of tears and agitated, Madhusudana (Krishna) spoke these words:",
        explanation: "Sanjaya describes Arjuna's state of despair and how Krishna begins to address him."
      },
      {
        id: 2,
        sanskrit: "श्रीभगवानुवाच कुतस्त्वा कश्मलमिदं विषमे समुपस्थितम्। अनार्यजुष्टमस्वर्ग्यमकीर्तिकरमर्जुन॥",
        translation: "The Blessed Lord said: Whence has this dejection come upon you at this critical hour, O Arjuna? It is unbecoming of a noble person, it is disgraceful, and it is contrary to the attainment of heaven.",
        explanation: "Krishna questions Arjuna's despondency, calling it unworthy of a noble person and contrary to spiritual progress."
      }
    ]
  }
];

const ReadPage = () => {
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [selectedVerse, setSelectedVerse] = useState(1);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showExplanation, setShowExplanation] = useState(true);

  const currentChapter = chapters.find(ch => ch.id === selectedChapter);
  const currentVerse = currentChapter?.verses.find(v => v.id === selectedVerse);

  const handleNextVerse = () => {
    if (!currentChapter || !currentVerse) return;

    const nextVerseId = selectedVerse + 1;
    const nextVerse = currentChapter.verses.find(v => v.id === nextVerseId);

    if (nextVerse) {
      setSelectedVerse(nextVerseId);
    } else {
      // Move to next chapter if available
      const nextChapter = chapters.find(ch => ch.id === selectedChapter + 1);
      if (nextChapter) {
        setSelectedChapter(selectedChapter + 1);
        setSelectedVerse(1);
      }
    }
  };

  const handlePreviousVerse = () => {
    if (!currentChapter || !currentVerse) return;

    const prevVerseId = selectedVerse - 1;
    if (prevVerseId > 0) {
      setSelectedVerse(prevVerseId);
    } else {
      // Move to previous chapter if available
      const prevChapter = chapters.find(ch => ch.id === selectedChapter - 1);
      if (prevChapter) {
        setSelectedChapter(selectedChapter - 1);
        setSelectedVerse(prevChapter.verses.length);
      }
    }
  };

  return (
    <div className="min-h-screen bg-divine-cream/50 dark:bg-divine-dark text-divine-dark dark:text-white pb-20">
      <div className="container max-w-xl mx-auto px-4">
        <Header />
        
        <main className="py-4">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-mukti font-bold mb-6"
          >
            Bhagavad Gita
          </motion.h1>

          <div className="space-y-6">
            {/* Chapter and Verse Selection */}
            <div className="flex gap-4">
              <Select value={String(selectedChapter)} onValueChange={(v) => setSelectedChapter(Number(v))}>
                <SelectTrigger className="w-1/2">
                  <SelectValue placeholder="Select Chapter" />
                </SelectTrigger>
                <SelectContent>
                  {chapters.map(chapter => (
                    <SelectItem key={chapter.id} value={String(chapter.id)}>
                      Chapter {chapter.id}: {chapter.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={String(selectedVerse)} onValueChange={(v) => setSelectedVerse(Number(v))}>
                <SelectTrigger className="w-1/2">
                  <SelectValue placeholder="Select Verse" />
                </SelectTrigger>
                <SelectContent>
                  {currentChapter?.verses.map(verse => (
                    <SelectItem key={verse.id} value={String(verse.id)}>
                      Verse {verse.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Verse Display */}
            {currentVerse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="divine-card space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-mukti font-semibold">
                    Chapter {selectedChapter}, Verse {selectedVerse}
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Volume2 size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Bookmark size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 size={20} />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-2xl font-mukti text-center">
                    {currentVerse.sanskrit}
                  </div>

                  {showTranslation && (
                    <div className="text-lg">
                      <p className="font-semibold mb-2">Translation:</p>
                      <p>{currentVerse.translation}</p>
                    </div>
                  )}

                  {showExplanation && (
                    <div className="text-lg">
                      <p className="font-semibold mb-2">Explanation:</p>
                      <p>{currentVerse.explanation}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Button
                      variant={showTranslation ? "default" : "outline"}
                      onClick={() => setShowTranslation(!showTranslation)}
                      className="flex-1"
                    >
                      {showTranslation ? "Hide Translation" : "Show Translation"}
                    </Button>
                    <Button
                      variant={showExplanation ? "default" : "outline"}
                      onClick={() => setShowExplanation(!showExplanation)}
                      className="flex-1"
                    >
                      {showExplanation ? "Hide Explanation" : "Show Explanation"}
                    </Button>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={handlePreviousVerse}
                      disabled={selectedChapter === 1 && selectedVerse === 1}
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft size={20} />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleNextVerse}
                      disabled={selectedChapter === chapters.length && selectedVerse === currentChapter.verses.length}
                      className="flex items-center gap-2"
                    >
                      Next
                      <ChevronRight size={20} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </main>
        
        <Navigation />
      </div>
    </div>
  );
};

export default ReadPage; 