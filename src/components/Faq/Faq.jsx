import React, { useState } from 'react';

const faqs = [
    {
        question: "What is VehiConnect?",
        answer: "VehiConnect is a vehicle parking tag designed to enhance vehicle security and privacy. It allows you to connect with your vehicle even when it is parked, ensuring that your contact details remain private while providing a means for anyone with a smartphone to reach out to you regarding any issues with your parked vehicle."
    },
    {
        question: "How does VehiConnect work?",
        answer: "VehiConnect works by using a QR code on the parking tag that can be scanned by anyone who needs to contact you about your vehicle. The service provides masked calls and SMS notifications, keeping your contact details private while allowing communication in case of issues or emergencies."
    },
    {
        question: "What features does the VehiConnect parking tag offer?",
        answer: "The VehiConnect parking tag offers several key features: Private Contacts to keep your details confidential, Call Masking to hide your phone number, one-year Validity with upgrade options, and Emergency Calls with added emergency contacts."
    },
    {
        question: "Is VehiConnect available for both cars and bikes?",
        answer: "Yes, VehiConnect is suitable for both cars and bikes. The parking tag is designed to provide the same level of privacy and security for all types of vehicles."
    },
    {
        question: "How can I purchase VehiConnect?",
        answer: "You can purchase the VehiConnect parking tag by visiting our online shop. Go to the 'Shop' section on our website, select the tag, and proceed with the purchase. Immediate purchase options are available with one-time validity."
    },
    {
        question: "What makes VehiConnect different from other vehicle security solutions?",
        answer: "VehiConnect stands out due to its focus on privacy and ease of use. Key differentiators include high-quality, waterproof, and durable tags, a focus on privacy, active user feedback implementation, and dedicated top-notch support."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto my-6 p-4">
            <h1 className="text-3xl font-bold mb-7 text-center">FAQ</h1>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white p-7 rounded-lg  border border-faqBorder">
                        <button
                            className="w-full text-left font-semibold text-lg flex justify-between items-center"
                            onClick={() => handleToggle(index)}
                        >
                            {faq.question}
                            <svg
                                className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openIndex === index && (
                            <p className="mt-2 text-gray-700">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
