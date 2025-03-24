'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { siteConfig } from '@/lib/config';
import { popIn } from '@/lib/animations';
import { useUIStore } from '@/store/uiStore';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import FormTextarea from '@/components/ui/FormTextarea';

// Define form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().optional(),
});

// Infer TypeScript type from the schema
type ContactFormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const isContactFormOpen = useUIStore((state) => state.isContactFormOpen);
  const toggleContactForm = useUIStore((state) => state.toggleContactForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });
  
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, you would use EmailJS or a Server Action
      // For this demo, we'll simulate a successful API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', data);
      setSubmitSuccess(true);
      reset();
      
      // Close the form after a delay
      setTimeout(() => {
        toggleContactForm(false);
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isContactFormOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <AnimatePresence>
        <motion.div
          variants={popIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white dark:bg-black rounded-lg shadow-md w-full max-w-md p-6 relative"
        >
          {/* Close button */}
          <button
            onClick={() => toggleContactForm(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Form heading */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-owners font-bold mb-2">Get Notified When We Launch</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Be the first to know when our platform goes live
            </p>
          </div>
          
          {submitSuccess ? (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-primary mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Thanks for subscribing!</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We'll notify you as soon as we launch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                label="Name"
                id="name"
                {...register('name')}
                error={errors.name?.message}
                placeholder="Your name"
              />
              
              <FormInput
                label="Email"
                id="email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
                placeholder="your.email@example.com"
              />
              
              <FormTextarea
                label="Message (Optional)"
                id="message"
                {...register('message')}
                error={errors.message?.message}
                placeholder="Tell us what you're looking for in an event production platform..."
                rows={3}
              />
              
              <div className="mt-6">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isSubmitting}
                >
                  Notify Me
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
