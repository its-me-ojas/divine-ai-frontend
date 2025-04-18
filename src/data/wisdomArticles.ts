
export interface WisdomArticle {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  metaDescription: string;
  ogImage: string;
  category: string;
  content: {
    introText: string;
    verse?: {
      text: string;
      source: string;
      translation?: string;
    };
    sections: {
      heading: string;
      content: string;
    }[];
    conclusion: string;
  };
  relatedArticles: string[]; // Array of slugs
  datePublished: string;
}

export const wisdomArticles: WisdomArticle[] = [
  {
    id: "1",
    slug: "krishna-anxiety-advice",
    title: "Krishna's Advice for Anxiety",
    shortDescription: "Discover how Lord Krishna's timeless wisdom can help manage anxiety and stress in modern life.",
    metaDescription: "Learn how the Bhagavad Gita's teachings from Lord Krishna provide practical solutions for overcoming anxiety and finding peace in the modern world.",
    ogImage: "krishna-anxiety.jpg", // This would be a placeholder for now
    category: "Mental Wellness",
    content: {
      introText: "In today's fast-paced world, anxiety has become a common companion for many. The ancient wisdom from Lord Krishna in the Bhagavad Gita offers timeless solutions that are remarkably applicable to our modern struggles with anxiety and stress.",
      verse: {
        text: "प्रकाशं च प्रवृत्तिं च मोहमेव च पाण्डव। न द्वेष्टि सम्प्रवृत्तानि न निवृत्तानि काङ्क्षति॥",
        source: "Bhagavad Gita, Chapter 14, Verse 22",
        translation: "O son of Pandu, he who neither hates illumination, activity, and delusion when they are present, nor longs for them when they disappear..."
      },
      sections: [
        {
          heading: "Understanding Anxiety Through Krishna's Lens",
          content: "Krishna teaches us that anxiety often stems from attachment to outcomes. When we attach our happiness to specific results, we create suffering. In the Gita, Krishna explains that equanimity—maintaining calm in both favorable and unfavorable circumstances—is the key to transcending anxiety. This ancient wisdom mirrors modern psychological approaches that emphasize accepting what we cannot control."
        },
        {
          heading: "Practical Steps from the Gita for Calming Anxiety",
          content: "The Bhagavad Gita offers practical techniques for managing anxiety. Krishna advocates for karma yoga—performing your duties without attachment to results. This approach teaches us to focus on the process rather than outcomes, reducing anticipatory anxiety. Additionally, the practice of mindfulness through meditation (dhyana yoga) cultivates present-moment awareness, a technique now scientifically proven to reduce anxiety symptoms."
        },
        {
          heading: "Implementing Divine Wisdom in Daily Life",
          content: "To apply Krishna's teachings, start by identifying areas where you're overly attached to outcomes. Practice letting go through small daily acts of surrendering results. Establish a regular meditation practice, even if just 5-10 minutes daily. Remember Krishna's assurance that spiritual growth is never lost—each small step toward managing anxiety through these teachings builds upon itself, even if progress seems slow."
        }
      ],
      conclusion: "Lord Krishna's teachings provide a comprehensive framework for understanding and addressing anxiety at its root. By embracing the wisdom of detachment from outcomes while remaining engaged in life, we can find peace even in challenging circumstances. These ancient insights complement modern therapeutic approaches and offer a spiritual dimension to healing that addresses not just the symptoms but the deeper causes of anxiety."
    },
    relatedArticles: ["best-hindu-mantras-peace", "bhagavad-gita-love"],
    datePublished: "2023-04-15"
  },
  {
    id: "2",
    slug: "bhagavad-gita-love",
    title: "Bhagavad Gita on Love",
    shortDescription: "Explore the profound teachings on love, devotion and relationships from the sacred Bhagavad Gita.",
    metaDescription: "Discover the Bhagavad Gita's profound insights on divine and human love, devotion (bhakti), and building meaningful relationships based on spiritual principles.",
    ogImage: "gita-love.jpg", // This would be a placeholder for now
    category: "Relationships",
    content: {
      introText: "Love is a central theme in the Bhagavad Gita, though perhaps not in the way many might initially expect. While romantic love isn't its primary focus, the Gita offers profound insights into love as a spiritual force, as selfless devotion (bhakti), and as the foundation for meaningful human connections.",
      verse: {
        text: "मय्यावेश्य मनो ये मां नित्ययुक्ता उपासते। श्रद्धया परयोपेतास्ते मे युक्ततमा मताः॥",
        source: "Bhagavad Gita, Chapter 12, Verse 2",
        translation: "Those who fix their minds on Me and always engage in My devotion with steadfast faith, I consider them to be the most perfect yogis."
      },
      sections: [
        {
          heading: "Bhakti: The Highest Form of Love",
          content: "In the Bhagavad Gita, Krishna reveals bhakti (loving devotion) as the supreme path. Unlike conditional worldly love, bhakti is about unconditional love toward the Divine. This devotion isn't blind faith but a profound connection that transforms the devotee. Krishna explains that through bhakti, one experiences divine love that surpasses all other attachments, bringing lasting fulfillment that no worldly relationship can provide."
        },
        {
          heading: "Love Without Attachment",
          content: "A revolutionary concept in the Gita is that of loving without attachment. Krishna teaches that attachment-based love leads to suffering, while love free from possessiveness brings peace. This doesn't mean becoming emotionally detached from loved ones; rather, it means loving them purely, without expectations or conditions. This wisdom applies profoundly to relationships, suggesting that the healthiest bonds are those where we love others for who they are, not for what they provide us."
        },
        {
          heading: "Divine Love in Human Relationships",
          content: "The Gita offers a framework for elevating human relationships by infusing them with spiritual principles. When we see the divine spark in others, we naturally approach relationships with greater reverence and compassion. Krishna's teachings suggest that truly loving another person means supporting their highest good and spiritual growth, sometimes requiring us to transcend our own desires and expectations. This selfless approach to relationships mirrors the divine love that Krishna describes as his nature."
        }
      ],
      conclusion: "The Bhagavad Gita's teachings on love offer a transformative perspective that can enrich both our spiritual practice and our human relationships. By cultivating devotion to the Divine while practicing detached love in our worldly connections, we can experience deeper, more meaningful relationships free from the suffering that often accompanies attachment-based love. These ancient teachings remain remarkably relevant today, offering a path to love that is both transcendent and practical in daily life."
    },
    relatedArticles: ["krishna-anxiety-advice", "best-hindu-mantras-peace"],
    datePublished: "2023-05-20"
  },
  {
    id: "3",
    slug: "best-hindu-mantras-peace",
    title: "Best Hindu Mantras for Peace",
    shortDescription: "Discover powerful Hindu mantras that can bring inner peace, calm, and spiritual harmony to your daily life.",
    metaDescription: "Explore ancient Hindu mantras for cultivating inner peace, reducing stress, and enhancing spiritual well-being. Learn proper pronunciation, meanings, and how to incorporate these sacred sounds into your daily practice.",
    ogImage: "mantras-peace.jpg", // This would be a placeholder for now
    category: "Spiritual Practices",
    content: {
      introText: "For thousands of years, Hindu mantras have been revered as sacred sound formulas that can transform consciousness and bring peace to the mind and heart. These powerful vibrations are more than just beautiful sounds—they are precise spiritual technologies designed to align us with higher frequencies and states of awareness. In today's chaotic world, these ancient peace mantras are perhaps more valuable than ever.",
      verse: {
        text: "ॐ शान्तिः शान्तिः शान्तिः",
        source: "Brihadaranyaka Upanishad 5.1.1",
        translation: "Om Peace, Peace, Peace"
      },
      sections: [
        {
          heading: "The Science Behind Mantra Meditation",
          content: "Hindu mantras work on multiple levels—physical, mental, and spiritual. When chanted properly, these sacred sounds create specific vibration patterns that affect our nervous system and brain wave patterns. Modern research has shown that mantra meditation reduces stress hormones like cortisol while increasing relaxation responses. The rhythmic nature of mantra recitation naturally slows and regulates breathing, activating the parasympathetic nervous system—our body's built-in peace response. This ancient practice has remarkable neurological benefits that science is only beginning to understand."
        },
        {
          heading: "Powerful Peace Mantras for Daily Practice",
          content: "The Om Shanti mantra (ॐ शान्तिः शान्तिः शान्तिः) is perhaps the most universal peace invocation, calling for peace in the physical, mental, and spiritual realms. The Gayatri Mantra is another profound peace-bringer, purifying the mind and awakening wisdom. For emotional healing, the Maha Mrityunjaya Mantra offers protection and inner strength. The simple yet powerful 'Om Namah Shivaya' connects us to the peaceful aspect of consciousness represented by Lord Shiva. Each of these mantras carries specific vibrations that, when chanted with proper intention, can transform your state of being."
        },
        {
          heading: "Incorporating Mantras Into Your Daily Life",
          content: "Begin with just 5-10 minutes of daily practice, gradually increasing as the benefits become apparent. Morning recitation sets a peaceful tone for the day, while evening practice helps release accumulated stress. Choose one mantra that resonates with you rather than switching between many. Traditional practice recommends using a mala (108-bead string) to count repetitions, though it's not required. The key is consistency—even a brief daily practice is more effective than occasional longer sessions. Remember that correct pronunciation is important, so consider learning from authentic recordings or qualified teachers."
        }
      ],
      conclusion: "Hindu peace mantras offer a time-tested pathway to inner calm that requires no elaborate equipment or special locations—just your voice and focused attention. As you develop your practice, you may notice benefits extending beyond meditation sessions into your daily life: improved stress responses, greater emotional balance, and a deepening sense of spiritual connection. In a world of constant noise and distraction, these ancient sound formulas provide access to the peace that has always resided within you, waiting to be awakened through the power of sacred sound."
    },
    relatedArticles: ["krishna-anxiety-advice", "bhagavad-gita-love"],
    datePublished: "2023-06-10"
  }
];

export const getArticleBySlug = (slug: string): WisdomArticle | undefined => {
  return wisdomArticles.find(article => article.slug === slug);
};

export const getRelatedArticles = (slugs: string[]): WisdomArticle[] => {
  return wisdomArticles.filter(article => slugs.includes(article.slug));
};
