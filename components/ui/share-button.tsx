'use client';

import React from 'react';
import { Button } from './button';
import { Share2 } from 'lucide-react';
import { useToast } from './use-toast';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  text,
  url,
  className,
}) => {
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast({
          title: 'Link copied',
          description: 'Article link has been copied to clipboard',
          variant: 'success',
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: 'Error',
        description: 'Failed to share article',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button variant="outline" className={className} onClick={handleShare}>
      <Share2 className="w-4 h-4 mr-2" />
      Share Article
    </Button>
  );
};

export default ShareButton;
