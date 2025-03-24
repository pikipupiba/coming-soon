'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { siteConfig } from '@/lib/config';
import { popIn } from '@/lib/animations';
import { useUIStore } from '@/store/uiStore';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import FormTextarea from '@/components/ui/FormTextarea';

// Define form schema with Zod for validation
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().optional(),
});

// Submit button component that auto-displays pending state
function SubmitButton() {
  // React 19: useFormStatus provides form submission status
  const { pending } = useFormStatus();
  
  return (
    <Button
      type="submit"
      variant="primary"
      fullWidth
      isLoading={pending}
    >
      Notify Me
    </Button>
  );
}

const ContactForm = () => {
  const isContactFormOpen = useUIStore((state) => state.isContactFormOpen);
  const toggleContactForm = useUIStore((state) => state.toggleContactForm);
  
  // Define form state type with type guards
  type FormState = 
    | { success: true; error?: undefined; message?: undefined }
    | { success?: undefined; error: true; message: string };
    
  // Type guard functions
  const isSuccess = (state: FormState): state is { success: true } => {
    return 'success' in state && state.success === true;
  };
  
  const isError = (state: FormState): state is { error: true; message: string } => {
    return 'error' in state && state.error === true;
  };

  // React 19: useActionState for form state management
  // Returns [state, formAction, isPending]
  const [formState, formAction] = useActionState<FormState, FormData>(
    async (state: FormState, formData: FormData) => {
      // Validate with Zod
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const message = formData.get('message') as string;
      
      const result = formSchema.safeParse({ name, email, message });
      if (!result.success) {
        return { error: true, message: 'Please check form fields' };
      }
      
      try {
        // In a real implementation, you would use EmailJS or a Server Action
        // For this demo, we'll simulate a successful API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Form submitted:', { name, email, message });
        
        // Close the form after a delay
        setTimeout(() => {
          toggleContactForm(false);
        }, 2000);
        
        return { success: true };
      } catch (error) {
        console.error('Form submission error:', error);
        return { error: true, message: 'Failed to send. Please try again.' };
      }
    },
    { error: true, message: '' } as FormState // Initial state (properly typed)
  );
  
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
            
            {/* Title tag example - React 19 document metadata */}
            <title>Get Notified | {siteConfig.company.name}</title>
          </div>
          
          {formState.success ? (
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
            // React 19: Using action instead of onSubmit
            <form action={formAction} className="space-y-4">
              {formState.error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
                  {formState.message}
                </div>
              )}
              
              <FormInput
                label="Name"
                id="name"
                name="name" 
                required
                minLength={2}
                placeholder="Your name"
              />
              
              <FormInput
                label="Email"
                id="email"
                name="email"
                type="email"
                required
                placeholder="your.email@example.com"
              />
              
              <FormTextarea
                label="Message (Optional)"
                id="message"
                name="message"
                placeholder="Tell us what you're looking for in an event production platform..."
                rows={3}
              />
              
              <div className="mt-6">
                <SubmitButton />
              </div>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
