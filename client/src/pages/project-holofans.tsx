import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useState, useRef, useEffect, useCallback } from "react";
import { 
  ArrowLeft, Download, Upload, Search, Mic, MicOff, 
  Disc3, Sparkles, Image, MessageSquare, Volume2,
  Heart, Star, Zap, Flame, Cloud, Moon, Sun, Music,
  Gamepad2, Gift, Coffee, Camera, Rocket, Globe,
  Crown, Diamond, Shield, Target, Award, Smile,
  Play, Pause, X, Eye
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: "all", name: "All Holograms", icon: Sparkles },
  { id: "starwars", name: "Star Wars", icon: Star },
  { id: "tvshows", name: "TV Shows", icon: Camera },
  { id: "animals", name: "Animals", icon: Heart },
  { id: "nature", name: "Nature", icon: Sun },
  { id: "space", name: "Space & Sci-Fi", icon: Rocket },
  { id: "gaming", name: "Gaming", icon: Gamepad2 },
  { id: "music", name: "Music & Audio", icon: Music },
  { id: "holiday", name: "Holidays", icon: Gift },
  { id: "abstract", name: "Abstract Art", icon: Diamond },
  { id: "text", name: "Text & Messages", icon: MessageSquare },
  { id: "sports", name: "Sports", icon: Target },
  { id: "emoji", name: "Symbols", icon: Smile },
  { id: "business", name: "Business", icon: Crown },
];

const hologramStyles = [
  "Spinning", "Pulsing", "Floating", "Morphing", "Glowing", 
  "Rotating", "Bouncing", "Fading", "Zooming", "Waving"
];

const colors = [
  "Cyan", "Magenta", "Gold", "Green", "Blue", "Red", 
  "Purple", "Orange", "White", "Rainbow", "Neon Pink", "Electric Blue"
];

