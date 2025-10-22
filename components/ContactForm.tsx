"use client";

import { useState, FormEvent } from 'react';
import { Button } from './Button';
import { ContactFormData, ContactFormErrors, Language } from '@/types';

interface ContactFormProps {
  lang: Language;
}

const translations = {
  fr: {
    name: 'Nom',
    namePlaceholder: 'Votre nom',
    email: 'Email',
    emailPlaceholder: 'votre@email.com',
    subject: 'Sujet',
    subjectPlaceholder: 'Sujet de votre message',
    message: 'Message',
    messagePlaceholder: 'Votre message...',
    rgpd: "J'accepte que mes données soient utilisées pour répondre à ma demande conformément à la politique de confidentialité.",
    send: 'Envoyer le message',
    sending: 'Envoi en cours...',
    success: 'Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.',
    errors: {
      nameRequired: 'Le nom est requis',
      emailRequired: "L'email est requis",
      emailInvalid: 'Email invalide',
      subjectRequired: 'Le sujet est requis',
      messageRequired: 'Le message est requis',
      rgpdRequired: 'Vous devez accepter la politique de confidentialité',
    }
  },
  en: {
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    subject: 'Subject',
    subjectPlaceholder: 'Subject of your message',
    message: 'Message',
    messagePlaceholder: 'Your message...',
    rgpd: 'I agree that my data will be used to respond to my request in accordance with the privacy policy.',
    send: 'Send message',
    sending: 'Sending...',
    success: 'Message sent successfully! We will reply to you as soon as possible.',
    errors: {
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email',
      subjectRequired: 'Subject is required',
      messageRequired: 'Message is required',
      rgpdRequired: 'You must accept the privacy policy',
    }
  }
};

export function ContactForm({ lang }: ContactFormProps) {
  const t = translations[lang];
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    rgpd: false,
  });
  
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t.errors.nameRequired;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t.errors.emailRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.errors.emailInvalid;
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = t.errors.subjectRequired;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t.errors.messageRequired;
    }
    
    if (!formData.rgpd) {
      newErrors.rgpd = t.errors.rgpdRequired;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // TODO: En production, remplacer par un vrai appel API
    // Exemple :
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });
    //   if (response.ok) {
    //     setIsSuccess(true);
    //     setFormData({ name: '', email: '', subject: '', message: '', rgpd: false });
    //   }
    // } catch (error) {
    //   console.error('Error sending form:', error);
    // }
    
    // Mock delay pour simuler l'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', email: '', subject: '', message: '', rgpd: false });
    }, 3000);
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Effacer l'erreur quand l'utilisateur commence à corriger
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  if (isSuccess) {
    return (
      <div className="glass rounded-lg p-8 text-center">
        <div className="text-brand-orange text-5xl mb-4">✓</div>
        <p className="text-white font-inter text-lg">{t.success}</p>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-inter text-gray-light mb-2">
            {t.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-light focus:ring-2 focus:outline-none ${
              errors.name ? 'ring-2 ring-red-500' : 'focus:ring-brand-orange'
            }`}
            placeholder={t.namePlaceholder}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-inter text-gray-light mb-2">
            {t.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-light focus:ring-2 focus:outline-none ${
              errors.email ? 'ring-2 ring-red-500' : 'focus:ring-brand-orange'
            }`}
            placeholder={t.emailPlaceholder}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-inter text-gray-light mb-2">
          {t.subject}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-light focus:ring-2 focus:outline-none ${
            errors.subject ? 'ring-2 ring-red-500' : 'focus:ring-brand-orange'
          }`}
          placeholder={t.subjectPlaceholder}
          disabled={isSubmitting}
        />
        {errors.subject && (
          <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-inter text-gray-light mb-2">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-light focus:ring-2 focus:outline-none resize-none ${
            errors.message ? 'ring-2 ring-red-500' : 'focus:ring-brand-orange'
          }`}
          placeholder={t.messagePlaceholder}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
      </div>
      
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="rgpd"
          name="rgpd"
          checked={formData.rgpd}
          onChange={handleChange}
          className={`mt-1 w-4 h-4 text-brand-orange bg-transparent border-gray-light rounded focus:ring-brand-orange focus:ring-2 ${
            errors.rgpd ? 'border-red-500' : ''
          }`}
          disabled={isSubmitting}
        />
        <label htmlFor="rgpd" className="text-sm font-inter text-gray-light">
          {t.rgpd}
        </label>
      </div>
      {errors.rgpd && (
        <p className="text-red-500 text-sm -mt-4">{errors.rgpd}</p>
      )}
      
      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? t.sending : t.send}
      </Button>
    </form>
  );
}

