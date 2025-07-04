'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../../firebase';
import { useToast } from '../../../../../components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const CreateNewsPage: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(true);
  const hasCreatedRef = useRef(false);

  useEffect(() => {
    const createBlankArticle = async () => {
      // Prevent multiple creations
      if (hasCreatedRef.current) return;

      try {
        setIsCreating(true);
        hasCreatedRef.current = true;

        // Create a blank article with minimal data
        const docRef = await addDoc(collection(db, 'news'), {
          title: '',
          perex: '',
          content: '',
          mainImage: '',
          published: false,
          publishedAt: new Date(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        // Navigate to edit page with the new article ID
        router.push(`/admin/news/edit/${docRef.id}`);
      } catch (error) {
        console.error('Error creating blank article:', error);
        toast({
          title: 'Error',
          description: 'Failed to create new article. Please try again.',
          variant: 'destructive',
        });
        router.push('/admin');
      } finally {
        setIsCreating(false);
      }
    };

    createBlankArticle();
  }, [router, toast]);

  if (isCreating) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-primary mx-auto mb-4" />
          <p className="text-brand-text">Creating new article...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default CreateNewsPage;
