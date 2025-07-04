'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../../../firebase';
import NewsForm, {
  NewsFormData,
} from '../../../../../../components/admin/news-form';
import { NewsItem } from '../../../../../../lib/admin-utils';
import { useToast } from '../../../../../../components/ui/use-toast';

const EditNewsPage: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const newsId = params?.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [newsData, setNewsData] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      if (!newsId) return;

      try {
        setIsFetching(true);
        const newsDoc = await getDoc(doc(db, 'news', newsId));

        if (!newsDoc.exists()) {
          toast({
            title: 'Error',
            description: 'News article not found',
            variant: 'destructive',
          });
          router.push('/admin');
          return;
        }

        const data = { id: newsDoc.id, ...newsDoc.data() } as NewsItem;
        setNewsData(data);
      } catch (error) {
        console.error('Error fetching news:', error);
        toast({
          title: 'Error',
          description: 'Failed to load news article',
          variant: 'destructive',
        });
        router.push('/admin');
      } finally {
        setIsFetching(false);
      }
    };

    fetchNewsData();
  }, [newsId, router, toast]);

  const handleSubmit = async (data: NewsFormData, content: string) => {
    if (!newsId) return;
    setIsLoading(true);
    try {
      const publishedAtDate = new Date(data.publishedAt);
      await updateDoc(doc(db, 'news', newsId), {
        title: data.title,
        perex: data.perex,
        content,
        mainImage: data.mainImage,
        published: data.published,
        publishedAt: publishedAtDate,
        updatedAt: serverTimestamp(),
      });
      router.push('/admin');
    } catch (error) {
      console.error('Error updating news:', error);
      toast({
        title: 'Error',
        description: 'Failed to update news article. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NewsForm
      newsId={newsId}
      initialData={newsData}
      onSubmit={handleSubmit}
      onBack={() => router.push('/admin')}
      isLoading={isLoading}
      isFetching={isFetching}
    />
  );
};

export default EditNewsPage;
