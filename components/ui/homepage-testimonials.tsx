import React from 'react';
import { Star, Quote, User, Heart } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  service?: string;
  date: string;
}

interface HomepageTestimonialsProps {
  testimonials: Testimonial[];
  title: string;
  subtitle: string;
}

const HomepageTestimonials: React.FC<HomepageTestimonialsProps> = ({
  testimonials,
  title,
  subtitle,
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            {title}
          </h2>
          <p className="text-xl text-brand-text max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, _index) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-brand-light transform hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-8 h-8 text-brand-primary/30" />
                <div className="flex items-center space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.comment}"
              </p>

              {/* Patient Info */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      {testimonial.service && (
                        <p className="text-xs text-brand-text">
                          {testimonial.service}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {testimonial.date}
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute top-4 right-4 opacity-10">
                <Heart className="w-6 h-6 text-brand-primary" />
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-full px-6 py-3 border border-brand-light/50">
            <Heart className="w-5 h-5 text-brand-primary" />
            <span className="text-brand-primary font-medium">
              Trusted by hundreds of satisfied patients
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HomepageTestimonials };
