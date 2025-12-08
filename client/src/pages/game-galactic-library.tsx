import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { BookOpen, Star, Sparkles, Trophy, ArrowLeft, X } from "lucide-react";
import { Link } from "wouter";

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  rarity: "common" | "uncommon" | "rare" | "legendary";
  uniqueFact: string;
  coverColor: string;
}

const allBooks: Book[] = [
  {
    id: "pride-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Romance",
    rarity: "common",
    uniqueFact: "The original title was 'First Impressions' and was rejected by a publisher in 1797 before being rewritten.",
    coverColor: "from-pink-500 to-rose-600",
  },
  {
    id: "moby-dick",
    title: "Moby Dick",
    author: "Herman Melville",
    year: 1851,
    genre: "Adventure",
    rarity: "uncommon",
    uniqueFact: "The book was a commercial failure during Melville's lifetime, selling only 3,715 copies before his death.",
    coverColor: "from-blue-500 to-cyan-600",
  },
  {
    id: "great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Literary Fiction",
    rarity: "common",
    uniqueFact: "Fitzgerald considered titles like 'Trimalchio in West Egg' and 'Among Ash-Heaps and Millionaires' before settling on the final name.",
    coverColor: "from-yellow-500 to-amber-600",
  },
  {
    id: "frankenstein",
    title: "Frankenstein",
    author: "Mary Shelley",
    year: 1818,
    genre: "Gothic Horror",
    rarity: "rare",
    uniqueFact: "Mary Shelley was only 18 years old when she began writing this novel, which is considered the first science fiction story.",
    coverColor: "from-green-500 to-emerald-700",
  },
  {
    id: "1984",
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Dystopian",
    rarity: "uncommon",
    uniqueFact: "Orwell originally titled the book 'The Last Man in Europe' but his publisher suggested '1984' - simply reversing the year 1948 when he finished it.",
    coverColor: "from-gray-600 to-slate-800",
  },
  {
    id: "don-quixote",
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    year: 1605,
    genre: "Satire",
    rarity: "legendary",
    uniqueFact: "Considered the first modern novel ever written, it has been translated into more languages than any other book except the Bible.",
    coverColor: "from-orange-500 to-red-600",
  },
  {
    id: "war-peace",
    title: "War and Peace",
    author: "Leo Tolstoy",
    year: 1869,
    genre: "Historical Fiction",
    rarity: "rare",
    uniqueFact: "Tolstoy's wife Sophia copied the entire manuscript by hand seven times as he made revisions - that's over 1,200 pages each time.",
    coverColor: "from-red-600 to-rose-800",
  },
  {
    id: "odyssey",
    title: "The Odyssey",
    author: "Homer",
    year: -700,
    genre: "Epic Poetry",
    rarity: "legendary",
    uniqueFact: "The word 'odyssey' meaning a long journey comes from this book. It was originally performed as oral poetry for centuries before being written down.",
    coverColor: "from-indigo-500 to-purple-700",
  },
  {
    id: "jane-eyre",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: 1847,
    genre: "Gothic Romance",
    rarity: "uncommon",
    uniqueFact: "Charlotte Brontë published under the pen name 'Currer Bell' because female authors were not taken seriously at the time.",
    coverColor: "from-purple-500 to-violet-700",
  },
  {
    id: "dracula",
    title: "Dracula",
    author: "Bram Stoker",
    year: 1897,
    genre: "Gothic Horror",
    rarity: "rare",
    uniqueFact: "Stoker never visited Transylvania. He researched the region entirely through library books while working as a theater manager in London.",
    coverColor: "from-red-700 to-black",
  },
  {
    id: "alice-wonderland",
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    year: 1865,
    genre: "Fantasy",
    rarity: "common",
    uniqueFact: "The story was first told to entertain a real girl named Alice Liddell during a boat trip on July 4, 1862.",
    coverColor: "from-teal-400 to-cyan-600",
  },
  {
    id: "count-monte-cristo",
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    year: 1844,
    genre: "Adventure",
    rarity: "rare",
    uniqueFact: "The story was inspired by a real case Dumas found in police archives about a shoemaker who inherited a fortune and used it for revenge.",
    coverColor: "from-amber-600 to-yellow-800",
  },
];