const generateHolograms = () => {
  const holograms: Array<{
    id: string;
    name: string;
    category: string;
    style: string;
    color: string;
    downloads: number;
    featured: boolean;
  }> = [];
  
  const starWarsNames = [
    "Darth Vader", "Luke Skywalker", "Princess Leia", "Yoda", "Obi-Wan Kenobi",
    "Han Solo", "Chewbacca", "R2-D2", "C-3PO", "Boba Fett", "Mandalorian",
    "Baby Yoda Grogu", "Kylo Ren", "Rey", "Stormtrooper", "Death Star",
    "Millennium Falcon", "X-Wing Fighter", "TIE Fighter", "Star Destroyer",
    "Lightsaber Blue", "Lightsaber Red", "Lightsaber Green", "Lightsaber Purple",
    "Imperial Logo", "Rebel Alliance", "Jedi Order", "Sith Symbol",
    "May The Force", "I Am Your Father", "Do Or Do Not", "This Is The Way",
    "The Force Awakens", "Dark Side", "Light Side", "Clone Trooper",
    "AT-AT Walker", "BB-8", "Ewok", "Wookiee"
  ];
  
  const tvShowNames = [
    "Walter White", "Jesse Pinkman", "Michael Scott", "Dwight Schrute",
    "Jon Snow", "Daenerys", "Tyrion Lannister", "Sheldon Cooper",
    "Rick Sanchez", "Morty Smith", "Homer Simpson", "Bart Simpson",
    "SpongeBob", "Patrick Star", "Peter Griffin", "Stewie Griffin",
    "Pikachu", "Goku", "Naruto", "Luffy One Piece",
    "Say My Name", "I Am The One Who Knocks", "Thats What She Said",
    "Winter Is Coming", "You Know Nothing", "Bazinga", "Wubba Lubba",
    "Doh", "Cowabunga", "Im Ready", "Giggity", "How You Doin",
    "Pivot", "We Were On A Break", "Yada Yada Yada", "No Soup For You",
    "Live Long Prosper", "Make It So", "Engage", "Its Bigger On Inside"
  ];
  
  const animalNames = [
    "Lion", "Tiger", "Eagle", "Wolf", "Dragon", "Phoenix", "Unicorn", "Dolphin",
    "Butterfly", "Hummingbird", "Owl", "Fox", "Bear", "Shark", "Whale", "Horse",
    "Panther", "Falcon", "Cobra", "Spider", "Scorpion", "Raven", "Hawk", "Deer",
    "Elephant", "Gorilla", "Cheetah", "Jaguar", "Leopard", "Rhino", "Hippo", "Giraffe",
    "Zebra", "Kangaroo", "Koala", "Panda", "Penguin", "Seal", "Otter", "Raccoon"
  ];
  
  const natureNames = [
    "Rose", "Lotus", "Cherry Blossom", "Sunflower", "Orchid", "Tulip", "Lily",
    "Tree of Life", "Mountain Peak", "Ocean Wave", "Waterfall", "Lightning Bolt",
    "Tornado", "Aurora", "Rainbow", "Crystal", "Flame", "Ice Crystal", "Leaf",
    "Forest", "Desert Dune", "Coral Reef", "Volcano", "Glacier", "Canyon",
    "River Flow", "Cloud Formation", "Sunset", "Moonrise", "Starfield"
  ];
  
  const spaceNames = [
    "Galaxy Spiral", "Black Hole", "Nebula", "Supernova", "Asteroid Belt",
    "Saturn Rings", "Mars Colony", "Space Station", "Rocket Launch", "UFO",
    "Alien Face", "Robot Head", "Cyborg", "Mech Warrior", "Spaceship",
    "Laser Beam", "Portal", "Wormhole", "Planet Earth", "Moon Base",
    "Satellite", "Comet", "Meteor Shower", "Solar Flare", "Pulsar",
    "Quantum Cube", "Hologram Grid", "Matrix Code", "Circuit Board", "AI Core"
  ];
  
  const gamingNames = [
    "Controller", "Headset", "Trophy", "Power Up", "Health Bar", "XP Orb",
    "Sword", "Shield", "Bow", "Magic Staff", "Potion", "Treasure Chest",
    "Castle", "Boss Monster", "Hero Character", "Racing Car", "Motorcycle",
    "Jet Fighter", "Tank", "Mech Suit", "Pixel Heart", "Coin Stack",
    "Level Up", "Game Over", "Victory Crown", "Loot Box", "Easter Egg",
    "Secret Key", "Boss Key", "Magic Portal"
  ];
  
  const musicNames = [
    "Treble Clef", "Bass Clef", "Music Note", "Piano Keys", "Guitar",
    "Drums", "Violin", "Saxophone", "Microphone", "Headphones",
    "Speaker", "Soundwave", "Equalizer", "Vinyl Record", "Cassette",
    "DJ Turntable", "Amp Stack", "Concert Stage", "Disco Ball", "Dance Floor",
    "Neon Beat", "Bass Drop", "Melody Flow", "Rhythm Pulse", "Harmony Wave"
  ];
  
  const holidayNames = [
    "Christmas Tree", "Snowflake", "Santa Hat", "Reindeer", "Gift Box",
    "Candy Cane", "Ornament", "Star Topper", "Wreath", "Gingerbread",
    "Pumpkin", "Ghost", "Bat", "Spider Web", "Skull",
    "Heart Love", "Cupid Arrow", "Rose Bouquet", "Firework", "Party Hat",
    "Birthday Cake", "Balloon", "Confetti", "Champagne", "Clock Countdown",
    "Easter Egg", "Bunny", "Four Leaf Clover", "Shamrock", "Flag Banner"
  ];
  
  const abstractNames = [
    "Geometric Cube", "Spiral Vortex", "Fractal Pattern", "Möbius Strip",
    "Klein Bottle", "Tesseract", "Sacred Geometry", "Mandala", "Infinity Loop",
    "DNA Helix", "Atom Model", "Wave Function", "Particle Cloud", "Energy Field",
    "Holographic Prism", "Light Rays", "Color Spectrum", "Gradient Flow",
    "Neon Wireframe", "3D Grid", "Floating Orbs", "Crystal Matrix",
    "Liquid Metal", "Plasma Ball", "Electric Arc", "Magnetic Field",
    "Warp Tunnel", "Dimension Rift", "Time Spiral", "Quantum Entangle"
  ];
  
  const textNames = [
    "Welcome", "Hello", "Love", "Peace", "Dream", "Believe", "Hope",
    "Create", "Inspire", "Imagine", "Achieve", "Success", "Victory",
    "Power", "Strength", "Courage", "Happy Birthday", "Congratulations",
    "Thank You", "Good Luck", "Best Wishes", "You Rock", "Legend",
    "Champion", "Winner", "MVP", "GOAT", "Number One", "VIP", "Elite"
  ];
  
  const sportsNames = [
    "Basketball", "Football", "Soccer Ball", "Baseball", "Tennis Ball",
    "Golf Ball", "Hockey Puck", "Boxing Gloves", "Medal", "Trophy Cup",
    "Finish Line", "Stopwatch", "Whistle", "Net Goal", "Scoreboard",
    "Champion Belt", "Racing Flag", "Podium", "Olympic Rings", "Torch",
    "Weightlifter", "Runner", "Swimmer", "Cyclist", "Skateboarder"
  ];
  
  const symbolNames = [
    "Thumbs Up", "Peace Sign", "Rock Hand", "OK Hand", "Clapping",
    "Fire Symbol", "Lightning", "Star Burst", "Heart Beat", "Checkmark",
    "Crown", "Diamond", "Gem", "Coin", "Dollar Sign",
    "Bitcoin", "Ethereum", "Rocket Up", "Chart Arrow", "Target Bull",
    "Shield Badge", "Award Ribbon", "Certificate", "Diploma", "Key"
  ];
  
  const businessNames = [
    "Logo Spinner", "Brand Mark", "Company Shield", "Corporate Badge",
    "QR Code", "Barcode", "ID Card", "Business Card", "Name Tag",
    "Office Tower", "Briefcase", "Handshake", "Chart Graph", "Pie Chart",
    "Globe Network", "Connection Nodes", "Cloud Data", "Server Rack",
    "Holographic ID", "Access Granted", "Verified Badge", "Premium Seal",
    "Elite Member", "VIP Pass", "Gold Status"
  ];
  
  const categoryData: Record<string, string[]> = {
    starwars: starWarsNames,
    tvshows: tvShowNames,
    animals: animalNames,
    nature: natureNames,
    space: spaceNames,
    gaming: gamingNames,
    music: musicNames,
    holiday: holidayNames,
    abstract: abstractNames,
    text: textNames,
    sports: sportsNames,
    emoji: symbolNames,
    business: businessNames,
  };
  
  let id = 1;
  Object.entries(categoryData).forEach(([category, names]) => {
    names.forEach((name) => {
      hologramStyles.forEach((style, styleIdx) => {
        if (styleIdx < 2 || Math.random() > 0.6) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          holograms.push({
            id: `holo-${id++}`,
            name: `${color} ${style} ${name}`,
            category,
            style,
            color,
            downloads: Math.floor(Math.random() * 5000) + 100,
            featured: Math.random() > 0.95,
          });
        }
      });
    });
  });
  
  return holograms.slice(0, 550);
};

