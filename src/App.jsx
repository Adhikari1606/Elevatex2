import { useState, useEffect } from 'react';

// Utility function to handle scroll lock
const useScrollLock = () => {
  const lockScroll = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = 'var(--scrollbar-width)';
  };

  const unlockScroll = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollBarWidth}px`);
    lockScroll();
    return () => unlockScroll();
  }, []);

  return [lockScroll, unlockScroll];
};

// Feature icons (SVGs)
const CertificateIcon = () => (
  <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6H4V4h16v2zm0 14H4v-2h16v2zm-2-8H6v-2h12v2z" fill="currentColor" />
  </svg>
);
const ToolsIcon = () => (
  <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" fill="currentColor" />
  </svg>
);
const SystemsIcon = () => (
  <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z" fill="currentColor" />
  </svg>
);
const ApplicationsIcon = () => (
  <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" fill="currentColor" />
    <path d="M7 12h2v5H7v-5zm4-3h2v8h-2V9zm4-3h2v11h-2V6z" fill="currentColor" />
  </svg>
);
const ClockIcon = () => (
  <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor" />
    <path d="M12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor" />
  </svg>
);
const CalendarIcon = () => (
  <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20ZM19 7H5V6H19V7Z" fill="currentColor" />
  </svg>
);
const LearningIcon = () => (
  <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 6H3C1.9 6 1 6.9 1 8V16C1 17.1 1.9 18 3 18H21C22.1 18 23 17.1 23 16V8C23 6.9 22.1 6 21 6ZM21 16H3V8H21V16Z" fill="currentColor" />
    <path d="M15 12H9V13H15V12Z" fill="currentColor" />
  </svg>
);
const DownloadIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15L8 11H11V3H13V11H16L12 15Z" fill="currentColor" />
    <path d="M20 18H4V11H6V16H18V11H20V18Z" fill="currentColor" />
  </svg>
);

export default function App() {
  // State
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeTab, setActiveTab] = useState('genai');
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [formType, setFormType] = useState('self');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', countryCode: '+91', companyName: '', workExperience: '', course: '',
  });
  const [formStatus, setFormStatus] = useState({ message: '', type: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Country codes
  const countryCodes = [
    { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
    { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States' },
    { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia' },
    { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China' },
    { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan' },
    { code: '+65', country: 'SG', flag: '🇸🇬', name: 'Singapore' },
    { code: '+971', country: 'AE', flag: '🇦🇪', name: 'UAE' },
    { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany' },
    { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France' },
  ];

  // Course content
  const courseContent = {
    genai: {
      title: "GEN AI",
      syllabus: '/syllabuses/genai-syllabus.pdf',
      lessons: [
        { title: "Introduction to Generative AI", duration: "2 Hours", subtopic: ["Understanding Generative AI", "Types of Generative Models", "Applications and Use Cases"] },
        { title: "Large Language Models and Transformers", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] },
        { title: "Prompt Engineering Fundamentals", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] },
        { title: "Building AI Applications with OpenAI", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] },
        { title: "Fine-tuning and Transfer Learning", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] },
        { title: "AI Agents and Autonomous Systems", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] },
        { title: "Capstone Project: Building an AI Solution", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] }
      ]
    },
    dataeng: {
      title: "DATA ENGINEERING",
      syllabus: '/syllabuses/data-engineering-syllabus.pdf',
      lessons: [
        { title: "Data Pipeline Fundamentals", duration: "2 Hours", subtopic: ["ETL Process Overview", "Data Warehouse Concepts", "Pipeline Architecture"] },
        { title: "ETL Process and Tools", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] },
        { title: "Big Data Processing with Spark", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] },
        { title: "Data Warehousing Solutions", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] },
        { title: "Data Quality and Governance", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] },
        { title: "Real-time Data Processing", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] },
        { title: "Capstone: End-to-End Data Pipeline", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] }
      ]
    },
    spring: {
      title: "SPRING BOOT",
      syllabus: '/syllabuses/spring-boot-syllabus.pdf',
      lessons: [
        { title: "Spring Boot Fundamentals", duration: "2 Hours", subtopic: ["Spring Framework Overview", "Dependency Injection", "Spring Boot Auto-configuration"] },
        { title: "REST API Development", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] },
        { title: "Spring Data JPA", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] },
        { title: "Security and Authentication", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] },
        { title: "Microservices Architecture", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] },
        { title: "Testing Spring Boot Applications", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] },
        { title: "Capstone: Building a Microservice", duration: "2 Hours", subtopic: ["Course Overview", "Learning Objectives", "Hands-on Projects"] }
      ]
    }
  };

  // Initialize scroll lock
  useScrollLock();

  useEffect(() => {
    const targetDate = new Date('2025-07-15').getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      setCountdown({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleLesson = (index) => {
    setExpandedLesson(expandedLesson === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const cleanedValue = value.replace(/[^\d+]/g, '');
    setFormData(prev => ({ ...prev, phone: cleanedValue }));
  };
  const handleCountryCodeChange = (e) => {
    setFormData(prev => ({ ...prev, countryCode: e.target.value, phone: '' }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ message: '', type: null });
    try {
      if (!formData.name || !formData.email || !formData.phone || !formData.course) {
        throw new Error('Please fill in all required fields');
      }
      if (formType === 'company' && !formData.companyName) {
        throw new Error('Please enter company name');
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        throw new Error('Please enter a valid 10-digit phone number');
      }
      const response = await fetch('https://elevatex-email.onrender.com/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: `${formData.countryCode}${formData.phone}`,
          formType,
          timestamp: new Date().toISOString(),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit form. Please try again.');
      }
      setFormStatus({ message: 'Thank you! Our advisor will contact you soon.', type: 'success' });
      setFormData({ name: '', email: '', phone: '', countryCode: '+91', companyName: '', workExperience: '', course: '' });
    } catch (error) {
      setFormStatus({ message: error instanceof Error ? error.message : 'An unexpected error occurred', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSyllabusDownload = () => {
    const syllabusUrl = courseContent[activeTab].syllabus;
    const link = document.createElement('a');
    link.href = syllabusUrl;
    link.download = `${courseContent[activeTab].title.toLowerCase()}-syllabus.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- JSX below (identical to your Welcome component, but as App) ---
  return (
    <>
      <div className="min-h-screen overflow-y-auto max-h-screen">

        {/*section 1*/}
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-2 ">
          {/* Logo Section */}
          {/*<div className="mb-6 bg-black">
            <img 
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=294,fit=crop,q=95/YrD1LZ6Wg3T5P0Oz/logo-of-smart-decision-labs---e1bb1e-2c444e-A8526zRJRWhpXVxw.png" 
              alt="IITM Pravartak" 
              className="h-9"
            />
          </div>
          */}

          <div className=" flex justify-between mx-auto  mx-2 items-center">
            <div className="">
              <img
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=294,fit=crop,q=95/YrD1LZ6Wg3T5P0Oz/logo-of-smart-decision-labs---e1bb1e-2c444e-A8526zRJRWhpXVxw.png"
                alt="SDL ElevateX"
                className="h-16"
              />
            </div>
            <div className="hidden md:flex justify-between items-center gap-16 ">
              <button
                className="transition-colors duration-200 text-gray-700 hover:text-green-600 font-medium focus:outline-none"
                onClick={() => {
                  document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                type="button"
              >
                View Courses
              </button>
              <button
                className="transition-colors duration-200 text-gray-700 hover:text-green-600 font-medium focus:outline-none"
                onClick={() => {
                  // Scroll to footer
                  const footer = document.querySelector('footer');
                  footer?.scrollIntoView({ behavior: 'smooth' });
                }}
                type="button"
              >
                About Us
              </button>
              <button
                className="transition-colors duration-200 text-gray-700 hover:text-green-600 font-medium focus:outline-none"
                onClick={() => {
                  document.getElementById('apply-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                type="button"
              >
                Contact Us
              </button>
            </div>

          </div>
          <div className="border-t border-gray-200 mb-2"></div>
          {/* Main Content */}
          <div className="relative ">
            {/* Text Content */}
            <div className="max-w-2xl ">
              <h1 className="text-4xl font-semibold text-gray-900 mb-4 leading-tight">
                ElevateX Mentorship Program With Industry Experts
              </h1>
              <h2 className="text-xl text-gray-700 mb-2 mr-20">
                Students may participate in on-site visits to our corporate offices for enhanced learning exposure
              </h2>

              {/* Features List */}
              <ul className="space-y-3 mt-2">
                {[
                  'Training By Industry Experts',
                  '1-on-1 Career Mentorship',
                  'Live Capstone Projects',
                  'ElevateX Industry Program Completion Certificate',
                  'Choose among top tech demanding skills',
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <span className="flex-shrink-0 w-5 h-5 bg-green-50 rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className='ml-6 mt-1 mb-5'>
                  <div className='flex mb-1'>
                    <span className="flex-shrink-0 w-5 h-5 bg-green-50 rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="16" r="8" />
                      </svg>
                    </span>
                    <span className="text-gray-700 ml-2">Data engineering & cloud</span>

                    <span className="ml-6 flex-shrink-0 w-5 h-5 bg-green-50 rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="16" r="8" />
                      </svg>
                    </span>
                    <span className="text-gray-700 ml-2">Gen AI LLM Engineering</span>
                  </div>
                  <div className='flex mb-3'>
                    <span className="flex-shrink-0 w-5 h-5 bg-green-50 rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="16" r="8" />
                      </svg>
                    </span>
                    <span className="text-gray-700 ml-2"> Java full stack development</span>
                    </div>
              </div>

              {/* Partnership Section 
              <div className="mb-8">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">In Collaboration With</span>
                  <img 
                    src="https://www.simplilearn.com/ice9/accreditation_images/Category_Logos/Azure_48px.svgz" 
                    alt="Microsoft Azure" 
                    className="h-9"
                  />
                </div>
              </div> 
              */}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#apply-section"
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('apply-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Apply Now
            </a>
            <a
              href="#courses-section"
              className="inline-flex justify-center items-center px-6 py-3 border border-green-600 text-base font-medium rounded-md text-green-600 bg-transparent hover:bg-green-50 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Courses
            </a>
          </div>

            </div>


            {/* Background Shape - Similar to the original design */}
            <div className="absolute top-0 right-0 h-110 w-1/2 bg-green-500 opacity-30 hidden lg:block" style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)' }}>
            </div>
            <div className="absolute top-4 right-4 w-1/2  translate opacity-100 hidden lg:block" style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)' }}>
              <img src="https://videos.openai.com/vg-assets/assets%2Ftask_01jyr3m90qe5ebjkv7bnrck2f2%2F1751008416_img_1.webp?st=2025-06-27T05%3A34%3A56Z&se=2025-07-03T06%3A34%3A56Z&sks=b&skt=2025-06-27T05%3A34%3A56Z&ske=2025-07-03T06%3A34%3A56Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=sW39GyajSGg5oMEWgCLiHrj3VtXTsdsdZKwo2QBRlW8%3D&az=oaivgprodscus" alt="image" className="" />
            </div>
          </div>
         
        </div>


        {/*section 2*/}
        <div className="max-w-full mx-auto bg-gray-50 mt-6 ">
          <div className=" max-w-7xl mx-auto px-28 grid grid-cols-1 md:grid-cols-3 gap-16  p-6  ">
            {/* Application Deadline */}
            <div className="flex items-start space-x-2 ">
              <div className=" mt-2"><ClockIcon /></div>
              <div>
                <p className="text-sm text-gray-600">Application closes on</p>
                <p className="text-base font-medium ml-4 text-gray-900"> 15 Jul, 2025</p>
              </div>
            </div>

            {/* Program Duration */}
            <div className="flex items-start space-x-4">
              <div className=" mt-2"><CalendarIcon /></div>
              <div>
                <p className="text-sm text-gray-600">Program duration</p>
                <p className="text-base ml-4 font-medium text-gray-900">4 Months</p>
              </div>
            </div>

            {/* Learning Format */}
            <div className="flex items-start space-x-4">
              <div className=" mt-2"><LearningIcon /></div>
              <div>
                <p className="text-sm md:ml-6 text-gray-600">Learning Format</p>
                <p className="text-base font-medium text-gray-900">Live, Online, Interactive</p>
              </div>
            </div>
          </div>
        </div>



        {/*section 3*/}
        <div id="apply-section" className="mt-6 max-w-7xl mx-auto px-10 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section - Features */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl  font-normal text-gray-900 mb-6 mt-6  mx-6">Why Join this Program</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Feature Cards */}
                <div className="bg-white px-8 py-4 rounded-xl shadow-sm relative">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 mx-auto ">
                    <CertificateIcon />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3 text-center">Earn a Elite Certificate</h3>
                  <p className="text-gray-600 text-center">Receive a certificate of program completion from ElevateX</p>
                </div>

                <div className="bg-white px-8 py-4 rounded-xl shadow-sm">
                  <div className="w-16 h-16 bg-green-50 mx-auto rounded-full flex items-center justify-center mb-6">
                    <ToolsIcon />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3 text-center">Modern GenAI Tools</h3>
                  <p className="text-gray-600 text-center">Explore Copilot, Azure, ChatGPT, DALL-E, and other tools with access to integrated labs</p>
                </div>

                <div className="bg-white px-8 py-4 rounded-xl shadow-sm">
                  <div className="w-16 h-16 bg-green-50 mx-auto rounded-full flex items-center justify-center mb-6">
                    <SystemsIcon />
                  </div>
                  <h3 className="text-xl font-medium text-center text-gray-900 mb-3 text-center">Build Agentic systems</h3>
                  <p className="text-gray-600 text-center ">Build and deploy intelligent, production-ready systems using Spring Boot, Generative AI, and Data Engineering tools</p>
                </div>

                <div className="bg-white px-8 py-4 rounded-xl shadow-sm">
                  <div className="w-16 h-16 bg-green-50 mx-auto rounded-full flex items-center justify-center mb-6">
                    <ApplicationsIcon />
                  </div>
                  <h3 className="text-xl font-medium text-center text-gray-900 mb-3">Real-world applications</h3>
                  <p className="text-gray-600 text-center">Acquire a real-world understanding of various business applications via capstone projects</p>
                </div>
              </div>

              {/* Ratings */}

              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { score: '4.6', platform: 'Switchup' },
                  { score: '4.5', platform: 'Course Report' },
                  { score: '4.4', platform: 'Career Karma' }
                ].map((rating, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                    <div className="flex items-center">
                      <span className="text-2xl font-semibold text-gray-900">{rating.score}</span>
                      <span className="text-yellow-400 text-2xl ml-1">★</span>
                    </div>
                    <span className="text-gray-600">{rating.platform}</span>
                  </div>
                ))}
              </div>*/}
            </div>

            {/* Right Section - Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <h2 className="text-2xl font-medium text-center text-gray-900 mb-6">
                  Admission Closes on 15 Jul
                </h2>

                {/* Countdown */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  {[
                    { value: countdown.days, label: 'Days' },
                    { value: countdown.hours, label: 'Hours' },
                    { value: countdown.minutes, label: 'Minutes' },
                    { value: countdown.seconds, label: 'Seconds' }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-white border border-gray-200 rounded-lg p-2 mb-2">
                        <span className="text-xl font-semibold text-gray-900">
                          {String(item.value).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name*"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email*"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select Course</option>
                      <option value="Gen AI">Gen AI</option>
                      <option value="Data Engineering">Data Engineering</option>
                      <option value="Spring Boot">Spring Boot</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="formType"
                          value="self"
                          checked={formType === 'self'}
                          onChange={() => setFormType('self')}
                          className="form-radio text-green-600"
                        />
                        <span className="ml-2">Myself</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="formType"
                          value="company"
                          checked={formType === 'company'}
                          onChange={() => setFormType('company')}
                          className="form-radio text-green-600"
                        />
                        <span className="ml-2">My Company</span>
                      </label>
                    </div>

                    {formType === 'self' && (
                      <select
                        name="workExperience"
                        value={formData.workExperience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select Work Experience*</option>
                        <option value="0-2">0-2 years</option>
                        <option value="2-5">2-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    )}

                    {formType === 'company' && (
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Company Name*"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    )}
                  </div>

                  <div className="flex gap-2">
                    <div className="w-32">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleCountryCodeChange}
                        className="w-full px-2 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="Phone Number*"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      maxLength={10}
                    />
                  </div>

                  <div>
                    <label className="flex items-start space-x-2">
                      <input type="checkbox" required className="mt-1" />
                      <span className="text-sm text-gray-600">
                        By providing your contact details, you agree to our{' '}
                        <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
                      </span>
                    </label>
                  </div>

                  {formStatus.message && (
                    <div className={`p-3 rounded-lg text-sm ${formStatus.type === 'success'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                      }`}>
                      {formStatus.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 bg-green-600 text-white font-medium rounded-lg transition-colors ${isSubmitting
                        ? 'opacity-75 cursor-not-allowed'
                        : 'hover:bg-green-700'
                      }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Talk to our advisor'}
                  </button>
                </form>

                {/* Corporate Section 
                <div className="mt-8 text-center pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Corporate Training</h3>
                  <p className="text-gray-600 mb-6">Enterprise training for teams</p>
                  <a
                    href="#"
                    className="inline-block px-8 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors"
                  >
                    Contact Us
                  </a>
                </div> */}


              </div>
            </div>
          </div>
        </div>



        {/*section 4*/}
        <div id="courses-section" className="max-w-7xl mx-auto bg-white mt-4 p-8 font-sans text-gray-900">
          {/* Course Tabs */}
          <div className="w-full p-6">
            <div className="flex items-center gap-8 border-b border-green-200">
              {Object.entries(courseContent).map(([key, content]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`text-lg font-semibold pb-4 relative ${activeTab === key
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-600 hover:text-green-500'
                    }`}
                >
                  {content.title}
                </button>
              ))}
            </div>

            {/* Course Content */}
            <div className="mt-6 space-y-2">
              {courseContent[activeTab].lessons.map((lesson, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleLesson(index)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-green-600 font-medium">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{lesson.duration}</span>
                      <svg
                        className={`w-5 h-5 transform transition-all duration-300 text-grey-600 ${expandedLesson === index ? 'rotate-180' : ''
                          }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={expandedLesson === index ? "M20 12H4" : "M12 4v16m8-8H4"}
                          className="transform origin-center transition-all duration-300"
                        />
                      </svg>
                    </div>
                  </button>

                  {expandedLesson === index && (
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                      <div className="space-y-3">
                        {lesson.subtopic?.map((topic, i) => (
                          <div key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-2 h-2 rounded-full bg-green-600"></div>
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 ">
              <a
                href="#apply-section"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('apply-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Apply Now
              </a>
              <a
                href="#courses-section"
                onClick={(e) => {
                  e.preventDefault();
                  handleSyllabusDownload();
                }}
                className="inline-flex justify-center items-center px-6 py-3 border border-green-600 text-base font-medium rounded-md text-green-600 bg-transparent hover:bg-green-50 transition-colors duration-200"
              >
                <DownloadIcon />
                Download Syllabus
              </a>
            </div>
          </div>



        </div>



        {/*section 5 footer*/}
        <div className="max-w-7xl mx-auto bg-white mt-4 p-8 font-sans text-gray-900">
          <footer className="border-t border-gray-200">
            <div className="container mx-auto py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div>
                  <img
                    src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=294,fit=crop,q=95/YrD1LZ6Wg3T5P0Oz/logo-of-smart-decision-labs---e1bb1e-2c444e-A8526zRJRWhpXVxw.png"
                    alt="SDL ElevateX"
                    className="h-16 mb-4"
                  />
                  <p className="text-gray-600 text-sm">
                    Empowering the next generation of tech leaders through expert-led mentorship and hands-on learning.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="http://194.164.150.162" target="_blank" className="text-gray-600 hover:text-green-600">LMS</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-green-600">Courses</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-green-600">Contact</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-green-600">FAQs</a></li>
                  </ul>
                </div>

                {/* Programs */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Programs</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-green-600">GenAI</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-green-600">Data Engineering</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-green-600">Spring Boot</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-green-600">View All Programs</a></li>
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Contact Us</h3>
                  <ul className="space-y-2">
                    <li className="text-gray-600">
                      <span className="block">Email:</span>
                      <a href="mailto:sdl.elevatex@gmail.com" className="text-green-600 hover:underline">sdl.elevatex@gmail.com</a>
                    </li>
                    <li className="text-gray-600">
                      <span className="block">Phone:</span>
                      <a href="tel:+919873098143" className="text-green-600 hover:underline">+91 9873098143 </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-gray-200 mt-8 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-600 text-sm">
                    © 2025 ElevateX. All rights reserved.
                  </p>
                  <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="text-gray-600 hover:text-green-600">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-green-600">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-green-600">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-green-600">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.668-.069 4.948-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>

      </div>
    </>
  );
}
