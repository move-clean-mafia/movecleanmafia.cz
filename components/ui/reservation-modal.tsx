'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, Phone, Mail, Clock, Stethoscope } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { Input } from './input';
import { Textarea } from './textarea';
import { Button } from './button';

interface ReservationModalProps {
  children: React.ReactNode;
}

const createReservationSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t('reservation.form.nameRequired')),
    phone: z
      .string()
      .min(9, t('reservation.form.phoneRequired'))
      .regex(/^[+]?[0-9\s\-()]+$/, t('reservation.form.phoneInvalid')),
    email: z
      .string()
      .min(1, t('reservation.form.emailRequired'))
      .email(t('reservation.form.emailInvalid')),
    message: z.string().min(10, t('reservation.form.messageRequired')),
    preferredTime: z
      .string()
      .min(1, t('reservation.form.preferredTimeRequired')),
    serviceType: z.string().min(1, t('reservation.form.serviceTypeRequired')),
    clinic: z.string().min(1, t('reservation.form.clinicRequired')),
  });

type ReservationFormData = z.infer<ReturnType<typeof createReservationSchema>>;

const ReservationModal: React.FC<ReservationModalProps> = ({ children }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const reservationSchema = createReservationSchema(t);

  const form = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
      preferredTime: '',
      serviceType: '',
      clinic: '',
    },
  });

  const onSubmit = async (_data: ReservationFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true);
      form.reset();
      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Reservation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeOptions = [
    {
      value: 'no-preference',
      label: t('reservation.timeOptions.noPreference'),
    },
    { value: 'morning', label: t('reservation.timeOptions.morning') },
    { value: 'afternoon', label: t('reservation.timeOptions.afternoon') },
    { value: 'evening', label: t('reservation.timeOptions.evening') },
  ];

  const serviceOptions = [
    { value: 'consultation', label: t('reservation.services.consultation') },
    { value: 'examination', label: t('reservation.services.examination') },
    { value: 'follow-up', label: t('reservation.services.followUp') },
    { value: 'spirometry', label: t('reservation.services.spirometry') },
    { value: 'bronchoscopy', label: t('reservation.services.bronchoscopy') },
    {
      value: 'allergy-testing',
      label: t('reservation.services.allergyTesting'),
    },
    { value: 'urgent', label: t('reservation.services.urgent') },
  ];

  const clinicOptions = [
    { value: 'main', label: t('reservation.clinics.main') },
    { value: 'branch', label: t('reservation.clinics.branch') },
  ];

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white border-0 shadow-2xl">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
              {t('reservation.success.title')}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {t('reservation.success.message')}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white border-0 shadow-2xl">
        {/* Header with brand gradient */}
        <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6 -m-6 mb-6 rounded-t-lg">
          <DialogHeader className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-white">
              {t('reservation.title')}
            </DialogTitle>
            <DialogDescription className="text-white/90 mt-2">
              {t('reservation.description')}
            </DialogDescription>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    {t('reservation.form.name')}*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('reservation.form.namePlaceholder')}
                      className="h-12 border-2 border-gray-200 focus:border-brand-primary focus:ring-brand-primary rounded-lg"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    {t('reservation.form.phone')}*
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        {...field}
                        type="tel"
                        placeholder={t('reservation.form.phonePlaceholder')}
                        className="h-12 pl-10 border-2 border-gray-200 focus:border-brand-primary focus:ring-brand-primary rounded-lg"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    {t('reservation.form.email')}*
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        {...field}
                        type="email"
                        placeholder={t('reservation.form.emailPlaceholder')}
                        className="h-12 pl-10 border-2 border-gray-200 focus:border-brand-primary focus:ring-brand-primary rounded-lg"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Preferred Time Field */}
            <FormField
              control={form.control}
              name="preferredTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    {t('reservation.form.preferredTime')}*
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-brand-primary rounded-lg">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <SelectValue
                            placeholder={t(
                              'reservation.timeOptions.noPreference',
                            )}
                          />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      {timeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Service Type Field */}
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    {t('reservation.form.serviceType')}*
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-brand-primary rounded-lg">
                        <div className="flex items-center">
                          <Stethoscope className="w-4 h-4 text-gray-400 mr-2" />
                          <SelectValue
                            placeholder={t('reservation.services.consultation')}
                          />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      {serviceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Clinic Field */}
            <FormField
              control={form.control}
              name="clinic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    {t('reservation.form.clinic')}*
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-brand-primary rounded-lg">
                        <div className="flex items-center">
                          <Stethoscope className="w-4 h-4 text-gray-400 mr-2" />
                          <SelectValue
                            placeholder={t('reservation.clinics.main')}
                          />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      {clinicOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Message Field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    {t('reservation.form.message')}*
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t('reservation.form.messagePlaceholder')}
                      className="min-h-[100px] border-2 border-gray-200 focus:border-brand-primary focus:ring-brand-primary rounded-lg resize-none"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Privacy Notice */}
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p>
                {t('reservation.privacy.notice')}{' '}
                <span className="text-brand-primary underline cursor-pointer">
                  {t('reservation.privacy.policyLink')}
                </span>
              </p>
            </div>

            {/* Form Actions */}
            <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {t('reservation.form.cancel')}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white font-semibold h-12 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    {t('reservation.form.submitting')}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {t('reservation.form.submit')}
                  </div>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { ReservationModal };