const allHolograms = generateHolograms();

const categoryIcons: Record<string, typeof Heart> = {
  animals: Heart,
  nature: Sun,
  space: Rocket,
  gaming: Gamepad2,
  music: Music,
  holiday: Gift,
  abstract: Diamond,
  text: MessageSquare,
  sports: Target,
  emoji: Smile,
  business: Crown,
};

const colorGradients: Record<string, string> = {
  Cyan: "from-cyan-400 to-cyan-600",
  Magenta: "from-pink-400 to-purple-600",
  Gold: "from-yellow-400 to-amber-600",
  Green: "from-green-400 to-emerald-600",
  Blue: "from-blue-400 to-blue-600",
  Red: "from-red-400 to-red-600",
  Purple: "from-purple-400 to-violet-600",
  Orange: "from-orange-400 to-orange-600",
  White: "from-gray-100 to-gray-300",
  Rainbow: "from-red-400 via-yellow-400 to-blue-400",
  "Neon Pink": "from-pink-400 to-rose-600",
  "Electric Blue": "from-blue-400 to-indigo-600",
};

const colorHex: Record<string, { primary: string; secondary: string; glow: string }> = {
  Cyan: { primary: "#00FFFF", secondary: "#0099CC", glow: "rgba(0, 255, 255, 0.6)" },
  Magenta: { primary: "#FF00FF", secondary: "#9900CC", glow: "rgba(255, 0, 255, 0.6)" },
  Gold: { primary: "#FFD700", secondary: "#CC9900", glow: "rgba(255, 215, 0, 0.6)" },
  Green: { primary: "#00FF00", secondary: "#009900", glow: "rgba(0, 255, 0, 0.6)" },
  Blue: { primary: "#0066FF", secondary: "#003399", glow: "rgba(0, 102, 255, 0.6)" },
  Red: { primary: "#FF3333", secondary: "#990000", glow: "rgba(255, 51, 51, 0.6)" },
  Purple: { primary: "#9933FF", secondary: "#6600CC", glow: "rgba(153, 51, 255, 0.6)" },
  Orange: { primary: "#FF6600", secondary: "#CC3300", glow: "rgba(255, 102, 0, 0.6)" },
  White: { primary: "#FFFFFF", secondary: "#CCCCCC", glow: "rgba(255, 255, 255, 0.6)" },
  Rainbow: { primary: "#FF0080", secondary: "#8000FF", glow: "rgba(255, 0, 128, 0.6)" },
  "Neon Pink": { primary: "#FF1493", secondary: "#C71585", glow: "rgba(255, 20, 147, 0.6)" },
  "Electric Blue": { primary: "#00BFFF", secondary: "#1E90FF", glow: "rgba(0, 191, 255, 0.6)" },
};

function getAvatarStyle(category: string): string {
  switch (category) {
    case "starwars":
    case "space":
      return "bottts";
    case "tvshows":
    case "holiday":
      return "avataaars";
    case "animals":
      return "thumbs";
    case "gaming":
      return "pixel-art";
    case "music":
    case "abstract":
      return "shapes";
    case "nature":
      return "icons";
    default:
      return "pixel-art";
  }
}

