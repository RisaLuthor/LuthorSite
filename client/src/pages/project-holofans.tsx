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
  Play, Pause, X, Eye, ExternalLink, Sword, Pickaxe
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

import darthVaderImg from "@assets/generated_images/realistic_darth_vader_hologram.png";
import yodaImg from "@assets/generated_images/realistic_yoda_hologram.png";
import babyYodaImg from "@assets/generated_images/realistic_baby_yoda_hologram.png";
import stormtrooperImg from "@assets/generated_images/realistic_stormtrooper_hologram.png";
import mandalorianImg from "@assets/generated_images/realistic_mandalorian_hologram.png";
import r2d2Img from "@assets/generated_images/realistic_r2d2_hologram.png";
import bobaFettImg from "@assets/generated_images/realistic_boba_fett_hologram.png";
import leiaImg from "@assets/generated_images/realistic_princess_leia_hologram.png";
import lukeImg from "@assets/generated_images/realistic_luke_skywalker_hologram.png";
import chewbaccaImg from "@assets/generated_images/realistic_chewbacca_hologram.png";
import c3poImg from "@assets/generated_images/realistic_c3po_hologram.png";
import hanSoloImg from "@assets/generated_images/realistic_han_solo_hologram.png";

const featuredCharacterImages: Record<string, string> = {
  "Darth Vader": darthVaderImg,
  "Yoda": yodaImg,
  "Baby Yoda Grogu": babyYodaImg,
  "Stormtrooper": stormtrooperImg,
  "Mandalorian": mandalorianImg,
  "R2-D2": r2d2Img,
  "Boba Fett": bobaFettImg,
  "Princess Leia": leiaImg,
  "Luke Skywalker": lukeImg,
  "Chewbacca": chewbaccaImg,
  "C-3PO": c3poImg,
  "Han Solo": hanSoloImg,
};

const hologramStyles = [
  "Spinning", "Pulsing", "Floating", "Morphing", "Glowing", 
  "Rotating", "Bouncing", "Fading", "Zooming", "Waving"
];

const colors = [
  "Cyan", "Magenta", "Gold", "Green", "Blue", "Red", 
  "Purple", "Orange", "White", "Rainbow", "Neon Pink", "Electric Blue"
];

const featuredStarWarsHolograms = [
  { id: "sw-1", name: "Darth Vader", image: darthVaderImg, style: "Spinning", color: "Red" },
  { id: "sw-2", name: "Yoda", image: yodaImg, style: "Floating", color: "Green" },
  { id: "sw-3", name: "Baby Yoda Grogu", image: babyYodaImg, style: "Pulsing", color: "Cyan" },
  { id: "sw-4", name: "Stormtrooper", image: stormtrooperImg, style: "Spinning", color: "White" },
  { id: "sw-5", name: "Mandalorian", image: mandalorianImg, style: "Glowing", color: "Blue" },
  { id: "sw-6", name: "R2-D2", image: r2d2Img, style: "Rotating", color: "Blue" },
  { id: "sw-7", name: "Boba Fett", image: bobaFettImg, style: "Pulsing", color: "Green" },
  { id: "sw-8", name: "Princess Leia", image: leiaImg, style: "Floating", color: "White" },
  { id: "sw-9", name: "Luke Skywalker", image: lukeImg, style: "Glowing", color: "Blue" },
  { id: "sw-10", name: "Chewbacca", image: chewbaccaImg, style: "Spinning", color: "Gold" },
  { id: "sw-11", name: "C-3PO", image: c3poImg, style: "Rotating", color: "Gold" },
  { id: "sw-12", name: "Han Solo", image: hanSoloImg, style: "Floating", color: "Cyan" },
];

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