const rarityColors = {
  common: "border-gray-400 text-gray-300 bg-gray-500/20",
  uncommon: "border-green-400 text-green-300 bg-green-500/20",
  rare: "border-blue-400 text-blue-300 bg-blue-500/20",
  legendary: "border-yellow-400 text-yellow-300 bg-yellow-500/20",
};

const rarityGlow = {
  common: "",
  uncommon: "0 0 10px hsl(142 71% 45% / 0.3)",
  rare: "0 0 15px hsl(217 91% 60% / 0.4)",
  legendary: "0 0 20px hsl(45 93% 47% / 0.5), 0 0 40px hsl(45 93% 47% / 0.3)",
};

export default function GalacticLibrary() {
  const [collection, setCollection] = useState<string[]>([]);
  const [availableBooks, setAvailableBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [lastDiscovered, setLastDiscovered] = useState<Book | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("galactic-library-collection");
    if (saved) {
      setCollection(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("galactic-library-collection", JSON.stringify(collection));
  }, [collection]);

  useEffect(() => {
    setAvailableBooks(allBooks.filter((book) => !collection.includes(book.id)));
  }, [collection]);

  const discoverBook = () => {
    if (availableBooks.length === 0) return;

    setIsDiscovering(true);

    const weights = availableBooks.map((book) => {
      switch (book.rarity) {
        case "common": return 40;
        case "uncommon": return 30;
        case "rare": return 20;
        case "legendary": return 10;
        default: return 40;
      }
    });

    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;

    let selectedIndex = 0;
    for (let i = 0; i < weights.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        selectedIndex = i;
        break;
      }
    }

    const discoveredBook = availableBooks[selectedIndex];

    setTimeout(() => {
      setLastDiscovered(discoveredBook);
      setCollection((prev) => [...prev, discoveredBook.id]);
      setIsDiscovering(false);
    }, 1500);
  };

  const collectedBooks = allBooks.filter((book) => collection.includes(book.id));
  const progress = (collection.length / allBooks.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/games">
              <Button variant="ghost" className="gap-2" data-testid="button-back-games">
                <ArrowLeft className="w-4 h-4" />
                Back to Games
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen
                className="w-10 h-10"
                style={{ color: "hsl(187 100% 50%)" }}
              />
              <h1
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider"
                style={{
                  color: "hsl(187 100% 50%)",
                  textShadow: "0 0 10px hsl(187 100% 50%), 0 0 20px hsl(187 100% 50% / 0.5)",
                }}
                data-testid="text-game-title"
              >
                Galactic Library
              </h1>
            </div>
            <p className="text-muted-foreground font-heading tracking-wide max-w-2xl mx-auto">
              Discover classic books from across the cosmos and build your ultimate literary collection
            </p>
          </div>

          <Card
            className="bg-card/50 backdrop-blur-xl border-primary/20 mb-8"
            style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)" }}
          >
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <span className="font-heading text-lg">
                    Collection: {collection.length} / {allBooks.length}
                  </span>
                </div>
                <div className="flex gap-2 text-sm">
                  <Badge variant="outline" className={rarityColors.common}>Common</Badge>
                  <Badge variant="outline" className={rarityColors.uncommon}>Uncommon</Badge>
                  <Badge variant="outline" className={rarityColors.rare}>Rare</Badge>
                  <Badge variant="outline" className={rarityColors.legendary}>Legendary</Badge>
                </div>
              </div>
              <Progress value={progress} className="h-3" />
              {collection.length === allBooks.length && (
                <p className="text-center mt-4 text-yellow-400 font-heading flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Congratulations! You've collected all books!
                  <Sparkles className="w-5 h-5" />
                </p>
              )}
            </CardContent>
          </Card>

          <div className="text-center mb-12">
            <Button
              size="lg"
              onClick={discoverBook}
              disabled={isDiscovering || availableBooks.length === 0}
              className="text-lg px-8 py-6"
              style={{
                boxShadow: "0 0 20px hsl(187 100% 50% / 0.3)",
              }}
              data-testid="button-discover-book"
            >
              {isDiscovering ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Discovering...
                </>
              ) : availableBooks.length === 0 ? (
                "Collection Complete!"
              ) : (
                <>
                  <Star className="w-5 h-5 mr-2" />
                  Discover New Book
                </>
              )}
            </Button>
          </div>

          {lastDiscovered && (
            <Card
              className="bg-card/50 backdrop-blur-xl border-primary/20 mb-8 relative overflow-visible"
              style={{
                boxShadow: rarityGlow[lastDiscovered.rarity] || "0 0 20px hsl(187 100% 50% / 0.1)",
              }}
            >
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => setLastDiscovered(null)}
                data-testid="button-close-discovery"
              >
                <X className="w-4 h-4" />
              </Button>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <span className="font-heading text-lg text-yellow-400">New Discovery!</span>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div
                    className={`w-32 h-44 rounded-md bg-gradient-to-br ${lastDiscovered.coverColor} flex items-center justify-center shrink-0`}
                    style={{ boxShadow: rarityGlow[lastDiscovered.rarity] }}
                  >
                    <BookOpen className="w-12 h-12 text-white/80" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3
                        className="font-heading text-xl font-semibold"
                        style={{ color: "hsl(187 100% 70%)" }}
                      >
                        {lastDiscovered.title}
                      </h3>
                      <Badge variant="outline" className={rarityColors[lastDiscovered.rarity]}>
                        {lastDiscovered.rarity}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">
                      by {lastDiscovered.author} ({lastDiscovered.year < 0 ? `${Math.abs(lastDiscovered.year)} BCE` : lastDiscovered.year})
                    </p>
                    <Badge variant="secondary" className="mb-4">{lastDiscovered.genre}</Badge>
                    <div className="bg-primary/5 border border-primary/20 rounded-md p-4">
                      <p className="text-sm font-heading text-primary mb-1">Unique Fact:</p>
                      <p className="text-sm text-muted-foreground">{lastDiscovered.uniqueFact}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <h2
            className="font-heading text-2xl font-semibold tracking-wide mb-6"
            style={{ color: "hsl(187 100% 70%)" }}
          >
            Your Collection
          </h2>

          {collectedBooks.length === 0 ? (
            <Card className="bg-card/50 backdrop-blur-xl border-primary/20">
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground font-heading">
                  Your collection is empty. Click "Discover New Book" to start collecting!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {collectedBooks.map((book) => (
                <Card
                  key={book.id}
                  className="bg-card/50 backdrop-blur-xl border-primary/20 cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-visible"
                  style={{ boxShadow: rarityGlow[book.rarity] }}
                  onClick={() => setSelectedBook(book)}
                  data-testid={`card-collected-${book.id}`}
                >
                  <CardContent className="p-3">
                    <div
                      className={`aspect-[2/3] rounded-md bg-gradient-to-br ${book.coverColor} flex items-center justify-center mb-2`}
                    >
                      <BookOpen className="w-8 h-8 text-white/80" />
                    </div>
                    <p className="text-xs font-heading truncate" title={book.title}>
                      {book.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{book.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedBook && (
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedBook(null)}
            >
              <Card
                className="bg-card backdrop-blur-xl border-primary/20 max-w-lg w-full overflow-visible"
                style={{ boxShadow: rarityGlow[selectedBook.rarity] }}
                onClick={(e) => e.stopPropagation()}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className={rarityColors[selectedBook.rarity]}>
                      {selectedBook.rarity}
                    </Badge>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setSelectedBook(null)}
                      data-testid="button-close-detail"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div
                      className={`w-28 h-40 rounded-md bg-gradient-to-br ${selectedBook.coverColor} flex items-center justify-center shrink-0 mx-auto sm:mx-0`}
                      style={{ boxShadow: rarityGlow[selectedBook.rarity] }}
                    >
                      <BookOpen className="w-10 h-10 text-white/80" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3
                        className="font-heading text-xl font-semibold mb-1"
                        style={{ color: "hsl(187 100% 70%)" }}
                      >
                        {selectedBook.title}
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        by {selectedBook.author}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Published: {selectedBook.year < 0 ? `${Math.abs(selectedBook.year)} BCE` : selectedBook.year}
                      </p>
                      <Badge variant="secondary">{selectedBook.genre}</Badge>
                    </div>
                  </div>
                  <div className="mt-6 bg-primary/5 border border-primary/20 rounded-md p-4">
                    <p className="text-sm font-heading text-primary mb-2">Unique Fact:</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedBook.uniqueFact}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
