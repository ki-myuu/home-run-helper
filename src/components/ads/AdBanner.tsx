import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

export const AdBanner = ({ slot, format = 'auto', className = '' }: AdBannerProps) => {
  const adRef = useRef<HTMLModElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;
    
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
        isLoaded.current = true;
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  const getFormatStyle = () => {
    switch (format) {
      case 'rectangle':
        return { display: 'inline-block', width: '300px', height: '250px' };
      case 'horizontal':
        return { display: 'block', width: '100%', height: '90px' };
      case 'vertical':
        return { display: 'inline-block', width: '160px', height: '600px' };
      default:
        return { display: 'block' };
    }
  };

  // In development, show placeholder
  const isDev = import.meta.env.DEV;

  if (isDev) {
    return (
      <div 
        className={`bg-muted/50 border border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground text-sm ${className}`}
        style={{ 
          minHeight: format === 'rectangle' ? '250px' : '90px',
          width: format === 'rectangle' ? '300px' : '100%'
        }}
      >
        광고 영역 (AdSense)
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={getFormatStyle()}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format === 'auto' ? 'auto' : undefined}
        data-full-width-responsive={format === 'auto' ? 'true' : undefined}
      />
    </div>
  );
};
