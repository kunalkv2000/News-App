import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
    const form = useRef();
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const sendEmail = async (e) => {
        e.preventDefault();

        setIsSending(true);

        try {
            await emailjs.sendForm('service_nyvjgub', 'template_txj15zw', form.current, {
                publicKey: 'TNCGnFnQPwvyhbdRn',
            });
            setIsSent(true);
            form.current.reset(); // Reset the form fields
        } catch (error) {
            console.log('FAILED...', error.text);
        } finally {
            setIsSending(false);
        }
        
    };

    return (
        <div>
            <section class="relative max-w-7xl mx-auto px-4 py-16">

            <div class="text-center mb-12">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Get in <span class="text-red-600">Touch</span> with us.
                </h1>
                <div class="w-60 h-1 bg-red-600 mx-auto mb-6"></div>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                We're here to help you begin your creative journey. Fill out the form below and our team will get back to you shortly.
                </p>
            </div>

            <div class="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div class="md:flex">
                <div class="md:w-1/3 bg-gradient-to-br from-red-600 to-red-800 p-10 text-white flex flex-col justify-between">
                    <div>
                    <h2 class="text-2xl font-bold mb-4">Why Enquire With Us?</h2>
                    <ul class="space-y-4">
                        <li class="flex items-start">
                        <svg class="h-6 w-6 text-red-200 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Expert guidance from industry professionals</span>
                        </li>
                        <li class="flex items-start">
                        <svg class="h-6 w-6 text-red-200 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Personalized course recommendations</span>
                        </li>
                        <li class="flex items-start">
                        <svg class="h-6 w-6 text-red-200 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Flexible learning options</span>
                        </li>
                        <li class="flex items-start">
                        <svg class="h-6 w-6 text-red-200 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Quick response to all enquiries</span>
                        </li>
                    </ul>
                    </div>
                    <div class="mt-8">
                    <h3 class="text-lg font-semibold mb-2">Need immediate assistance?</h3>
                    <p class="text-red-100 mb-2">Call us at +91 7307xxxxxx</p>
                    </div>
                </div>

                <div class="md:w-2/3 p-10">
                    <form class="space-y-6" ref={form} onSubmit={sendEmail} >
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" name="from_name" placeholder="John Doe" class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" required autoFocus />
                        </div>

                        <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" name="from_email" placeholder="john@example.com" class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" required />
                        </div>
                        
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                        <textarea name="message" rows="4" placeholder="Tell us about your interests and goals..." class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" required></textarea>
                    </div>

                    <div>
                        <button type="submit" class="w-full py-3 px-6 bg-red-600 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 transition duration-300" className={`form-submit ${isSent ? 'Submit Enquiry' : ''}`} disabled={isSending}>
                        {isSending ? 'Submitting..' : isSent ? 'Sent!' : 'Submit Enquiry'}
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            </section>
        </div>
    );
}

export default Contact;
