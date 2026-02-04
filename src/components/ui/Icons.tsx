'use client';

// Optimized icon imports - only import what we need
import {
  ArrowRight,
  BookOpen,
  Trophy,
  Users,
  Loader2,
  Calendar,
  Zap,
  Target,
  Lock,
  CheckCircle,
  Clock,
  ShoppingCart,
  TrendingUp,
  Grid,
  List,
  Map,
  Search,
  Filter,
  Briefcase,
  DollarSign,
  Scale,
  Rocket,
  MapPin,
  Package,
  Star,
  AlertCircle,
  Gift,
  Building,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  Eye,
  EyeOff,
  Edit,
  Trash,
  Download,
  Upload,
  Share,
  Copy,
  Heart,
  Mail,
  Phone,
  ExternalLink,
  Home,
  Settings,
  User,
  LogOut,
  Bell,
  HelpCircle,
  Info,
  CheckCheck,
  XCircle,
  AlertTriangle,
  PlayCircle,
  PauseCircle,
  FileText,
  Image,
  Video,
  Mic,
  Camera,
  Send,
  Reply,
  Forward,
  Flag,
  Bookmark,
  Globe,
  Wifi,
  WifiOff,
  Battery,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Server,
  Database,
  Cloud,
  Shield,
  Key,
  CreditCard,
  Wallet,
  PieChart,
  BarChart,
  LineChart,
  Activity,
  Layers,
  Box,
  Archive,
  Folder,
  File,
  Link,
  Navigation,
  Compass,
  Maximize,
  Minimize,
  RotateCw,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Move,
  Crop,
  Scissors,
  Paperclip,
  Printer,
  ScanLine as Scanner,
  Phone as Fax,
  Calculator,
  Clock3,
  Timer,
  TimerOff as Stopwatch,
  AlarmClock,
  Calendar as CalendarIcon,
  Truck,
  Plane,
  Train,
  Ship,
  Car,
  Bike,
  Bus,
  Fuel,
  Route,
  Signpost,
  Construction,
  Hammer,
  Wrench,
  Wrench as Screwdriver,
  Paintbrush,
  Palette,
  Pipette,
  Ruler,
  Triangle,
  Square,
  Circle,
  Hexagon,
  Diamond,
  Shapes,
  Layout,
  Sidebar,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Columns,
  Rows,
  MoreHorizontal,
  MoreVertical,
  Command,
  Option,
  ArrowBigUp as Shift,
  Table2 as Tab,
  Space,
  CornerDownLeft as Enter,
  Delete as Backspace,
  Trash2 as Delete,
  X as Escape,
} from 'lucide-react';

// Re-export commonly used icons with consistent naming
export {
  // Navigation & Actions
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Home,
  Settings,
  Search,
  Filter,
  
  // Status & Feedback
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  Loader2,
  
  // Business & Commerce
  ShoppingCart,
  CreditCard,
  DollarSign,
  TrendingUp,
  BarChart,
  PieChart,
  
  // User & Social
  Users,
  User,
  Heart,
  Mail,
  Phone,
  Share,
  
  // Content & Media
  BookOpen,
  FileText,
  Image,
  Video,
  Upload,
  Download,
  
  // Time & Calendar
  Clock,
  Calendar,
  Timer,
  
  // UI Elements
  Grid,
  List,
  Layout,
  Eye,
  EyeOff,
  Lock,
  
  // Achievement & Progress
  Trophy,
  Star,
  Target,
  Zap,
  Rocket,
  
  // Location & Navigation
  Map,
  MapPin,
  Navigation,
  Compass,
  
  // Business Objects
  Building,
  Briefcase,
  Package,
  Gift,
  Scale,
  
  // Tech & Development
  Database,
  Server,
  Cloud,
  Shield,
  Key,
  
  // Tools & Utilities
  Wrench,
  Edit,
  Trash,
  Copy,
  Send,
  
  // Communication
  Bell,
  Flag,
  Bookmark,
  HelpCircle,
  
  // Layout & Display
  Maximize,
  Minimize,
  RefreshCw,
  MoreHorizontal,
  MoreVertical,
};

// Icon component with optimization
export interface IconProps {
  size?: number | string;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

// Optimized icon wrapper for consistent styling
export function Icon({ 
  children, 
  size = 20, 
  className = '', 
  ...props 
}: IconProps & { children: React.ReactNode }) {
  return (
    <span 
      className={`inline-flex items-center justify-center ${className}`} 
      style={{ width: size, height: size }}
      {...props}
    >
      {children}
    </span>
  );
}

// Lazy loaded icon for heavy components
export function LazyIcon({ iconName, ...props }: IconProps & { iconName: string }) {
  // This could be extended to dynamically import icons
  return <Icon {...props}><div className="w-full h-full bg-gray-300 rounded animate-pulse" /></Icon>;
}

// Icon preloader for performance
export function preloadIcons(_iconNames: string[]) {
  // This would preload icon assets in a production app
  // Implementation would depend on your icon loading strategy
}

// Common icon combinations
export const StatusIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  loading: Loader2,
};

export const NavigationIcons = {
  home: Home,
  dashboard: Grid,
  settings: Settings,
  profile: User,
  logout: LogOut,
  menu: Menu,
  close: X,
  back: ArrowRight, // Rotated in CSS
  forward: ArrowRight,
};

export const BusinessIcons = {
  revenue: DollarSign,
  growth: TrendingUp,
  customers: Users,
  products: Package,
  analytics: BarChart,
  performance: Target,
};

export const ActionIcons = {
  edit: Edit,
  delete: Trash,
  view: Eye,
  hide: EyeOff,
  download: Download,
  upload: Upload,
  share: Share,
  copy: Copy,
  send: Send,
};