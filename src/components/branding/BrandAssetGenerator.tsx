'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/Badge';
import {
  Palette,
  Type,
  Image as ImageIcon,
  Download,
  Copy,
  Eye,
  Zap,
  Layers,
  Grid,
  Square,
  Circle,
  Triangle,
  Star,
  Heart,
  Crown,
  Shield,
  Lightbulb,
  Rocket,
  Target,
  Gem
} from 'lucide-react';

interface BrandAsset {
  id: string;
  type: 'logo' | 'color_palette' | 'typography' | 'template' | 'icon';
  name: string;
  preview: string;
  downloadUrl: string;
  format: string;
}

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  background: string;
}

interface LogoStyle {
  icon: React.ComponentType<any>;
  name: string;
  description: string;
}

const BrandAssetGenerator: React.FC = () => {
  const [brandName, setBrandName] = useState('');
  const [brandDescription, setBrandDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [colorPalette, setColorPalette] = useState<ColorPalette>({
    primary: '#1E40AF',
    secondary: '#7C3AED',
    accent: '#F59E0B',
    neutral: '#6B7280',
    background: '#F9FAFB'
  });
  const [generatedAssets, setGeneratedAssets] = useState<BrandAsset[]>([]);
  const [activeTab, setActiveTab] = useState('colors');
  const [isGenerating, setIsGenerating] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const logoStyles: LogoStyle[] = [
    { icon: Square, name: 'geometric', description: 'Clean geometric shapes' },
    { icon: Circle, name: 'circular', description: 'Circular and organic forms' },
    { icon: Triangle, name: 'angular', description: 'Sharp, angular designs' },
    { icon: Star, name: 'symbolic', description: 'Symbolic and iconic' },
    { icon: Heart, name: 'friendly', description: 'Warm and approachable' },
    { icon: Crown, name: 'premium', description: 'Luxury and premium feel' },
    { icon: Shield, name: 'trustworthy', description: 'Reliable and secure' },
    { icon: Lightbulb, name: 'innovative', description: 'Creative and innovative' },
    { icon: Rocket, name: 'dynamic', description: 'Fast and energetic' },
    { icon: Gem, name: 'elegant', description: 'Sophisticated and refined' }
  ];

  const colorSchemes = [
    { name: 'Professional Blue', primary: '#1E40AF', secondary: '#3B82F6', accent: '#60A5FA' },
    { name: 'Creative Purple', primary: '#7C3AED', secondary: '#A855F7', accent: '#C084FC' },
    { name: 'Energy Orange', primary: '#EA580C', secondary: '#FB923C', accent: '#FED7AA' },
    { name: 'Growth Green', primary: '#059669', secondary: '#10B981', accent: '#6EE7B7' },
    { name: 'Premium Gold', primary: '#D97706', secondary: '#F59E0B', accent: '#FCD34D' },
    { name: 'Tech Gray', primary: '#374151', secondary: '#6B7280', accent: '#9CA3AF' }
  ];

  const generateBrandAssets = () => {
    setIsGenerating(true);
    
    // Simulate asset generation
    setTimeout(() => {
      const assets: BrandAsset[] = [
        {
          id: '1',
          type: 'logo',
          name: 'Primary Logo',
          preview: '/api/placeholder/300/150',
          downloadUrl: '#',
          format: 'SVG, PNG, PDF'
        },
        {
          id: '2',
          type: 'logo',
          name: 'Logo Horizontal',
          preview: '/api/placeholder/400/150',
          downloadUrl: '#',
          format: 'SVG, PNG'
        },
        {
          id: '3',
          type: 'logo',
          name: 'Logo Mark',
          preview: '/api/placeholder/150/150',
          downloadUrl: '#',
          format: 'SVG, PNG'
        },
        {
          id: '4',
          type: 'color_palette',
          name: 'Brand Colors',
          preview: 'gradient',
          downloadUrl: '#',
          format: 'ASE, CSS, JSON'
        }
      ];
      
      setGeneratedAssets(assets);
      setIsGenerating(false);
    }, 3000);
  };

  const generateLogoOnCanvas = (style: string, text: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set up canvas
    ctx.fillStyle = colorPalette.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw logo based on style
    ctx.fillStyle = colorPalette.primary;
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text || 'LOGO', canvas.width / 2, canvas.height / 2);
    
    // Add shape based on style
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 - 80;
    
    ctx.fillStyle = colorPalette.accent;
    switch (style) {
      case 'geometric':
        ctx.fillRect(centerX - 30, centerY - 30, 60, 60);
        break;
      case 'circular':
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
        ctx.fill();
        break;
      case 'angular':
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 30);
        ctx.lineTo(centerX - 30, centerY + 30);
        ctx.lineTo(centerX + 30, centerY + 30);
        ctx.closePath();
        ctx.fill();
        break;
    }
  };

  const downloadAsset = (asset: BrandAsset) => {
    // Generate the asset on canvas and download
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size based on asset type
    const sizes: Record<string, { w: number; h: number }> = {
      logo: { w: 512, h: 512 },
      color_palette: { w: 800, h: 400 },
      typography: { w: 800, h: 600 },
      template: { w: 1200, h: 630 },
      icon: { w: 256, h: 256 },
    };

    const size = sizes[asset.type] || { w: 512, h: 512 };
    canvas.width = size.w;
    canvas.height = size.h;

    // Clear canvas
    ctx.fillStyle = colorPalette.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw based on asset type
    if (asset.type === 'logo' || asset.type === 'icon') {
      // Draw logo with brand name and selected style
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const shapeSize = Math.min(canvas.width, canvas.height) * 0.2;

      // Draw shape based on selected style
      ctx.fillStyle = colorPalette.accent;
      switch (selectedStyle) {
        case 'geometric':
          ctx.fillRect(centerX - shapeSize, centerY - shapeSize - 60, shapeSize * 2, shapeSize * 2);
          break;
        case 'circular':
        case 'friendly':
          ctx.beginPath();
          ctx.arc(centerX, centerY - 60, shapeSize, 0, 2 * Math.PI);
          ctx.fill();
          break;
        case 'angular':
        case 'dynamic':
          ctx.beginPath();
          ctx.moveTo(centerX, centerY - shapeSize - 60);
          ctx.lineTo(centerX - shapeSize, centerY + shapeSize - 60);
          ctx.lineTo(centerX + shapeSize, centerY + shapeSize - 60);
          ctx.closePath();
          ctx.fill();
          break;
        default:
          // Default to rectangle
          ctx.fillRect(centerX - shapeSize, centerY - shapeSize - 60, shapeSize * 2, shapeSize * 2);
      }

      // Draw brand name
      ctx.fillStyle = colorPalette.primary;
      ctx.font = `bold ${canvas.width * 0.08}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(brandName || 'Brand', centerX, centerY + shapeSize + 20);
    } else if (asset.type === 'color_palette') {
      // Draw color swatches
      const colors = [colorPalette.primary, colorPalette.secondary, colorPalette.accent, colorPalette.neutral, colorPalette.background];
      const swatchWidth = canvas.width / colors.length;
      colors.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.fillRect(i * swatchWidth, 0, swatchWidth, canvas.height * 0.7);
        ctx.fillStyle = '#000';
        ctx.font = '16px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(color.toUpperCase(), i * swatchWidth + swatchWidth / 2, canvas.height * 0.85);
      });
    }

    // Create download link
    const link = document.createElement('a');
    link.download = `${asset.name.replace(/\s+/g, '_').toLowerCase()}.${asset.format}`;
    link.href = canvas.toDataURL(`image/${asset.format === 'png' ? 'png' : 'jpeg'}`, 1.0);
    link.click();
  };

  const copyColorToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Brand Asset Generator</h1>
        <p className="text-gray-600">
          Create professional brand assets instantly with AI-powered design tools
        </p>
      </div>

      {/* Brand Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Brand Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand-name">Brand Name</Label>
              <Input
                id="brand-name"
                placeholder="Enter your brand name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="e.g., Technology, Healthcare"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Brand Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your brand's personality, values, and target audience"
              value={brandDescription}
              onChange={(e) => setBrandDescription(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Asset Creation Tabs */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            {['colors', 'logos', 'typography', 'templates'].map(tab => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'default' : 'outline'}
                onClick={() => setActiveTab(tab)}
                className="capitalize"
              >
                {tab}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {/* Color Palette Section */}
          {activeTab === 'colors' && (
            <div className="space-y-6">
              <div>
                <Label className="text-lg font-semibold">Choose Color Scheme</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {colorSchemes.map((scheme, index) => (
                    <Card 
                      key={index} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setColorPalette({
                        primary: scheme.primary,
                        secondary: scheme.secondary,
                        accent: scheme.accent,
                        neutral: '#6B7280',
                        background: '#F9FAFB'
                      })}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-1 mb-3">
                          <div 
                            className="w-8 h-8 rounded" 
                            style={{backgroundColor: scheme.primary}}
                          />
                          <div 
                            className="w-8 h-8 rounded" 
                            style={{backgroundColor: scheme.secondary}}
                          />
                          <div 
                            className="w-8 h-8 rounded" 
                            style={{backgroundColor: scheme.accent}}
                          />
                        </div>
                        <h3 className="font-medium text-sm">{scheme.name}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold">Custom Color Palette</Label>
                <div className="grid grid-cols-5 gap-4 mt-4">
                  {Object.entries(colorPalette).map(([key, color]) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-sm capitalize">{key}</Label>
                      <div className="flex gap-2">
                        <div 
                          className="w-12 h-12 rounded border cursor-pointer"
                          style={{backgroundColor: color}}
                          onClick={() => copyColorToClipboard(color)}
                        />
                        <Input
                          type="color"
                          value={color}
                          onChange={(e) => setColorPalette({
                            ...colorPalette,
                            [key]: e.target.value
                          })}
                          className="w-12 h-12 p-0 border-0"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {color}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-1 h-6 w-6"
                          onClick={() => copyColorToClipboard(color)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Logo Section */}
          {activeTab === 'logos' && (
            <div className="space-y-6">
              <div>
                <Label className="text-lg font-semibold">Logo Style</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                  {logoStyles.map((style) => (
                    <Card 
                      key={style.name}
                      className={`cursor-pointer transition-all ${
                        selectedStyle === style.name ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedStyle(style.name)}
                    >
                      <CardContent className="p-4 text-center">
                        <style.icon className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                        <h3 className="font-medium text-sm capitalize">{style.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{style.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold">Logo Preview</Label>
                <div className="mt-4 p-8 bg-gray-100 rounded-lg text-center">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={200}
                    className="border rounded bg-white mx-auto"
                  />
                  <Button 
                    onClick={() => generateLogoOnCanvas(selectedStyle, brandName)}
                    className="mt-4"
                    variant="outline"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Generate Preview
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Typography Section */}
          {activeTab === 'typography' && (
            <div className="space-y-6">
              <div>
                <Label className="text-lg font-semibold">Typography Pairings</Label>
                <div className="space-y-4 mt-4">
                  {[
                    { heading: 'Inter', body: 'Source Sans Pro', category: 'Modern & Clean' },
                    { heading: 'Playfair Display', body: 'Lato', category: 'Elegant & Professional' },
                    { heading: 'Montserrat', body: 'Open Sans', category: 'Versatile & Friendly' },
                    { heading: 'Poppins', body: 'Nunito', category: 'Contemporary & Approachable' }
                  ].map((pair, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <Badge variant="outline">{pair.category}</Badge>
                        </div>
                        <div className="space-y-2">
                          <div style={{fontFamily: pair.heading}} className="text-2xl font-bold">
                            {brandName || 'Your Brand Name'}
                          </div>
                          <div style={{fontFamily: pair.body}} className="text-gray-600">
                            {brandDescription || 'Your brand description will appear in this beautiful typography pairing, showcasing the perfect balance between headers and body text.'}
                          </div>
                          <div className="text-sm text-gray-500 mt-4">
                            Heading: {pair.heading} • Body: {pair.body}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Templates Section */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div>
                <Label className="text-lg font-semibold">Brand Templates</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {[
                    'Business Card', 'Letterhead', 'Email Signature', 
                    'Social Media Kit', 'Presentation Template', 'Invoice Template',
                    'Brochure Layout', 'Website Header', 'Product Catalog'
                  ].map((template, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded mb-3 flex items-center justify-center">
                          <Grid className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="font-medium">{template}</h3>
                        <p className="text-sm text-gray-500">Professional design ready to customize</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generate Assets Button */}
      <div className="text-center">
        <Button 
          onClick={generateBrandAssets}
          disabled={isGenerating || !brandName}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating Assets...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Generate Brand Assets
            </div>
          )}
        </Button>
      </div>

      {/* Generated Assets */}
      {generatedAssets.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Your Brand Assets ({generatedAssets.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedAssets.map(asset => (
                <Card key={asset.id} className="border">
                  <CardContent className="p-4">
                    <div className="w-full h-32 bg-gray-100 rounded mb-3 flex items-center justify-center">
                      {asset.type === 'color_palette' ? (
                        <div className="flex gap-1">
                          {Object.values(colorPalette).slice(0, 3).map((color, i) => (
                            <div 
                              key={i}
                              className="w-8 h-8 rounded"
                              style={{backgroundColor: color}}
                            />
                          ))}
                        </div>
                      ) : (
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    <h3 className="font-medium mb-2">{asset.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{asset.format}</p>
                    <Button 
                      onClick={() => downloadAsset(asset)}
                      className="w-full"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BrandAssetGenerator;