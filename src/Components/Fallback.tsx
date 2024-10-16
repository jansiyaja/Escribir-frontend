import React from 'react';
import { Pencil, Image, Tag, Coffee, LucideIcon } from 'lucide-react';

interface FloatingIcon {
  icon: LucideIcon;
  color: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay: number;
}


interface CreativeBlogLoadingProps {
  children?: React.ReactNode;
  className?: string;
  subtitle?: string;
  icons?: FloatingIcon[];
  animationDuration?: number;
}

const defaultIcons: FloatingIcon[] = [
  { icon: Coffee, color: 'text-amber-600', position: 'top-right', delay: 0 },
  { icon: Image, color: 'text-blue-500', position: 'bottom-left', delay: 0.5 },
  { icon: Tag, color: 'text-green-500', position: 'top-left', delay: 1 },
  { icon: Pencil, color: 'text-purple-500', position: 'bottom-right', delay: 1.5 },
];


const positionClasses: Record<FloatingIcon['position'], string> = {
  'top-left': '-top-4 -left-4',
  'top-right': '-top-4 -right-4',
  'bottom-left': '-bottom-4 -left-4',
  'bottom-right': '-bottom-4 -right-4',
};

export const CreativeBlogLoading: React.FC<CreativeBlogLoadingProps> = ({
  children = 'Crafting Your Blog Experience',
  className = '',
  subtitle = 'Brewing creativity, one word at a time...',
  icons = defaultIcons,
  animationDuration = 3,
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
      <div className="w-full max-w-md">
        <div className="relative h-48 bg-gradient-to-b from-purple-50 to-blue-50 rounded-lg overflow-hidden border border-gray-200">
       
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-3/4 h-24 bg-white rounded-lg shadow-lg">
       
            <div className="absolute top-4 left-4 right-4 h-16 bg-gray-50 rounded">
            
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="animate-type-line h-2 bg-gray-300 rounded ml-4"
                  style={{
                    width: ['75%', '50%', '66%'][i],
                    marginTop: i === 0 ? '1rem' : '0.75rem',
                    animationDelay: `${i}s`,
                    animationDuration: `${animationDuration}s`,
                  }}
                />
              ))}
            </div>
            
        
            {icons.map((iconData, index) => {
              const IconComponent = iconData.icon;
              return (
                <div
                  key={index}
                  className={`absolute ${positionClasses[iconData.position]} animate-float`}
                  style={{ animationDelay: `${iconData.delay}s` }}
                >
                  <IconComponent className={`w-8 h-8 ${iconData.color}`} />
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3/4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full animate-progress"
                style={{ animationDuration: `${animationDuration - 0.5}s` }}
              />
            </div>
          </div>
        </div>
        
    
        <div className="mt-4 text-center">
          <p className="text-lg font-medium text-gray-700 mb-2">
            {children}
          </p>
          <p className="text-sm text-gray-500 animate-pulse">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};


declare module 'react' {
  interface CSSProperties {
    '--width'?: string;
  }
}

