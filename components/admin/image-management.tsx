'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
  getMetadata,
} from 'firebase/storage';
import { storage } from '../../firebase';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '../ui/use-toast';
import {
  Copy,
  Trash2,
  RefreshCw,
  Image as ImageIcon,
  FileText,
  Calendar,
  HardDrive,
} from 'lucide-react';

interface ImageFile {
  name: string;
  url: string;
  size?: number;
  uploadDate?: Date;
}

interface ImageManagementProps {
  newsId: string;
  onImageUploaded?: number;
}

const ImageManagement: React.FC<ImageManagementProps> = ({
  newsId,
  onImageUploaded,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingImage, setDeletingImage] = useState<string | null>(null);

  const loadImages = async () => {
    if (!newsId) return;

    setIsLoading(true);
    try {
      const folderRef = ref(storage, `news-images/${newsId}`);
      const result = await listAll(folderRef);

      const imagePromises = result.items.map(async (item) => {
        const url = await getDownloadURL(item);
        const metadata = await getMetadata(item);

        return {
          name: item.name,
          url,
          size: metadata.size,
          uploadDate: new Date(metadata.timeCreated),
        };
      });

      const imageFiles = await Promise.all(imagePromises);
      setImages(imageFiles);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, [newsId]);

  // Listen for image upload events
  useEffect(() => {
    if (onImageUploaded && onImageUploaded > 0) {
      loadImages();
    }
  }, [onImageUploaded]);

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: t('admin.news.form.urlCopied'),
        variant: 'success',
      });
    } catch (error) {
      console.error('Error copying URL:', error);
      toast({
        title: 'Error',
        description: 'Failed to copy URL to clipboard',
        variant: 'destructive',
      });
    }
  };

  const handleCopyMarkdown = async (url: string, name: string) => {
    try {
      const markdown = `![${name}](${url})`;
      await navigator.clipboard.writeText(markdown);
      toast({
        title: t('admin.news.form.markdownCopied'),
        variant: 'success',
      });
    } catch (error) {
      console.error('Error copying markdown:', error);
      toast({
        title: 'Error',
        description: 'Failed to copy markdown to clipboard',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteImage = async (imageName: string) => {
    if (!confirm(t('admin.news.form.deleteImageConfirm'))) return;

    setDeletingImage(imageName);
    try {
      const imageRef = ref(storage, `news-images/${newsId}/${imageName}`);
      await deleteObject(imageRef);

      // Remove from local state
      setImages((prev) => prev.filter((img) => img.name !== imageName));
      toast({
        title: t('admin.news.form.imageDeleted'),
        variant: 'success',
      });
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDeletingImage(null);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'Unknown';
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <Card className="border-brand-light/30 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5">
        <CardTitle className="text-brand-primary flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          {t('admin.news.form.imageManagement')}
        </CardTitle>
        <p className="text-sm text-brand-text">
          {t('admin.news.form.imageManagementDescription')}
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {t('admin.news.form.uploadedImages')}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={loadImages}
            disabled={isLoading}
            className="border-brand-light hover:bg-brand-light/20"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`}
            />
            {t('admin.news.form.refreshImages')}
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 animate-spin text-brand-primary mx-auto mb-2" />
            <p className="text-brand-text">
              {t('admin.news.form.loadingImages')}
            </p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-8">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-brand-text">
              {t('admin.news.form.noImagesUploaded')}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {images.map((image) => (
              <div
                key={image.name}
                className="border border-brand-light/30 rounded-lg p-4 hover:border-brand-primary/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Image Preview */}
                  <div className="flex-shrink-0">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-20 h-20 object-cover rounded-lg border border-brand-light/30"
                    />
                  </div>

                  {/* Image Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-brand-primary" />
                      <h4 className="font-medium text-gray-900 truncate">
                        {image.name}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-brand-text">
                      <div className="flex items-center gap-1">
                        <HardDrive className="w-3 h-3" />
                        <span>{formatFileSize(image.size)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(image.uploadDate)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyUrl(image.url)}
                        className="border-brand-light hover:bg-brand-light/20"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        {t('admin.news.form.copyUrl')}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleCopyMarkdown(image.url, image.name)
                        }
                        className="border-brand-light hover:bg-brand-light/20"
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        {t('admin.news.form.copyMarkdown')}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteImage(image.name)}
                        disabled={deletingImage === image.name}
                        className="border-red-300 hover:bg-red-50 text-red-600 hover:text-red-700"
                      >
                        {deletingImage === image.name ? (
                          <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                        ) : (
                          <Trash2 className="w-3 h-3 mr-1" />
                        )}
                        {deletingImage === image.name
                          ? t('admin.news.form.deletingImage')
                          : t('admin.news.form.deleteImage')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageManagement;
