import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { 
  ArrowLeft, Download, Search, Disc3, Star, ChevronDown,
  Sword, Pickaxe, Volume2, Zap, HelpCircle, HardDrive
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

type HologramFile = {
  id: string;
  name: string;
  category: "starwars" | "batman" | "arcane" | "minecraft" | "warhammer" | "sound";
  display: "atom" | "luxa";
  downloadUrl: string;
  hasSound?: boolean;
};

const hologramFiles: HologramFile[] = [
  // Star Wars - Atom (A_SW)
  { id: "A_SW125", name: "A_SW125", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/9rg69z5hjr3i0lp8rp80l/A_SW125.bin?rlkey=nt5er8c0dbaab0w6rqejgizam&dl=1" },
  { id: "A_SW124", name: "A_SW124", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/na520z85dvta1gjzxyk7b/A_SW124.bin?rlkey=baaq4hzt5jqk0rx5ahk1glz5z&dl=1" },
  { id: "A_SW123", name: "A_SW123", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/l39848cs6bnqqbm4qgxx1/A_SW123.bin?rlkey=jsblgbe6j33tay73moq88yuq1&dl=1" },
  { id: "A_SW122", name: "A_SW122", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/lpe2c0tekudn24caxnkyp/A_SW122.bin?rlkey=l81lh1zelupqhswh5mr9mfrht&dl=1" },
  { id: "A_SW121", name: "A_SW121", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/kfr6pda2wr4re7qjj0ezb/A_SW121.bin?rlkey=2gnz3d2ynlzb8rqmwgezechuc&dl=1" },
  { id: "A_SW120", name: "A_SW120", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/n2e70pkrhojtk0ncsm4rh/A_SW120.bin?rlkey=vgxaxnla9gx7u1c8v7rm8a39t&dl=1" },
  { id: "A_SW119", name: "A_SW119", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/jzt65f0cdw8h3r18t08vs/A_SW119.bin?rlkey=1qwda7a4xlwgh24kggehaupwr&dl=1" },
  { id: "A_SW118", name: "A_SW118", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/9zm6udlbs5g8vcm8obqgx/A_SW118.bin?rlkey=8he4n7en36ywgl3i8xy80rpov&dl=1" },
  { id: "A_SW117", name: "A_SW117", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/zkkwhqwq6l5uq32js1fsv/A_SW117.bin?rlkey=l7ds2yuhzj3nhubbsaz02kh6d&dl=1" },
  { id: "A_SW116", name: "A_SW116", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/f1xa9x7wbg6qbdb5abvyj/A_SW116.bin?rlkey=vqpbwpfgaj46usrrq5i4bovo1&dl=1" },
  { id: "A_SW115", name: "A_SW115", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/xpa1yttbpydkn2k5p97t3/A_SW115.bin?rlkey=bzek3apfiuwjtqt1ys2qwava0&dl=1" },
  { id: "A_SW114", name: "A_SW114", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/3kg8xzsrut9mgb93ixjph/A_SW114.bin?rlkey=ozthshr06kp37rvfpsc4ml51v&dl=1" },
  { id: "A_SW113", name: "A_SW113", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/b5iihdp9uiiq64ijce28f/A_SW113.bin?rlkey=a8r5vmc7t6fqa3tlytta2yeay&dl=1" },
  { id: "A_SW112", name: "A_SW112", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/goh0hxubchg54iye1ykbi/A_SW112.bin?rlkey=o3yt8iz7dojbwoey6yh2lglwa&dl=1" },
  { id: "A_SW111", name: "A_SW111", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/gptw1u842t5nllckc8rce/A_SW111.bin?rlkey=ms9niecetqc7r9lz5t2ypro12&dl=1" },
  { id: "A_SW110", name: "A_SW110", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/awlq5508u0qvehnxh4oh2/A_SW110.bin?rlkey=a6l5uwlx3t2rpn05nnlzzu77w&dl=1" },
  { id: "A_SW109", name: "A_SW109", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/5pa15n0i23lf140g7oxrn/A_SW109.bin?rlkey=k0uytlyxn7bro1e8uhnizqoi6&dl=1" },
  { id: "A_SW108", name: "A_SW108", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/95xov59tef74k6mu384yl/A_SW108.bin?rlkey=6f5lfrlewt3te25u3a7nkz8gu&dl=1" },
  { id: "A_SW107", name: "A_SW107", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/07ylpytfrdnrukcartd3a/A_SW107.bin?rlkey=v0sr1omi6fu82vvm0lrz2x46n&dl=1" },
  { id: "A_SW106", name: "A_SW106", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/2adrfyxrxaz80k5710b52/A_SW106.bin?rlkey=ebximxpowiou323vnoilpdahw&dl=1" },
  { id: "A_SW105", name: "A_SW105", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/wyd2go4lwfdk7668zy5pw/A_SW105.bin?rlkey=ye3b8xcz71io09ai9rtb64xdm&dl=1" },
  { id: "A_SW104", name: "A_SW104", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/70wry7hlfxbplld1oixzl/A_SW104.bin?rlkey=onv2ecwwlghnceksgm76ekl24&dl=1" },
  { id: "A_SW103", name: "A_SW103", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/449vmlaunrwey0p3kcwid/A_SW103.bin?rlkey=lj32h8ookn8k905g5in35ipuz&dl=1" },
  { id: "A_SW102", name: "A_SW102", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/c1kow1lbbr3nivugz12yu/A_SW102.bin?rlkey=ev258g3c2k5lpp7760nlrn6ys&dl=1" },
  { id: "A_SW101", name: "A_SW101", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/noierzvx5dtp85xp2i2r6/A_SW101.bin?rlkey=dawa8fhoabq7ip5yucvpgzmct&dl=1" },
  { id: "A_SW100", name: "A_SW100", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/xdevjq7vjq4r5g3onqpqa/A_SW100.bin?rlkey=uc4xha3o3p578re1ig7xf9cf4&dl=1" },
  { id: "A_SW099", name: "A_SW099", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/um0eot5emgaenpeeoj7ev/A_SW099.bin?rlkey=tj7klnodtycj7qptx1t4s2x0x&dl=1" },
  { id: "A_SW098", name: "A_SW098", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/si6jc8cgfsyxvcsucoe23/A_SW098.bin?rlkey=5lojxsgm32tssxzwdzwsgiaxi&dl=1" },
  { id: "A_SW097", name: "A_SW097", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/uy41bmny99sc67omm0980/A_SW097.bin?rlkey=ngjntmnd7culzjttvt2uo3rht&dl=1" },
  { id: "A_SW096", name: "A_SW096", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/z4chxcse9a6p567n0fxmm/A_SW096.bin?rlkey=ud25ksujlnpigzr7enl1a3v71&dl=1" },
  { id: "A_SW095", name: "A_SW095", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/q2r81ojm94nfnybrmpzbr/A_SW095.bin?rlkey=r4ff8wei8k8qf9u6lhp77ll88&dl=1" },
  { id: "A_SW094", name: "A_SW094", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/10chdc55fq70n7knaahuu/A_SW094.bin?rlkey=ngz875lv2rhyy35lihplj1b7h&dl=1" },
  { id: "A_SW093", name: "A_SW093", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/d2jz9bsb6ihmmuue0y0w4/A_SW093.bin?rlkey=d1krwlgo0ho9d7moqb3z7i3rs&dl=1" },
  { id: "A_SW092", name: "A_SW092", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/p7sjsrqrjt71euk0eucvo/A_SW092.bin?rlkey=gkgbo131afyiyd1g6zptm8f3c&dl=1" },
  { id: "A_SW091", name: "A_SW091", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/91d0fye4qw51hspv166up/A_SW091.bin?rlkey=3ej28mley7c9y5f4etw9vis14&dl=1" },
  { id: "A_SW090", name: "A_SW090", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/5rl0dpbbz2ophsgk2ici8/A_SW090.bin?rlkey=dvz7row7ithv4kntsuza0qdre&dl=1" },
  { id: "A_SW089", name: "A_SW089", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/kctntzv2ym4tsdsrtwn5x/A_SW089.bin?rlkey=9j16bfk1g3hwle40h5n8xtht3&dl=1" },
  { id: "A_SW088", name: "A_SW088", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/vki2t33tb1ayeaulqcard/A_SW088.bin?rlkey=i5d8rctrvxxv05bakmaipp584&dl=1" },
  { id: "A_SW087", name: "A_SW087", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/fj58azn4mff4y4rxlle5b/A_SW087.bin?rlkey=k2zol6x5n86dq53aq2zmohc32&dl=1" },
  { id: "A_SW086", name: "A_SW086", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/hpb4orn8xq9klhhwnmhtj/A_SW086.bin?rlkey=mbgl6l295bou4x2g81fg72f7u&dl=1" },
  { id: "A_SW085", name: "A_SW085", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/5cb0725cx55um126g7gnu/A_SW085.bin?rlkey=qvg4hsc2c5dvmdlzgvqmqus50&dl=1" },
  { id: "A_SW084", name: "A_SW084", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/z6fnuhz5zp5842godpt5o/A_SW084.bin?rlkey=ex7rhh6ykxhb5wpk5uow2x5ch&dl=1" },
  { id: "A_SW083", name: "A_SW083", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/pp4w35qm4a4p3puj4le26/A_SW083.bin?rlkey=x1686hz23xhepeueggqzu8t9m&dl=1" },
  { id: "A_SW082", name: "A_SW082", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/aa0kphvyh0t5kbn27kbpr/A_SW082.bin?rlkey=zeu2paj6985mitu4dg451c0jq&dl=1" },
  { id: "A_SW081", name: "A_SW081", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/7mno0ajg8zva7vreoi6pw/A_SW081.bin?rlkey=dqh9f0koytkq16b1fx4vp61lm&dl=1" },
  { id: "A_SW080", name: "A_SW080", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/2dbysbalebkpgi2wsjcgn/A_SW080.bin?rlkey=4qfon7qfvorhowqk4y99p53d3&dl=1" },
  { id: "A_SW079", name: "A_SW079", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/vg6gzmskfclp75cerwp1n/A_SW079.bin?rlkey=j61h890o0hmzmtd2plmmy1u7a&dl=1" },
  { id: "A_SW078", name: "A_SW078", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/f5bjkp3puxrk8bcg1oduu/A_SW078.bin?rlkey=wl5iyzxcnu4349z8us9drxmb8&dl=1" },
  { id: "A_SW077", name: "A_SW077", category: "starwars", display: "atom", downloadUrl: "https://www.dropbox.com/scl/fi/gz0oz7hz2d82768z7ennp/A_SW077.bin?rlkey=1fgfu6d58unj5r9xoxzui55u6&dl=1" },
  // Generate more Star Wars files (A_SW001-A_SW076)
  ...Array.from({ length: 76 }, (_, i) => ({
    id: `A_SW${String(76 - i).padStart(3, '0')}`,
    name: `A_SW${String(76 - i).padStart(3, '0')}`,
    category: "starwars" as const,
    display: "atom" as const,
    downloadUrl: `https://www.dropbox.com/scl/fi/placeholder/A_SW${String(76 - i).padStart(3, '0')}.bin?dl=1`
  })),
  // Luxa Star Wars (L_SW)
  ...Array.from({ length: 78 }, (_, i) => ({
    id: `L_SW${String(78 - i).padStart(3, '0')}`,
    name: `L_SW${String(78 - i).padStart(3, '0')}`,
    category: "starwars" as const,
    display: "luxa" as const,
    downloadUrl: `https://www.dropbox.com/scl/fi/placeholder/L_SW${String(78 - i).padStart(3, '0')}.bin?dl=1`
  })),
  // Warhammer - Luxa
  { id: "L_WH008", name: "L_WH008", category: "warhammer", display: "luxa", downloadUrl: "https://www.dropbox.com/scl/fi/u9t0uzuyxusmfomei7hjm/L_WH008.BIN?rlkey=dmwufwzayc2hid5qzauhd0d3a&dl=1" },
  { id: "L_WH007", name: "L_WH007", category: "warhammer", display: "luxa", downloadUrl: "https://www.dropbox.com/scl/fi/b92305o29a5u2ne40efas/L_WH007.BIN?rlkey=h4hx4oh6trzv4fxnl8yhwbm91&dl=1" },
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `L_WH${String(6 - i).padStart(3, '0')}`,
    name: `L_WH${String(6 - i).padStart(3, '0')}`,
    category: "warhammer" as const,
    display: "luxa" as const,
    downloadUrl: `https://www.dropbox.com/scl/fi/placeholder/L_WH${String(6 - i).padStart(3, '0')}.BIN?dl=1`
  })),
  // Warhammer - Atom
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `A_WH${String(8 - i).padStart(3, '0')}`,
    name: `A_WH${String(8 - i).padStart(3, '0')}`,
    category: "warhammer" as const,
    display: "atom" as const,
    downloadUrl: `https://www.dropbox.com/scl/fi/placeholder/A_WH${String(8 - i).padStart(3, '0')}.bin?dl=1`
  })),
  // Batman - Atom
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `A_BM${String(5 - i).padStart(3, '0')}`,
    name: `A_BM${String(5 - i).padStart(3, '0')}`,
    category: "batman" as const,
    display: "atom" as const,
    downloadUrl: `https://www.dropbox.com/scl/fi/placeholder/A_BM${String(5 - i).padStart(3, '0')}.bin?dl=1`
  })),
  // Batman - Luxa
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `L_BM${String(5 - i).padStart(3, '0')}`,
    name: `L_BM${String(5 - i).padStart(3, '0')}`,
    category: "batman" as const,
    display: "luxa" as const,
    downloadUrl: `https://www.dropbox.com/scl/fi/placeholder/L_BM${String(5 - i).padStart(3, '0')}.bin?dl=1`
  })),
  // Arcane - Atom
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `A_AR${String(7 - i).padStart(3, '0')}`,
    name: `A_AR${String(7 - i).padStart(3, '0')}`,
    category: "arcane" as const,
    display: "atom" as const,
    downloadUrl: `https://www.dropbox.com/scl/fi/placeholder/A_AR${String(7 - i).padStart(3, '0')}.bin?dl=1`
  })),
  // Arcane - Luxa
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `L_AR${String(7 - i).padStart(3, '0')}`,
    name: `L_AR${String(7 - i).padStart(3, '0')}`,
    category: "arcane" as const,
    display: "luxa" as const,
    downloadUrl: `https://www.dropbox.com/scl/fi/placeholder/L_AR${String(7 - i).padStart(3, '0')}.bin?dl=1`
  })),
  // Minecraft - Atom
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `A_MC${String(8 - i).padStart(3, '0')}`,
    name: `A_MC${String(8 - i).padStart(3, '0')}`,
    category: "minecraft" as const,
    display: "atom" as const,
    downloadUrl: `https://www.dropbox.com/scl/fi/placeholder/A_MC${String(8 - i).padStart(3, '0')}.bin?dl=1`
  })),
  // Minecraft - Luxa
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `L_MC${String(8 - i).padStart(3, '0')}`,
    name: `L_MC${String(8 - i).padStart(3, '0')}`,
    category: "minecraft" as const,
    display: "luxa" as const,
    downloadUrl: `https://www.dropbox.com/scl/fi/placeholder/L_MC${String(8 - i).padStart(3, '0')}.bin?dl=1`
  })),
  // Sound files - Atom only
  ...Array.from({ length: 57 }, (_, i) => ({
    id: `A_SND${String(57 - i).padStart(3, '0')}`,
    name: `A_SND${String(57 - i).padStart(3, '0')}`,
    category: "sound" as const,
    display: "atom" as const,
    downloadUrl: `https://www.dropbox.com/scl/fi/placeholder/A_SND${String(57 - i).padStart(3, '0')}.bin?dl=1`,
    hasSound: true
  })),
];

const categories = [
  { id: "all", name: "All", count: 259, icon: Disc3, color: "cyan" },
  { id: "sound", name: "Sound (Atom)", count: 57, icon: Volume2, color: "purple" },
  { id: "starwars", name: "Star Wars", count: 203, icon: Star, color: "yellow" },
  { id: "batman", name: "Batman", count: 10, icon: Zap, color: "gray" },
  { id: "arcane", name: "Arcane", count: 14, icon: Zap, color: "pink" },
  { id: "minecraft", name: "Minecraft", count: 16, icon: Pickaxe, color: "green" },
  { id: "warhammer", name: "Warhammer", count: 16, icon: Sword, color: "red" },
];

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  starwars: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30" },
  batman: { bg: "bg-gray-500/10", text: "text-gray-300", border: "border-gray-500/30" },
  arcane: { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/30" },
  minecraft: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" },
  warhammer: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
  sound: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
};

export default function PixelArcArchive() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [displayFilter, setDisplayFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const { toast } = useToast();

  const filteredFiles = hologramFiles.filter((file) => {
    const matchesCategory = selectedCategory === "all" || file.category === selectedCategory;
    const matchesDisplay = displayFilter === "all" || file.display === displayFilter;
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDisplay && matchesSearch;
  });

  const handleDownload = (file: HologramFile) => {
    window.open(file.downloadUrl, '_blank');
    toast({
      title: "Download started",
      description: `Downloading ${file.name}.bin`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/projects/holofans">
              <Button variant="ghost" className="gap-2" data-testid="button-back-holofans">
                <ArrowLeft className="w-4 h-4" />
                Back to Holofans
              </Button>
            </Link>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Disc3
                className="w-10 h-10 animate-spin"
                style={{ 
                  color: "hsl(280 100% 60%)",
                  animationDuration: "3s"
                }}
              />
              <h1
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider"
                style={{
                  background: "linear-gradient(135deg, hsl(280 100% 60%), hsl(187 100% 50%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                data-testid="text-archive-title"
              >
                Community Archive (BIN)
              </h1>
            </div>
            <p className="text-lg text-purple-200/80 font-heading mb-2">
              You can drag and drop these .bin files straight onto your micro SD Card.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
              <a href="https://pixelarc.store/pages/downloads" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Downloads</a>
              <span>-</span>
              <a href="https://pixelarc.store/pages/holo-archive" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Holo Archive</a>
              <span>-</span>
              <a href="https://pixelarc.store/pages/luxafiles" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Luxa Files</a>
              <span>-</span>
              <a href="https://pixelarc.store/pages/atomfiles" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Atom Files</a>
              <span>-</span>
              <a href="https://pixelarc.store/pages/community-archive" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Community Archive (MP4)</a>
            </div>
          </div>

          <Card className="mb-8 bg-card/50 backdrop-blur-xl border-purple-500/30">
            <Collapsible open={isInstructionsOpen} onOpenChange={setIsInstructionsOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-purple-500/5 transition-colors">
                  <CardTitle className="flex items-center justify-between text-base">
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-purple-400" />
                      How to add these .BIN files to your SD Card
                    </span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${isInstructionsOpen ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Take the micro SD out of the display.</li>
                    <li>Insert the SD into a USB SD reader or your phone's micro SD slot if it has one.</li>
                    <li>Download the video you want. Bin files are not cross compatible, make sure to select <strong className="text-purple-400">Luxa</strong> (big display) or <strong className="text-cyan-400">Atom</strong> (small display) depending on which device you are using.</li>
                    <li>Copy and paste the .bin files onto your SD card (50 maximum)</li>
                    <li>Remove your SD card and insert it back into the display!</li>
                  </ol>
                  <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <p className="text-sm text-yellow-300 flex items-center gap-2">
                      <HardDrive className="w-4 h-4" />
                      <strong>Note:</strong> Our displays support up to 50 loaded files at a time (Max)
                    </p>
                    <p className="text-xs text-yellow-200/70 mt-2">
                      To upload more than 50 videos, please choose from one of our premade playlists, OR combine multiple files into a single video file using your video editing software of choice.
                    </p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          <div className="flex flex-col lg:flex-row gap-6">
            <Card className="lg:w-64 shrink-0 bg-card/50 backdrop-blur-xl border-purple-500/20 h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-heading text-purple-300">
                  Filter Categories
                  <Badge variant="outline" className="ml-2 border-purple-500/30 text-purple-400">
                    {filteredFiles.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all ${
                        isSelected 
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/40" 
                          : "text-muted-foreground hover:bg-purple-500/10 hover:text-purple-300"
                      }`}
                      data-testid={`category-${cat.id}`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {cat.name}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {cat.count}
                      </Badge>
                    </button>
                  );
                })}
              </CardContent>
              <CardContent className="pt-0">
                <div className="border-t border-purple-500/20 pt-4">
                  <p className="text-xs text-muted-foreground mb-2">Display Type</p>
                  <Select value={displayFilter} onValueChange={setDisplayFilter}>
                    <SelectTrigger className="w-full" data-testid="select-display">
                      <SelectValue placeholder="Filter - All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Filter - All</SelectItem>
                      <SelectItem value="atom">Atom (Small)</SelectItem>
                      <SelectItem value="luxa">Luxa (Large)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex-1 space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card/50 border-purple-500/30"
                  data-testid="input-search-files"
                />
              </div>

              <p className="text-sm text-muted-foreground italic">
                Tap To Download (Saved to Files on Mobile)
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredFiles.slice(0, 100).map((file) => {
                  const colors = categoryColors[file.category] || categoryColors.starwars;
                  return (
                    <Card 
                      key={file.id}
                      className={`group cursor-pointer transition-all hover:scale-105 ${colors.bg} ${colors.border} border`}
                      onClick={() => handleDownload(file)}
                      data-testid={`file-${file.id}`}
                    >
                      <CardContent className="p-4">
                        <div 
                          className="aspect-square rounded-lg bg-black/50 flex items-center justify-center mb-3 relative overflow-hidden"
                          style={{ boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)" }}
                        >
                          <div 
                            className="absolute inset-0 opacity-30"
                            style={{
                              background: `radial-gradient(circle, ${file.display === 'atom' ? 'hsl(187 100% 50%)' : 'hsl(280 100% 60%)'} 0%, transparent 70%)`,
                            }}
                          />
                          <Disc3 
                            className={`w-12 h-12 ${colors.text} group-hover:animate-spin`}
                            style={{ animationDuration: "2s" }}
                          />
                          {file.hasSound && (
                            <div className="absolute top-1 right-1">
                              <Volume2 className="w-4 h-4 text-purple-400" />
                            </div>
                          )}
                          <div className="absolute bottom-1 right-1">
                            <Badge 
                              variant="secondary" 
                              className={`text-[9px] px-1 py-0 ${file.display === 'atom' ? 'bg-cyan-500/30 text-cyan-300' : 'bg-purple-500/30 text-purple-300'}`}
                            >
                              {file.display === 'atom' ? 'A' : 'L'}
                            </Badge>
                          </div>
                        </div>
                        <p className={`text-sm font-medium text-center ${colors.text} truncate`}>
                          {file.name}
                        </p>
                        <div className="flex items-center justify-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Download className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Click to download</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {filteredFiles.length > 100 && (
                <div className="text-center">
                  <Button variant="outline" className="gap-2" data-testid="button-load-more">
                    Load More ({filteredFiles.length - 100} remaining)
                  </Button>
                </div>
              )}

              {filteredFiles.length === 0 && (
                <div className="text-center py-12">
                  <Disc3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No files found matching your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