function getAvatarStyle(category: string, name: string): string {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes("darth") || lowerName.includes("vader") || lowerName.includes("stormtrooper") || 
      lowerName.includes("r2-d2") || lowerName.includes("c-3po") || lowerName.includes("droid") ||
      lowerName.includes("robot") || lowerName.includes("mech") || lowerName.includes("cyborg")) {
    return "bottts";
  }
  
  if (lowerName.includes("yoda") || lowerName.includes("grogu") || lowerName.includes("baby") ||
      lowerName.includes("ewok") || lowerName.includes("chewbacca") || lowerName.includes("wookiee")) {
    return "fun-emoji";
  }
  
  switch (category) {
    case "starwars":
    case "tvshows":
      return "adventurer";
    case "space":
      return "bottts";
    case "animals":
      return "fun-emoji";
    case "gaming":
      return "adventurer";
    case "music":
    case "abstract":
      return "shapes";
    case "nature":
      return "fun-emoji";
    case "holiday":
      return "fun-emoji";
    case "emoji":
      return "fun-emoji";
    default:
      return "adventurer";
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
  const featuredImage = featuredCharacterImages[displayName];
  const avatarStyle = getAvatarStyle(category, displayName);
  const avatarUrl = featuredImage || `https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=transparent`;

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

  const filteredHolograms = featuredStarWarsHolograms.filter((holo) => 
    holo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleDownload = (hologram: typeof featuredStarWarsHolograms[0]) => {
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
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 bg-cyan-500/10">
                250+ Holograms
              </Badge>
              <Badge variant="outline" className="border-purple-500/50 text-purple-400 bg-purple-500/10">
                Free Downloads
              </Badge>
              <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10">
                Custom Creator
              </Badge>
            </div>
          </div>

          <Card 
            className="mb-8 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 border-2 border-purple-500/40 overflow-hidden"
            style={{ boxShadow: "0 0 40px hsl(280 100% 50% / 0.2)" }}
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shrink-0"
                    style={{ boxShadow: "0 0 20px hsl(280 100% 50% / 0.4)" }}
                  >
                    <Disc3 className="w-10 h-10 text-white animate-spin" style={{ animationDuration: "4s" }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-bold text-white mb-1">
                      PixelArc Community Archive
                    </h2>
                    <p className="text-sm text-purple-200/80 max-w-lg">
                      Access 250+ premium hologram .BIN files ready for your Atom or Luxa display. 
                      Star Wars, Batman, Arcane, Minecraft, Warhammer and more!
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/40">
                      <Star className="w-3 h-3 mr-1" />
                      Star Wars (203)
                    </Badge>
                    <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/40">
                      Batman (10)
                    </Badge>
                    <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/40">
                      Arcane (14)
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/40">
                      <Pickaxe className="w-3 h-3 mr-1" />
                      Minecraft (16)
                    </Badge>
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/40">
                      <Sword className="w-3 h-3 mr-1" />
                      Warhammer (16)
                    </Badge>
                  </div>
                  <Link href="/projects/holofans/archive">
                    <Button 
                      size="lg"
                      className="gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white border-0 shrink-0"
                      data-testid="button-pixelarc-archive"
                    >
                      <Download className="w-4 h-4" />
                      Browse Archive
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-purple-500/30 flex flex-wrap items-center justify-center gap-6 text-xs text-purple-200/70">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span><strong>Atom:</strong> Small Display Files</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span><strong>Luxa:</strong> Large Display Files</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-3 h-3" />
                  <span>Drag & drop .BIN files to SD card</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  <span>Max 50 files per display</span>
                </div>
              </div>
            </CardContent>
          </Card>

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
              <Card
                className="bg-card/50 backdrop-blur-xl border-primary/20"
                style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.15)" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-heading" style={{ color: "hsl(45 93% 60%)" }}>
                    <Star className="w-5 h-5" />
                    Featured Star Wars Holograms
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    Click on any character to download. For 250+ more holograms, visit the{" "}
                    <Link href="/projects/holofans/archive" className="text-purple-400 hover:underline">
                      PixelArc Community Archive
                    </Link>
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Search characters..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 max-w-md"
                      data-testid="input-search-holograms"
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {filteredHolograms.map((holo) => (
                      <Card
                        key={holo.id}
                        className="group bg-card/50 backdrop-blur-xl border-yellow-500/30 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500/60 overflow-hidden"
                        onClick={() => handleDownload(holo)}
                        data-testid={`holo-${holo.id}`}
                      >
                        <CardContent className="p-4">
                          <div 
                            className="aspect-square rounded-full overflow-hidden mb-3 transition-all duration-300 group-hover:scale-105"
                            style={{ 
                              boxShadow: `0 0 25px ${colorHex[holo.color]?.glow || "rgba(255, 215, 0, 0.4)"}`,
                            }}
                          >
                            <img 
                              src={holo.image} 
                              alt={holo.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-sm font-medium text-center truncate mb-1" title={holo.name}>
                            {holo.name}
                          </p>
                          <div className="flex items-center justify-center gap-2">
                            <Badge 
                              variant="secondary" 
                              className="text-[10px] px-1.5"
                              style={{ backgroundColor: `${colorHex[holo.color]?.primary}20`, color: colorHex[holo.color]?.primary }}
                            >
                              {holo.style}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Download className="w-3 h-3 text-yellow-400" />
                            <span className="text-xs text-yellow-400">Click to download</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {filteredHolograms.length === 0 && (
                    <div className="text-center py-12">
                      <Star className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No characters found matching "{searchQuery}"</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card 
                className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-purple-500/40"
                style={{ boxShadow: "0 0 30px hsl(280 100% 50% / 0.15)" }}
              >
                <CardContent className="p-6 text-center">
                  <Disc3 className="w-12 h-12 mx-auto text-purple-400 animate-spin mb-4" style={{ animationDuration: "4s" }} />
                  <h3 className="text-xl font-heading font-bold text-white mb-2">
                    Want More Holograms?
                  </h3>
                  <p className="text-sm text-purple-200/80 max-w-lg mx-auto mb-4">
                    Access the full PixelArc Community Archive with 250+ premium hologram .BIN files - 
                    Star Wars, Batman, Arcane, Minecraft, Warhammer, and more!
                  </p>
                  <Link href="/projects/holofans/archive">
                    <Button 
                      size="lg"
                      className="gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white"
                      data-testid="button-browse-full-archive"
                    >
                      <Download className="w-4 h-4" />
                      Browse Full Archive
                    </Button>
                  </Link>
                </CardContent>
              </Card>
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
