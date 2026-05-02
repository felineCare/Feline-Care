import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, BookText as Book, ChevronRight, X } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Understanding Feline Body Language',
    excerpt: 'From tail flicks to ear positions, learn what your cat is trying to tell you.',
    content: `Cats are masters of the "silent treatment," but just because they aren’t speaking doesn’t mean they aren't talking. While humans use words, cats use a complex system of "Tail-Talk" and "Ear-Signals."

### 1. The Tail: The Feline Mood Meter
The tail is like a Wi-Fi signal for your cat’s brain—the more it moves, the more "data" (and usually drama) is being processed.
* **The Question Mark (Curved top):** This is a friendly "Hello!" They are happy to see you.
* **The Slow Swish:** Caution! Your cat is focused or slightly annoyed. Proceed with pets at your own risk.
* **The Bottle Brush (Puffed up):** Extreme fear or aggression. Your cat is trying to look like a much larger, scarier tiger.

### 2. The Ears: Radar Dishes for Sass
* **Forward and Relaxed:** "I am content and probably thinking about treats."
* **The "Airplane Ears" (Flat to the side):** This is the universal sign for "I am very unhappy with this situation." Usually seen during baths or vet visits.
* **Twitching:** They are alert and hunting... probably that invisible dust mote on the wall.

### 3. The Eyes: The Windows to the (Hungry) Soul
* **The Slow Blink:** This is the ultimate "I love you." It’s a feline kiss. If your cat slow-blinks at you, congratulations - you have been chosen.
* **Dilated Pupils:** Either the lights are low, or they are about to enter "Zoomie Mode."

**The Knowledgeable Nugget:** Unlike humans, cats don't use vocalizations (meowing) to talk to other cats very often; they developed meowing specifically to manipulate—I mean, communicate with—their humans.`,
    category: 'Behavior',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'The Importance of Senior Cat Exams',
    excerpt: 'Why cats over 10 need specialized diagnostic monitoring twice a year.',
    content: `In the world of cats, age 10 is the "Golden Era." Your cat has likely perfected the art of sleeping in a sunbeam and has retired from high-speed curtain climbing. However, just because they are slowing down doesn't mean they don't need help.

Cats are the world champions of hiding pain. In the wild, showing weakness is dangerous, so your senior cat will act "totally fine" even if they have a creaky hip or a grumbling kidney.

### 1. Why Twice a Year? (The "Cat Math" Rule)
One human year is roughly equivalent to four or five cat years. If you only see your vet once a year, that is like a human skipping a doctor's visit for five years! A lot can change in a "feline half-decade." Semi-annual exams allow us to catch small issues before they become "Emergency-at-3-AM" issues.

### 2. The "Under the Hood" Diagnostics
As a vet, I don't just look at their fur and whiskers. For seniors, we look at the data:
* **Blood Pressure:** Yes, cats get hypertension too! High blood pressure can lead to sudden blindness or heart issues.
* **Kidney Panels:** Chronic Kidney Disease (CKD) is very common in seniors. If we catch it early with blood work, we can manage it with diet rather than daily injections later.
* **Thyroid Checks:** If your old cat is suddenly acting like a hyperactive kitten at 2 AM, it might not be a "second youth"—it might be hyperthyroidism.

### 3. More Than Just Aging
Often, owners say, "He's just getting old and lazy." Frequently, that "laziness" is actually Osteoarthritis.
* **The Sign:** Your cat stops jumping on the high counter or takes "steps" to get onto the bed.
* **The Fix:** Modern veterinary medicine has amazing ways to manage joint pain so your "Tiny Tiger" can feel like a cub again.

**The Knowledgeable Nugget:** A senior cat exam isn't about looking for "problems"—it's about establishing a "baseline." When we know what is normal for your cat, we can spot the tiniest deviations instantly.`,
    category: 'Health',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=1935&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Designing a Cat-Friendly Home',
    excerpt: 'Vertical space, scent markers, and enrichment to keep your cat happy indoors.',
    content: `To us, a house is a collection of rooms, furniture, and a mortgage. To your cat, your house is a territory. If that territory is "flat" and boring, your cat might start finding their own fun—usually by "redecorating" your sofa or testing the gravity of your favorite vase.

Creating a "Cat-ified" home isn't about buying expensive furniture; it’s about understanding the three pillars of feline real estate.

### 1. The "Cat Superhighway" (Vertical Space)
Cats are "high-dwelling" predators. Being up high makes them feel safe and allows them to survey their kingdom.
* **The Goal:** Create paths where your cat can cross a room without their paws touching the floor.
* **The Fix:** Floating wall shelves, the top of the fridge, or a tall cat tree. If you have multiple cats, vertical space is a "peace treaty"—it allows them to share a room without being in each other's faces.

### 2. The "Scent Map" (Scratching & Marking)
Humans use "Welcome" mats; cats use scent markers. Scratching isn't just about sharpening claws; it’s how cats leave their "ID card" through scent glands in their paws.
* **The Fix:** Place scratching posts near where you sleep or near the entrance of rooms. If you don't give them a designated "Scent Station," they will use the corner of your mattress or the arm of your favorite chair.

### 3. The "Window to the World" (Visual Enrichment)
An indoor cat needs "Cat TV."
* **The Goal:** Stimulation without frustration.
* **The Fix:** A bird feeder outside a window is the best show in town. However, make sure there is a "retreat space" nearby where they can hide if they feel overstimulated.

### 4. Environmental Enrichment: The "Food Puzzle"
In the wild, cats don't find bowls of kibble sitting in the grass. They have to work for it.
* **The Expert Tip:** Use puzzle feeders or hide small amounts of food around the house. This triggers their "hunting" brain and prevents the "boredom bloat" (weight gain from eating out of boredom).

**The Knowledgeable Nugget:** A "cat-friendly" home reduces cortisol (the stress hormone). As a vet, I can tell you that a relaxed cat has a much stronger immune system and fewer urinary tract issues!`,
    category: 'Lifestyle',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=2070&auto=format&fit=crop',
  },
];

export default function KnowledgeBase() {
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);

  return (
    <section id="knowledge" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-brand-sand text-brand-orange rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            >
              <BookOpen size={14} />
              Educational Resources
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-navy">
              Feline Knowledge & <span className="text-brand-orange">Success Cases</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 bg-brand-sand text-brand-navy rounded-full text-base font-bold">
            <Book size={20} className="text-brand-orange" />
            Learning Hub
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <span className="bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-brand-navy/40 text-xs font-bold uppercase tracking-widest mb-2">
                <Book size={14} />
                {article.readTime}
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-navy group-hover:text-brand-orange transition-colors mb-3">
                {article.title}
              </h3>
              <p className="text-brand-navy/60 leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-2 text-brand-orange font-bold text-sm">
                Read Article
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Article Modal */}
        <AnimatePresence>
          {selectedArticle && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedArticle(null)}
                className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white w-full max-w-2xl max-h-[80vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
              >
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-6 right-6 z-10 bg-brand-sand/50 hover:bg-brand-sand p-3 rounded-full text-brand-navy transition-colors"
                >
                  <X size={20} />
                </button>
                
                <div className="overflow-y-auto p-8 md:p-12">
                  <div className="flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-widest mb-4">
                    <BookOpen size={14} />
                    {selectedArticle.category} • {selectedArticle.readTime}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-8">
                    {selectedArticle.title}
                  </h3>
                  
                  <div className="prose prose-brand max-w-none">
                    <div className="text-brand-navy/70 leading-relaxed whitespace-pre-line space-y-4">
                      {selectedArticle.content || selectedArticle.excerpt}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
