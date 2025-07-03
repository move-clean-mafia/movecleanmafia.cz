'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../../../firebase';
import { Button } from '../../../../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../../components/ui/card';
import { Input } from '../../../../../components/ui/input';
import { Label } from '../../../../../components/ui/label';
import { Textarea } from '../../../../../components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../../components/ui/form';
import { ArrowLeft, Upload, Image as ImageIcon, Save } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import ImageManagement from '../../../../../components/admin/image-management';
import { useToast } from '../../../../../components/ui/use-toast';

const newsSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  perex: z.string().min(1, 'Perex is required').max(300, 'Perex is too long'),
  content: z.string().min(1, 'Content is required'),
  mainImage: z.string().min(1, 'Main image is required'),
  published: z.boolean(),
  publishedAt: z.string().min(1, 'Published date is required'),
});

type NewsFormData = z.infer<typeof newsSchema>;

const CreateNewsPage: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [content, setContent] = useState('');
  const [newsId] = useState(
    () => `news_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  );
  const [imageUploadTrigger, setImageUploadTrigger] = useState(0);

  const form = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: '',
      perex: '',
      content: '',
      mainImage: '',
      published: false,
      publishedAt: new Date().toISOString().split('T')[0],
    },
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Image size must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Firebase Storage
    setUploadingImage(true);
    try {
      const timestamp = Date.now();
      const imageRef = ref(
        storage,
        `news-images/${newsId}/${timestamp}-${file.name}`,
      );
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);

      form.setValue('mainImage', downloadURL);
      setUploadingImage(false);
      setImageUploadTrigger((prev) => prev + 1);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image. Please try again.',
        variant: 'destructive',
      });
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data: NewsFormData) => {
    setIsLoading(true);
    try {
      const publishedAtDate = new Date(data.publishedAt);

      await addDoc(collection(db, 'news'), {
        id: newsId,
        title: data.title,
        perex: data.perex,
        content: content,
        mainImage: data.mainImage,
        published: data.published,
        publishedAt: publishedAtDate,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      router.push('/admin');
    } catch (error) {
      console.error('Error creating news:', error);
      toast({
        title: 'Error',
        description: 'Failed to create news article. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/admin');
  };

  // Handle content change and update form
  const handleContentChange = (value?: string) => {
    const newContent = value || '';
    setContent(newContent);
    form.setValue('content', newContent);
  };

  // Handle image upload for MD editor
  const handleMdImageUpload = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        reject(new Error('Please select an image file'));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        reject(new Error('Image size must be less than 5MB'));
        return;
      }

      // Upload to Firebase Storage
      const timestamp = Date.now();
      const imageRef = ref(
        storage,
        `news-images/${newsId}/${timestamp}-${file.name}`,
      );

      uploadBytes(imageRef, file)
        .then(() => getDownloadURL(imageRef))
        .then((downloadURL) => {
          setImageUploadTrigger((prev) => prev + 1);
          resolve(downloadURL);
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          reject(new Error('Failed to upload image. Please try again.'));
        });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-brand-light to-brand-primary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={handleBack}
            className="mb-4 hover:bg-brand-light/20 border-brand-light"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('admin.news.backToNews')}
          </Button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {t('admin.news.createArticle')}
              </h1>
              <p className="text-lg text-brand-text">
                {t('admin.news.createDescription')}
              </p>
            </div>
          </div>

          <div className="w-32 h-1 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Main Image Upload */}
            <Card className="border-brand-light/30 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5">
                <CardTitle className="text-brand-primary">
                  {t('admin.news.form.mainImage')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <FormField
                  control={form.control}
                  name="mainImage"
                  render={({ field: _field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-4">
                          <div className="border-2 border-dashed border-brand-light/50 rounded-lg p-8 text-center hover:border-brand-primary/50 transition-colors">
                            {imagePreview ? (
                              <div className="space-y-4">
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                                />
                                <p className="text-sm text-brand-text">
                                  {t('admin.news.form.imageSelected')}
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <div className="w-16 h-16 bg-brand-light/20 rounded-full flex items-center justify-center mx-auto">
                                  <Upload className="w-8 h-8 text-brand-primary" />
                                </div>
                                <div>
                                  <p className="text-lg font-medium text-gray-900 mb-2">
                                    {t('admin.news.form.uploadMainImage')}
                                  </p>
                                  <p className="text-sm text-brand-text">
                                    {t('admin.news.form.imageRequirements')}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex justify-center">
                            <Label
                              htmlFor="image-upload"
                              className="cursor-pointer"
                            >
                              <div className="inline-flex items-center px-4 py-2 border border-brand-primary text-brand-primary bg-white hover:bg-brand-primary hover:text-white rounded-lg transition-colors">
                                {uploadingImage ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                                    {t('admin.news.form.uploading')}
                                  </>
                                ) : (
                                  <>
                                    <Upload className="w-4 h-4 mr-2" />
                                    {imagePreview
                                      ? t('admin.news.form.changeImage')
                                      : t('admin.news.form.selectImage')}
                                  </>
                                )}
                              </div>
                              <Input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                disabled={uploadingImage}
                              />
                            </Label>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="border-brand-light/30 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5">
                <CardTitle className="text-brand-primary">
                  {t('admin.news.form.basicInformation')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-brand-primary font-medium">
                        {t('admin.news.form.title')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('admin.news.form.titlePlaceholder')}
                          className="border-brand-light/50 focus:border-brand-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="perex"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-brand-primary font-medium">
                        {t('admin.news.form.perex')}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('admin.news.form.perexPlaceholder')}
                          className="border-brand-light/50 focus:border-brand-primary min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Content */}
            <Card className="border-brand-light/30 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5">
                <CardTitle className="text-brand-primary">
                  {t('admin.news.form.articleContent')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field: _field }) => (
                    <FormItem>
                      <FormLabel className="text-brand-primary font-medium">
                        {t('admin.news.form.content')}
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          {/* Image Upload Helper */}
                          <div className="bg-brand-light/10 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <ImageIcon className="w-4 h-4 text-brand-primary" />
                              <span className="text-sm font-medium text-brand-primary">
                                {t('admin.news.form.contentImageUpload')}
                              </span>
                            </div>
                            <p className="text-sm text-brand-text mb-3">
                              {t('admin.news.form.contentImageDescription')}
                            </p>
                            <div className="flex items-center gap-2">
                              <Label
                                htmlFor="content-image-upload"
                                className="cursor-pointer"
                              >
                                <div className="inline-flex items-center px-3 py-1 text-sm border border-brand-primary text-brand-primary bg-white hover:bg-brand-primary hover:text-white rounded-md transition-colors">
                                  <Upload className="w-3 h-3 mr-2" />
                                  {t('admin.news.form.uploadImage')}
                                </div>
                                <Input
                                  id="content-image-upload"
                                  type="file"
                                  accept="image/*"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      try {
                                        const url =
                                          await handleMdImageUpload(file);
                                        // Copy URL to clipboard
                                        await navigator.clipboard.writeText(
                                          `![Image](${url})`,
                                        );
                                        toast({
                                          title: t(
                                            'admin.news.form.imageUploadSuccess',
                                          ),
                                          variant: 'success',
                                        });
                                      } catch (error) {
                                        toast({
                                          title: 'Error',
                                          description:
                                            error instanceof Error
                                              ? error.message
                                              : t(
                                                  'admin.news.form.uploadFailed',
                                                ),
                                          variant: 'destructive',
                                        });
                                      }
                                    }
                                  }}
                                  className="hidden"
                                />
                              </Label>
                            </div>
                          </div>

                          {/* Markdown Editor */}
                          <div className="border border-brand-light/50 rounded-lg overflow-hidden">
                            <MDEditor
                              value={content}
                              onChange={handleContentChange}
                              preview="edit"
                              hideToolbar={false}
                              height={400}
                              data-color-mode="light"
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Image Management */}
            <ImageManagement
              newsId={newsId}
              onImageUploaded={imageUploadTrigger}
            />

            {/* Publishing Options */}
            <Card className="border-brand-light/30 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5">
                <CardTitle className="text-brand-primary">
                  {t('admin.news.form.publishingOptions')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="publishedAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-brand-primary font-medium">
                        {t('admin.news.form.publishedAt')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="border-brand-light/50 focus:border-brand-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-3">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="w-4 h-4 text-brand-primary border-brand-light/50 rounded focus:ring-brand-primary"
                          />
                        </FormControl>
                        <FormLabel className="text-brand-primary font-medium cursor-pointer">
                          {t('admin.news.form.publishNow')}
                        </FormLabel>
                      </div>
                      <p className="text-sm text-brand-text mt-1">
                        {t('admin.news.form.publishDescription')}
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1 sm:flex-none border-brand-light hover:bg-brand-light/20"
              >
                {t('admin.news.form.cancel')}
              </Button>
              <Button
                type="submit"
                disabled={isLoading || uploadingImage}
                className="flex-1 bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t('admin.news.form.creating')}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {t('admin.news.form.createArticle')}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateNewsPage;
