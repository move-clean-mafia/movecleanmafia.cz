'use client';

import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { CallToAction } from '../../../components/ui';

interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  title: string;
  description: string;
}

interface PhotogalleryClientProps {
  translations: {
    title: string;
    description: string;
    mainClinic: string;
    branchOffice: string;
    teamExperts: string;
    wantToVisit: string;
    visitDescription: string;
  };
}

// Mock data for the gallery
const mockPhotos: Record<string, PhotoItem[]> = {
  mainClinic: [
    {
      id: '1',
      src: 'https://picsum.photos/800/600?random=1',
      alt: 'Main clinic exterior',
      category: 'exterior',
      title: 'Main Clinic Building',
      description: 'Modern medical facility exterior',
    },
    {
      id: '2',
      src: 'https://picsum.photos/600/800?random=2',
      alt: 'Reception area',
      category: 'interior',
      title: 'Reception Area',
      description: 'Welcoming reception and waiting area',
    },
    {
      id: '3',
      src: 'https://picsum.photos/800/500?random=3',
      alt: 'Examination room',
      category: 'interior',
      title: 'Examination Room',
      description: 'Modern examination facilities',
    },
    {
      id: '4',
      src: 'https://picsum.photos/600/400?random=4',
      alt: 'Spirometry equipment',
      category: 'equipment',
      title: 'Spirometry Equipment',
      description: 'Advanced lung function testing',
    },
    {
      id: '5',
      src: 'https://picsum.photos/800/600?random=5',
      alt: 'Diagnostic equipment',
      category: 'equipment',
      title: 'Diagnostic Equipment',
      description: 'State-of-the-art diagnostic tools',
    },
    {
      id: '6',
      src: 'https://picsum.photos/600/600?random=6',
      alt: 'Medical certificates',
      category: 'certificates',
      title: 'Medical Certificates',
      description: 'Professional certifications and awards',
    },
  ],
  branchOffice: [
    {
      id: '7',
      src: 'https://picsum.photos/800/600?random=7',
      alt: 'Branch office exterior',
      category: 'exterior',
      title: 'Branch Office Building',
      description: 'Central branch office location',
    },
    {
      id: '8',
      src: 'https://picsum.photos/600/800?random=8',
      alt: 'Branch waiting area',
      category: 'interior',
      title: 'Waiting Area',
      description: 'Comfortable waiting space',
    },
    {
      id: '9',
      src: 'https://picsum.photos/800/500?random=9',
      alt: 'Consultation room',
      category: 'interior',
      title: 'Consultation Room',
      description: 'Private consultation space',
    },
    {
      id: '10',
      src: 'https://picsum.photos/600/400?random=10',
      alt: 'Medical equipment',
      category: 'equipment',
      title: 'Medical Equipment',
      description: 'Professional medical instruments',
    },
  ],
  personal: [
    {
      id: '11',
      src: 'https://picsum.photos/600/400?random=11',
      alt: 'Medical team',
      category: 'team',
      title: 'Medical Team',
      description: 'Our dedicated medical professionals',
    },
    {
      id: '12',
      src: 'https://picsum.photos/800/600?random=12',
      alt: 'Doctor consultation',
      category: 'team',
      title: 'Doctor Consultation',
      description: 'Professional medical consultation',
    },
    {
      id: '13',
      src: 'https://picsum.photos/600/800?random=13',
      alt: 'Medical staff',
      category: 'team',
      title: 'Medical Staff',
      description: 'Experienced healthcare professionals',
    },
    {
      id: '14',
      src: 'https://picsum.photos/800/500?random=14',
      alt: 'Patient care',
      category: 'team',
      title: 'Patient Care',
      description: 'Compassionate patient care',
    },
  ],
};

export const PhotogalleryClient: React.FC<PhotogalleryClientProps> = ({
  translations,
}) => {
  const [activeTab, setActiveTab] = useState<string>('mainClinic');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const tabs = [
    { id: 'mainClinic', label: translations.mainClinic },
    { id: 'branchOffice', label: translations.branchOffice },
    { id: 'personal', label: translations.teamExperts },
  ];

  const currentPhotos = mockPhotos[activeTab] || [];

  const handlePhotoClick = (photo: PhotoItem) => {
    setSelectedPhoto(photo);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return;

    const currentIndex = currentPhotos.findIndex(
      (p) => p.id === selectedPhoto.id,
    );
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentPhotos.length - 1;
    } else {
      newIndex = currentIndex < currentPhotos.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedPhoto(currentPhotos[newIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') navigatePhoto('prev');
    if (e.key === 'ArrowRight') navigatePhoto('next');
    if (e.key === 'Escape') handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-brand-light to-brand-primary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
            {translations.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {translations.description}
          </p>
          <div className="w-48 h-2 mx-auto rounded-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary"></div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-xl">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-brand-primary hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => handlePhotoClick(photo)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {photo.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{photo.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <section className="relative">
          <CallToAction
            title={translations.wantToVisit}
            description={translations.visitDescription}
          />
        </section>
      </div>

      {/* Image Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          className="max-w-7xl w-full max-h-[95vh] p-0 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-brand-primary/20 "
          onKeyDown={handleKeyDown}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedPhoto?.title || 'Image Gallery'}</DialogTitle>
          </DialogHeader>

          {selectedPhoto && (
            <div className="relative h-full">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 bg-brand-primary/20 hover:bg-brand-primary/30 text-white rounded-full w-12 h-12 backdrop-blur-sm transition-all duration-200 hover:scale-110"
                onClick={handleCloseModal}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Image Container */}
              <div className="relative h-[80vh] flex items-center justify-center p-8">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                  />
                </div>

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-brand-primary/20 hover:bg-brand-primary/40 text-white rounded-full w-16 h-16 backdrop-blur-sm transition-all duration-200 hover:scale-110 shadow-lg"
                  onClick={() => navigatePhoto('prev')}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-brand-primary/20 hover:bg-brand-primary/40 text-white rounded-full w-16 h-16 backdrop-blur-sm transition-all duration-200 hover:scale-110 shadow-lg"
                  onClick={() => navigatePhoto('next')}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </div>

              {/* Image Info Panel */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-primary/95 via-brand-primary/70 to-transparent p-8 text-white">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">
                    {selectedPhoto.title}
                  </h2>
                  <p className="text-lg text-gray-100 mb-6 drop-shadow-md">
                    {selectedPhoto.description}
                  </p>

                  {/* Navigation Dots */}
                  <div className="flex justify-center space-x-3">
                    {currentPhotos.map((photo, index) => (
                      <button
                        key={photo.id}
                        onClick={() => setSelectedPhoto(photo)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          photo.id === selectedPhoto.id
                            ? 'bg-white scale-125 shadow-lg'
                            : 'bg-white/50 hover:bg-white/80 hover:scale-110'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Photo Counter */}
                  <div className="text-center mt-4 text-sm text-gray-200">
                    {currentPhotos.findIndex((p) => p.id === selectedPhoto.id) +
                      1}{' '}
                    / {currentPhotos.length}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
