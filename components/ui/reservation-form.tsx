'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Calendar,
  Phone,
  Mail,
  Clock,
  Stethoscope,
  CalendarDays,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { format } from 'date-fns';
import { useRouter, usePathname } from 'next/navigation';

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

const createReservationSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t('reservation.form.nameRequired')),
    regionCode: z.string().min(1, t('reservation.form.regionCodeRequired')),
    phone: z
      .string()
      .min(9, t('reservation.form.phoneRequired'))
      .regex(/^[0-9\s\-()]+$/, t('reservation.form.phoneInvalid')),
    email: z
      .string()
      .min(1, t('reservation.form.emailRequired'))
      .email(t('reservation.form.emailInvalid')),
    message: z.string().optional(),
    preferredTime: z
      .string()
      .min(1, t('reservation.form.preferredTimeRequired')),
    serviceType: z.string().min(1, t('reservation.form.serviceTypeRequired')),
    clinic: z.string().min(1, t('reservation.form.clinicRequired')),
    reservationDate: z.date({
      required_error: t('reservation.form.reservationDateRequired'),
    }),
  });

type ReservationFormData = z.infer<ReturnType<typeof createReservationSchema>>;

interface ReservationFormProps {
  onSuccess?: () => void;
  showCancel?: boolean;
  onCancel?: () => void;
  preselectedClinic?: string;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  onSuccess,
  showCancel = false,
  onCancel,
  preselectedClinic,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'cs';
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reservationSchema = createReservationSchema(t);

  const form = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: '',
      regionCode: '+420',
      phone: '',
      email: '',
      message: '',
      preferredTime: '',
      serviceType: '',
      clinic: preselectedClinic || '',
      reservationDate: undefined,
    },
  });

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    try {
      // Prepare data for Firebase
      const reservationData = {
        name: data.name,
        phone: `${data.regionCode} ${data.phone}`,
        email: data.email,
        message: data.message || '',
        preferredTime: data.preferredTime,
        serviceType: data.serviceType,
        clinic: data.clinic,
        reservationDate: data.reservationDate,
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      // Save to Firebase Firestore
      await addDoc(collection(db, 'reservations'), reservationData);

      // Handle success
      if (onSuccess) {
        onSuccess();
      } else {
        // Navigate to success page
        router.push('/reservation/success');
      }
    } catch (error) {
      console.error('Reservation error:', error);
      alert(t('reservation.form.submitError'));
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

  const regionCodeOptions = [
    { value: '+420', label: '+420 (Czech Republic)', flag: '🇨🇿' },
    { value: '+380', label: '+380 (Ukraine)', flag: '🇺🇦' },
    { value: '+421', label: '+421 (Slovakia)', flag: '🇸🇰' },
    { value: '+43', label: '+43 (Austria)', flag: '🇦🇹' },
    { value: '+49', label: '+49 (Germany)', flag: '🇩🇪' },
    { value: '+48', label: '+48 (Poland)', flag: '🇵🇱' },
    { value: '+36', label: '+36 (Hungary)', flag: '🇭🇺' },
    { value: '+44', label: '+44 (United Kingdom)', flag: '🇬🇧' },
    { value: '+33', label: '+33 (France)', flag: '🇫🇷' },
    { value: '+39', label: '+39 (Italy)', flag: '🇮🇹' },
    { value: '+34', label: '+34 (Spain)', flag: '🇪🇸' },
    { value: '+1', label: '+1 (USA/Canada)', flag: '🇺🇸' },
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

  return (
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
                <div className="flex gap-2">
                  {/* Region Code Select */}
                  <FormField
                    control={form.control}
                    name="regionCode"
                    render={({ field: regionField }) => (
                      <Select
                        onValueChange={regionField.onChange}
                        defaultValue={regionField.value}
                      >
                        <SelectTrigger className="h-12 w-32 border-2 border-gray-200 focus:border-brand-primary rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-xl rounded-lg">
                          {regionCodeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center">
                                <span className="mr-2">{option.flag}</span>
                                {option.value}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {/* Phone Number Input */}
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      {...field}
                      type="tel"
                      placeholder={t('reservation.form.phonePlaceholder')}
                      className="h-12 pl-10 border-2 border-gray-200 focus:border-brand-primary focus:ring-brand-primary rounded-lg"
                    />
                  </div>
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

        {/* Reservation Date Field */}
        <FormField
          control={form.control}
          name="reservationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {t('reservation.form.reservationDate')}*
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="date"
                    {...field}
                    value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                    onChange={(e) => {
                      const dateValue = e.target.value;
                      if (dateValue) {
                        field.onChange(new Date(dateValue));
                      } else {
                        field.onChange(undefined);
                      }
                    }}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className="h-12 pl-10 border-2 border-gray-200 focus:border-brand-primary hover:border-brand-primary rounded-lg transition-colors"
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-brand-primary rounded-lg">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <SelectValue
                        placeholder={t('reservation.timeOptions.noPreference')}
                      />
                    </div>
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white border border-gray-200 shadow-xl rounded-lg">
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <SelectContent className="bg-white border border-gray-200 shadow-xl rounded-lg">
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
              <Select onValueChange={field.onChange} value={field.value}>
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
                <SelectContent className="bg-white border border-gray-200 shadow-xl rounded-lg">
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
                {t('reservation.form.message')}
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
            {t('reservation.privacyNotice.notice')}{' '}
            <a
              href={`/${locale}/privacy`}
              className="text-brand-primary underline hover:text-brand-secondary transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('reservation.privacyNotice.policyLink')}
            </a>
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          {showCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {t('reservation.form.cancel')}
            </Button>
          )}
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
        </div>
      </form>
    </Form>
  );
};

export { ReservationForm };
