import React from 'react';
import { 
  Sword, 
  Shield, 
  Flame, 
  Sparkles, 
  Zap, 
  Cross, 
  Skull, 
  Eye, 
  Feather, 
  Key, 
  Gem, 
  Clock, 
  Moon, 
  Sun, 
  Award, 
  BookOpen, 
  Compass, 
  Target, 
  Crown,
  Heart,
  Droplet
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
}

export const ThemeIcon: React.FC<IconProps> = ({ name, className = "w-5 h-5" }) => {
  switch (name) {
    // Armas
    case 'whip':
      return <Sparkles className={`${className} text-gold-accent`} />;
    case 'greatsword':
      return <Sword className={`${className} text-blood-400 rotate-45 scale-110`} />;
    case 'dual-swords':
      return <Sword className={`${className} text-purple-400`} />;
    case 'spear':
      return <Target className={`${className} text-cyan-400`} />;
    case 'sword-shield':
      return <Shield className={`${className} text-gold-300`} />;
    case 'fist':
      return <Zap className={`${className} text-amber-500`} />;
    case 'sword':
      return <Sword className={`${className} text-emerald-400`} />;

    // Arcanos
    case 'holy':
    case 'cross':
      return <Cross className={`${className} text-gold-300`} />;
    case 'fire':
      return <Flame className={`${className} text-red-500`} />;
    case 'gaze':
      return <Eye className={`${className} text-emerald-400`} />;
    case 'hammer':
      return <Award className={`${className} text-amber-600`} />;
    case 'crown':
      return <Crown className={`${className} text-gold-400`} />;
    case 'thorns':
      return <Droplet className={`${className} text-blood-500`} />;
    case 'scythe':
      return <Moon className={`${className} text-purple-300`} />;
    case 'chaos':
      return <Sun className={`${className} text-orange-500`} />;
    case 'ice':
      return <Sparkles className={`${className} text-blue-300`} />;
    case 'clock':
      return <Clock className={`${className} text-indigo-400`} />;
    case 'drain':
      return <Heart className={`${className} text-rose-500`} />;
    case 'shield':
      return <Shield className={`${className} text-amber-400`} />;
    case 'chains':
      return <Zap className={`${className} text-gold-500`} />;
    case 'mirror':
      return <Sparkles className={`${className} text-cyan-300`} />;
    case 'cursed-fire':
      return <Flame className={`${className} text-purple-500`} />;

    // Relíquias
    case 'knot':
      return <BookOpen className={`${className} text-purple-400`} />;
    case 'gem':
      return <Gem className={`${className} text-amber-300`} />;
    case 'family':
      return <Crown className={`${className} text-gold-300`} />;
    case 'fang':
      return <Skull className={`${className} text-zinc-300`} />;
    case 'rune':
      return <Sparkles className={`${className} text-rose-400`} />;
    case 'trinket':
      return <Moon className={`${className} text-red-400`} />;
    case 'sigil':
      return <Shield className={`${className} text-violet-400`} />;
    case 'mind':
      return <Sparkles className={`${className} text-blue-400`} />;
    case 'feather':
      return <Feather className={`${className} text-sky-400`} />;
    case 'eye':
      return <Eye className={`${className} text-purple-400`} />;
    case 'charm':
      return <Skull className={`${className} text-red-500`} />;
    case 'key':
      return <Key className={`${className} text-gold-400`} />;
    case 'stone':
      return <Compass className={`${className} text-slate-400`} />;
    case 'coin':
      return <Gem className={`${className} text-yellow-400`} />;
    case 'ring':
      return <Gem className={`${className} text-orange-400`} />;
    case 'brew':
      return <Droplet className={`${className} text-emerald-500`} />;
    case 'lich':
      return <Skull className={`${className} text-violet-500`} />;

    default:
      return <Sparkles className={className} />;
  }
};