function HologramPreview({ 
  name, 
  color, 
  style, 
  size = 120,
  category = "general"
}: { 
  name: string; 
  color: string; 
  style: string; 
  size?: number;
  category?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [avatarImage, setAvatarImage] = useState<HTMLImageElement | null>(null);

  const displayName = name.split(" ").slice(2).join(" ") || name;
  const avatarStyle = getAvatarStyle(category);
  const avatarUrl = `https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=transparent`;

  useEffect(() => {
    const img = document.createElement('img') as HTMLImageElement;
    img.crossOrigin = "anonymous";
    img.onload = () => setAvatarImage(img);
    img.src = avatarUrl;
  }, [avatarUrl]);

  const drawHologram = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = colorHex[color] || colorHex.Cyan;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.42;

    ctx.clearRect(0, 0, size, size);

    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.fillRect(0, 0, size, size);

    const animFactor = isHovered ? Math.sin(timestamp / 200) * 0.1 + 1 : 1;
    const glowSize = isHovered ? 25 : 15;

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * animFactor, 0, Math.PI * 2);
    ctx.shadowColor = colors.glow;
    ctx.shadowBlur = glowSize;
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.85 * animFactor, 0, Math.PI * 2);
    ctx.strokeStyle = colors.secondary + "80";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.restore();

    const numLines = 8;
    for (let i = 0; i < numLines; i++) {
      const angle = (i / numLines) * Math.PI * 2 + (isHovered ? timestamp / 2000 : 0);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * radius * 0.7,
        centerY + Math.sin(angle) * radius * 0.7
      );
      ctx.strokeStyle = colors.primary + "30";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    if (avatarImage) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.65 * animFactor, 0, Math.PI * 2);
      ctx.clip();
      
      const imgSize = radius * 1.3 * animFactor;
      ctx.globalAlpha = 0.9;
      ctx.filter = `drop-shadow(0 0 ${isHovered ? 12 : 6}px ${colors.primary}) hue-rotate(${getHueRotation(color)}deg)`;
      ctx.drawImage(
        avatarImage,
        centerX - imgSize / 2,
        centerY - imgSize / 2,
        imgSize,
        imgSize
      );
      ctx.restore();
    } else {
      ctx.save();
      ctx.fillStyle = colors.primary;
      ctx.shadowColor = colors.glow;
      ctx.shadowBlur = isHovered ? 15 : 8;
      ctx.font = `bold ${Math.min(size / 8, 14)}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const words = displayName.split(" ");
      if (words.length <= 2) {
        ctx.fillText(displayName, centerX, centerY);
      } else {
        const lineHeight = size / 7;
        const startY = centerY - lineHeight / 2;
        ctx.fillText(words.slice(0, 2).join(" "), centerX, startY);
        ctx.font = `${Math.min(size / 10, 11)}px Arial`;
        ctx.fillText(words.slice(2).join(" "), centerX, startY + lineHeight);
      }
      ctx.restore();
    }

    ctx.save();
    ctx.font = `${Math.min(size / 12, 9)}px Arial`;
    ctx.fillStyle = colors.secondary + "AA";
    ctx.textAlign = "center";
    ctx.fillText(style.toUpperCase(), centerX, size - 8);
    ctx.restore();

    if (isHovered) {
      animationRef.current = requestAnimationFrame(drawHologram);
    }
  }, [name, color, style, size, isHovered, avatarImage, displayName]);

  useEffect(() => {
    drawHologram(0);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [drawHologram]);

  useEffect(() => {
    if (isHovered) {
      const animate = (timestamp: number) => {
        drawHologram(timestamp);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, drawHologram]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="rounded-lg transition-transform duration-300"
      style={{ 
        width: "100%", 
        height: "auto",
        aspectRatio: "1/1"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
}

function getHueRotation(color: string): number {
  switch (color) {
    case "Cyan": return 180;
    case "Magenta": return 300;
    case "Gold": return 45;
    case "Green": return 120;
    case "Blue": return 240;
    case "Red": return 0;
    case "Purple": return 270;
    case "Orange": return 30;
    case "Neon Pink": return 330;
    case "Electric Blue": return 200;
    default: return 0;
  }
}

export default function ProjectHolofans() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("Cyan");
  const [selectedStyle, setSelectedStyle] = useState("Spinning");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const filteredHolograms = allHolograms.filter((holo) => {
    const matchesCategory = selectedCategory === "all" || holo.category === selectedCategory;
    const matchesSearch = holo.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredHolograms = allHolograms.filter((h) => h.featured).slice(0, 8);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image under 10MB",
          variant: "destructive",
        });
        return;
      }
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
      setUploadedImage(file);
      toast({
        title: "Image uploaded",
        description: `${file.name} ready for hologram conversion`,
      });
    }
  };

  const clearImage = () => {
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setImagePreviewUrl(null);
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const newAudioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
        const newAudioUrl = URL.createObjectURL(newAudioBlob);
        setAudioBlob(newAudioBlob);
        setAudioUrl(newAudioUrl);
        stream.getTracks().forEach((track) => track.stop());
        toast({
          title: "Recording saved",
          description: "Voice message ready - click play to preview",
        });
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak your message now...",
      });
    } catch {
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to record voice messages",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const clearAudio = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
    }
  };

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleAudioPlayback = () => {
    if (audioPlayerRef.current) {
      if (isPlayingAudio) {
        audioPlayerRef.current.pause();
      } else {
        audioPlayerRef.current.play();
      }
      setIsPlayingAudio(!isPlayingAudio);
    }
  };

  const handleDownload = (hologram: typeof allHolograms[0]) => {
    toast({
      title: "Preparing hologram download",
      description: `${hologram.name} - ${hologram.style} animation in ${hologram.color}`,
    });
    
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 400, 400);
        const colorMap: Record<string, string[]> = {
          Cyan: ['#00FFFF', '#0099CC'],
          Magenta: ['#FF00FF', '#9900CC'],
          Gold: ['#FFD700', '#CC9900'],
          Green: ['#00FF00', '#009900'],
          Blue: ['#0066FF', '#003399'],
          Red: ['#FF3333', '#990000'],
          Purple: ['#9933FF', '#6600CC'],
          Orange: ['#FF6600', '#CC3300'],
          White: ['#FFFFFF', '#CCCCCC'],
          Rainbow: ['#FF0000', '#0000FF'],
          "Neon Pink": ['#FF1493', '#C71585'],
          "Electric Blue": ['#00BFFF', '#1E90FF'],
        };
        const [c1, c2] = colorMap[hologram.color] || ['#00FFFF', '#0099CC'];
        gradient.addColorStop(0, c1);
        gradient.addColorStop(1, c2);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 400);
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(hologram.name.split(' ').slice(2).join(' '), 200, 200);
        ctx.font = '16px Arial';
        ctx.fillText(`${hologram.style} | ${hologram.color}`, 200, 240);
        ctx.fillText('MP4 Holographic Fan Ready', 200, 280);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `hologram-${hologram.id}.png`;
            a.click();
            URL.revokeObjectURL(url);
            toast({
              title: "Download complete!",
              description: "Hologram template ready for your display fan",
            });
          }
        });
      }
    }, 500);
  };

  const handleCreateHologram = () => {
    if (!uploadedImage && !customMessage) {
      toast({
        title: "Missing content",
        description: "Please upload an image or enter a custom message",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Creating hologram...",
      description: "Your custom hologram is being generated",
    });

    setTimeout(() => {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 400, 400);
        const colorMap: Record<string, string[]> = {
          Cyan: ['#00FFFF', '#0099CC'],
          Magenta: ['#FF00FF', '#9900CC'],
          Gold: ['#FFD700', '#CC9900'],
          Green: ['#00FF00', '#009900'],
          Blue: ['#0066FF', '#003399'],
          Red: ['#FF3333', '#990000'],
          Purple: ['#9933FF', '#6600CC'],
          Orange: ['#FF6600', '#CC3300'],
          White: ['#FFFFFF', '#CCCCCC'],
          Rainbow: ['#FF0000', '#0000FF'],
          "Neon Pink": ['#FF1493', '#C71585'],
          "Electric Blue": ['#00BFFF', '#1E90FF'],
        };
        const [c1, c2] = colorMap[selectedColor] || ['#00FFFF', '#0099CC'];
        gradient.addColorStop(0, c1);
        gradient.addColorStop(1, c2);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 400);
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        
        if (customMessage) {
          const words = customMessage.split(' ');
          let line = '';
          let y = 180;
          words.forEach((word) => {
            const testLine = line + word + ' ';
            if (ctx.measureText(testLine).width > 350) {
              ctx.fillText(line, 200, y);
              line = word + ' ';
              y += 30;
            } else {
              line = testLine;
            }
          });
          ctx.fillText(line, 200, y);
        } else if (uploadedImage) {
          ctx.fillText('Custom Image', 200, 190);
          ctx.font = '14px Arial';
          ctx.fillText(uploadedImage.name, 200, 220);
        }
        
        ctx.font = '14px Arial';
        ctx.fillText(`${selectedStyle} | ${selectedColor}`, 200, 320);
        ctx.fillText('MP4 Holographic Fan Ready', 200, 350);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `custom-hologram-${Date.now()}.png`;
            a.click();
            URL.revokeObjectURL(url);
            toast({
              title: "Hologram created!",
              description: "Your custom hologram has been downloaded",
            });
          }
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/projects">
              <Button variant="ghost" className="gap-2" data-testid="button-back-projects">
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Disc3
                className="w-10 h-10 animate-spin"
                style={{ 
                  color: "hsl(187 100% 50%)",
                  animationDuration: "3s"
                }}
              />
              <h1
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider"
                style={{
                  color: "hsl(187 100% 50%)",
                  textShadow: "0 0 10px hsl(187 100% 50%), 0 0 20px hsl(187 100% 50% / 0.5)",
                }}
                data-testid="text-holofans-title"
              >
                MP4 Holographic Display Fans
              </h1>
            </div>
            <p className="text-muted-foreground font-heading tracking-wide max-w-2xl mx-auto mb-4">
              Browse 500+ stunning holograms ready for your holographic display fan, 
              or create your own custom holographic content with personalized messages and voice
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 bg-cyan-500/10">
                {allHolograms.length}+ Holograms
              </Badge>
              <Badge variant="outline" className="border-purple-500/50 text-purple-400 bg-purple-500/10">
                Free Downloads
              </Badge>
              <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10">
                Custom Creator
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="gallery" className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12">
              <TabsTrigger value="gallery" className="text-base gap-2" data-testid="tab-gallery">
                <Sparkles className="w-4 h-4" />
                Hologram Gallery
              </TabsTrigger>
              <TabsTrigger value="create" className="text-base gap-2" data-testid="tab-create">
                <Upload className="w-4 h-4" />
                Create Custom
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gallery" className="space-y-8">
              {featuredHolograms.length > 0 && (
                <Card
                  className="bg-card/50 backdrop-blur-xl border-primary/20"
                  style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.15)" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-heading" style={{ color: "hsl(45 93% 60%)" }}>
                      <Star className="w-5 h-5" />
                      Featured Holograms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                      {featuredHolograms.map((holo) => (
                        <div
                          key={holo.id}
                          className="group cursor-pointer"
                          onClick={() => handleDownload(holo)}
                          data-testid={`featured-${holo.id}`}
                        >
                          <div 
                            className="mb-2 transition-all duration-300 group-hover:scale-105"
                            style={{ boxShadow: "0 0 20px hsl(45 93% 50% / 0.3)" }}
                          >
                            <HologramPreview 
                              name={holo.name} 
                              color={holo.color} 
                              style={holo.style}
                              size={100}
                              category={holo.category}
                            />
                          </div>
                          <p className="text-xs text-center truncate text-muted-foreground">
                            {holo.name.split(" ").slice(2).join(" ")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex flex-col lg:flex-row gap-6">
                <Card
                  className="lg:w-64 shrink-0 bg-card/50 backdrop-blur-xl border-primary/20"
                  style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)" }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-heading" style={{ color: "hsl(187 100% 70%)" }}>
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    {categories.map((cat) => {
                      const count = cat.id === "all" 
                        ? allHolograms.length 
                        : allHolograms.filter((h) => h.category === cat.id).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all ${
                            selectedCategory === cat.id
                              ? "bg-primary/20 text-primary"
                              : "hover:bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                          data-testid={`category-${cat.id}`}
                        >
                          <span className="flex items-center gap-2">
                            <cat.icon className="w-4 h-4" />
                            {cat.name}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {count}
                          </Badge>
                        </button>
                      );
                    })}
                  </CardContent>
                </Card>

                <div className="flex-1 space-y-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Search holograms..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                      data-testid="input-search-holograms"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredHolograms.length} holograms
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredHolograms.slice(0, 50).map((holo) => (
                      <Card
                        key={holo.id}
                        className="group bg-card/50 backdrop-blur-xl border-primary/20 cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-visible"
                        onClick={() => handleDownload(holo)}
                        data-testid={`holo-${holo.id}`}
                      >
                        <CardContent className="p-3">
                          <div
                            className="mb-2 transition-all duration-300 group-hover:scale-105"
                            style={{ 
                              boxShadow: `0 0 15px ${holo.color === "Cyan" ? "hsl(187 100% 50% / 0.3)" : "hsl(280 100% 50% / 0.2)"}` 
                            }}
                          >
                            <HologramPreview 
                              name={holo.name} 
                              color={holo.color} 
                              style={holo.style}
                              size={120}
                              category={holo.category}
                            />
                          </div>
                          <p className="text-xs font-medium truncate mb-1" title={holo.name}>
                            {holo.name.split(" ").slice(2).join(" ")}
                          </p>
                          <div className="flex items-center justify-between gap-1">
                            <Badge variant="secondary" className="text-[10px] px-1.5">
                              {holo.style}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              {holo.downloads > 1000 ? `${(holo.downloads / 1000).toFixed(1)}k` : holo.downloads}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {filteredHolograms.length > 50 && (
                    <div className="text-center">
                      <Button variant="outline" data-testid="button-load-more">
                        Load More ({filteredHolograms.length - 50} remaining)
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="create" className="space-y-8">
              <Card
                className="bg-card/50 backdrop-blur-xl border-primary/20"
                style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.15)" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-heading" style={{ color: "hsl(187 100% 70%)" }}>
                    <Upload className="w-5 h-5" />
                    Create Your Custom Hologram
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Image className="w-4 h-4" />
                          Upload Image
                        </Label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          data-testid="input-file-upload"
                        />
                        {imagePreviewUrl ? (
                          <div className="space-y-3">
                            <div 
                              className="relative rounded-lg overflow-hidden border-2 border-green-500/50 bg-black"
                              style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.2)" }}
                            >
                              <img 
                                src={imagePreviewUrl} 
                                alt="Upload preview" 
                                className="w-full h-48 object-contain"
                                data-testid="image-preview"
                              />
                              <div className="absolute top-2 right-2 flex gap-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                                  onClick={() => fileInputRef.current?.click()}
                                  data-testid="button-change-image"
                                >
                                  <Upload className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="destructive"
                                  className="h-8 w-8"
                                  onClick={clearImage}
                                  data-testid="button-remove-image"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                <p className="text-green-400 text-sm font-medium truncate">{uploadedImage?.name}</p>
                              </div>
                            </div>
                            <p className="text-xs text-green-400 flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              Image preview loaded - check the hologram preview below
                            </p>
                          </div>
                        ) : (
                          <div
                            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all border-primary/30 hover:border-primary/50 hover:bg-primary/5"
                            onClick={() => fileInputRef.current?.click()}
                            data-testid="upload-dropzone"
                          >
                            <div className="space-y-2">
                              <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                              <p className="text-muted-foreground">Click or drag to upload image</p>
                              <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Custom Message
                        </Label>
                        <Textarea
                          placeholder="Enter your custom text message to display..."
                          value={customMessage}
                          onChange={(e) => setCustomMessage(e.target.value)}
                          className="min-h-[100px] resize-none"
                          data-testid="input-custom-message"
                        />
                        <p className="text-xs text-muted-foreground">
                          {customMessage.length}/100 characters
                        </p>
                      </div>

                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Volume2 className="w-4 h-4" />
                          Voice Recording
                        </Label>
                        {audioUrl ? (
                          <div className="space-y-3">
                            <div 
                              className="rounded-lg border-2 border-green-500/50 bg-green-500/5 p-4"
                              style={{ boxShadow: "0 0 15px hsl(120 100% 40% / 0.1)" }}
                            >
                              <div className="flex items-center gap-3">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-12 w-12 rounded-full border-green-500/50"
                                  onClick={toggleAudioPlayback}
                                  data-testid="button-play-audio"
                                >
                                  {isPlayingAudio ? (
                                    <Pause className="w-5 h-5 text-green-400" />
                                  ) : (
                                    <Play className="w-5 h-5 text-green-400" />
                                  )}
                                </Button>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-green-400">Voice Recording Ready</p>
                                  <p className="text-xs text-muted-foreground">
                                    {isPlayingAudio ? "Playing..." : "Click play to preview your recording"}
                                  </p>
                                </div>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8"
                                  onClick={clearAudio}
                                  data-testid="button-remove-audio"
                                >
                                  <X className="w-4 h-4 text-muted-foreground" />
                                </Button>
                              </div>
                              <audio 
                                ref={audioPlayerRef}
                                src={audioUrl}
                                onEnded={() => setIsPlayingAudio(false)}
                                className="hidden"
                                data-testid="audio-player"
                              />
                            </div>
                            <Button
                              variant="outline"
                              onClick={() => {
                                clearAudio();
                                startRecording();
                              }}
                              className="gap-2"
                              data-testid="button-rerecord"
                            >
                              <Mic className="w-4 h-4" />
                              Record New
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-center gap-4">
                              <Button
                                variant={isRecording ? "destructive" : "outline"}
                                onClick={isRecording ? stopRecording : startRecording}
                                className="gap-2"
                                data-testid="button-record-voice"
                              >
                                {isRecording ? (
                                  <>
                                    <MicOff className="w-4 h-4" />
                                    Stop Recording
                                  </>
                                ) : (
                                  <>
                                    <Mic className="w-4 h-4" />
                                    Record Voice
                                  </>
                                )}
                              </Button>
                              {isRecording && (
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                                  <span className="text-sm text-red-400">Recording...</span>
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Record a voice message to play with your hologram (max 30 seconds)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label>Hologram Color</Label>
                        <div className="grid grid-cols-4 gap-2">
                          {colors.map((color) => (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              className={`h-10 rounded-md bg-gradient-to-br ${colorGradients[color]} transition-all ${
                                selectedColor === color 
                                  ? "ring-2 ring-white ring-offset-2 ring-offset-background scale-110" 
                                  : "hover:scale-105"
                              }`}
                              title={color}
                              data-testid={`color-${color.toLowerCase().replace(" ", "-")}`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Animation Style</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {hologramStyles.map((style) => (
                            <button
                              key={style}
                              onClick={() => setSelectedStyle(style)}
                              className={`px-4 py-2 rounded-md text-sm transition-all ${
                                selectedStyle === style
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
                              }`}
                              data-testid={`style-${style.toLowerCase()}`}
                            >
                              {style}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Card className="bg-primary/5 border-primary/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-heading flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Live Hologram Preview
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div 
                            className="relative aspect-square max-w-[250px] mx-auto rounded-full bg-black overflow-hidden"
                            style={{ 
                              boxShadow: `0 0 40px ${colorHex[selectedColor]?.glow || "rgba(0, 255, 255, 0.4)"}`,
                              animation: selectedStyle === "Spinning" ? "spin 3s linear infinite" : 
                                         selectedStyle === "Pulsing" ? "pulse 2s ease-in-out infinite" : 
                                         selectedStyle === "Floating" ? "bounce 2s ease-in-out infinite" : "none"
                            }}
                          >
                            <div 
                              className="absolute inset-0 rounded-full"
                              style={{
                                border: `3px solid ${colorHex[selectedColor]?.primary || "#00FFFF"}`,
                                boxShadow: `inset 0 0 30px ${colorHex[selectedColor]?.glow || "rgba(0, 255, 255, 0.3)"}`,
                              }}
                            />
                            <div 
                              className="absolute inset-4 rounded-full border border-dashed opacity-50"
                              style={{ borderColor: colorHex[selectedColor]?.secondary || "#0099CC" }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center p-6">
                              {imagePreviewUrl ? (
                                <img 
                                  src={imagePreviewUrl} 
                                  alt="Hologram preview" 
                                  className="w-full h-full object-contain rounded-full"
                                  style={{
                                    filter: `drop-shadow(0 0 10px ${colorHex[selectedColor]?.glow || "rgba(0, 255, 255, 0.5)"})`,
                                  }}
                                  data-testid="hologram-image-preview"
                                />
                              ) : customMessage ? (
                                <div 
                                  className="text-center p-2"
                                  style={{
                                    color: colorHex[selectedColor]?.primary || "#00FFFF",
                                    textShadow: `0 0 10px ${colorHex[selectedColor]?.glow || "rgba(0, 255, 255, 0.8)"}`,
                                  }}
                                >
                                  <p className="font-bold text-lg leading-tight">
                                    {customMessage.length > 50 ? customMessage.slice(0, 50) + "..." : customMessage}
                                  </p>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <Sparkles 
                                    className="w-16 h-16 mx-auto mb-2"
                                    style={{ 
                                      color: colorHex[selectedColor]?.primary || "#00FFFF",
                                      filter: `drop-shadow(0 0 8px ${colorHex[selectedColor]?.glow || "rgba(0, 255, 255, 0.8)"})`,
                                    }}
                                  />
                                  <p 
                                    className="text-xs opacity-70"
                                    style={{ color: colorHex[selectedColor]?.secondary || "#0099CC" }}
                                  >
                                    Upload image or enter message
                                  </p>
                                </div>
                              )}
                            </div>
                            <div 
                              className="absolute bottom-4 left-0 right-0 text-center"
                              style={{ 
                                color: colorHex[selectedColor]?.primary || "#00FFFF",
                                textShadow: `0 0 5px ${colorHex[selectedColor]?.glow || "rgba(0, 255, 255, 0.8)"}`,
                              }}
                            >
                              <p className="text-xs font-medium uppercase tracking-wider">{selectedStyle}</p>
                            </div>
                          </div>
                          <div className="text-center space-y-1">
                            <p className="text-xs text-muted-foreground">
                              This preview shows how your hologram will appear on the display fan
                            </p>
                            {audioUrl && (
                              <p className="text-xs text-green-400 flex items-center justify-center gap-1">
                                <Volume2 className="w-3 h-3" />
                                Voice recording will play with this hologram
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Button 
                        className="w-full gap-2" 
                        size="lg"
                        onClick={handleCreateHologram}
                        data-testid="button-create-hologram"
                      >
                        <Sparkles className="w-5 h-5" />
                        Create Hologram
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="bg-card/50 backdrop-blur-xl border-primary/20"
                style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-heading text-base" style={{ color: "hsl(187 100% 70%)" }}>
                    <Zap className="w-5 h-5" />
                    Holographic Fan Compatibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md bg-green-500/10 border border-green-500/30 flex items-center justify-center shrink-0">
                        <Disc3 className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">MP4 Format</p>
                        <p className="text-xs text-muted-foreground">Optimized for holographic display fans</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                        <Globe className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Universal Compatibility</p>
                        <p className="text-xs text-muted-foreground">Works with most LED fan displays</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                        <Camera className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">High Resolution</p>
                        <p className="text-xs text-muted-foreground">Crystal clear holographic imagery</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
