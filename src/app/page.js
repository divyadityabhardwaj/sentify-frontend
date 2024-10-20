'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import './globals.css'

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  console.log(section); 
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.error(`Section with ID ${sectionId} not found.`);
  }
};

export default function SentifyLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const aboutRef = useRef(null)
  const pricingRef = useRef(null)
  const aboutControls = useAnimation()
  const pricingControls = useAnimation()
  const aboutInView = useInView(aboutRef, { once: true, threshold: 0.3 })
  const pricingInView = useInView(pricingRef, { once: true, threshold: 0.3 })

  useEffect(() => {
    if (aboutInView) {
      aboutControls.start('visible')
    }
    if (pricingInView) {
      pricingControls.start('visible')
    }
  }, [aboutInView, pricingInView, aboutControls, pricingControls])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const slideIn = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  const NavLink = ({ to, children }) => (
    <button
      onClick={() => scrollToSection(to)} // Use scrollToSection for navigation
      className="cursor-pointer transition-all duration-300 hover:scale-105 hover:text-blue-600"
    >
      {children}
    </button>
  )

  return (
    <div className="h-screen overflow-y-auto scroll-smooth">
      <style jsx global>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .gradient-button {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          background-size: 200% 200%;
        }
        .gradient-button:hover {
          animation: gradientShift 3s ease infinite;
        }
      `}</style>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <button onClick={() => scrollToSection('home')} className="text-2xl font-bold text-blue-600 cursor-pointer">
              Sentify
            </button>
            <div className="hidden md:flex space-x-4 items-center">
              <NavLink to="home">Home</NavLink>
              <NavLink to="about">About</NavLink>
              <NavLink to="pricing">Pricing</NavLink>
              <a
                href="/trial"
                className="gradient-button text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Try Sentify
              </a>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-blue-600">
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white py-2"
          >
            <div className="container mx-auto px-6 flex flex-col space-y-2">
              <NavLink to="home">Home</NavLink>
              <NavLink to="about">About</NavLink>
              <NavLink to="pricing">Pricing</NavLink>
              <a
                href="/trial"
                className="gradient-button text-white px-4 py-2 rounded-lg transition-all duration-300 inline-block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Try Sentify
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Home Section */}
      <div id="home" className="min-h-screen py-28 md:h-screen md:snap-start flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="container mx-auto px-6 text-center text-white">
          <motion.h1
            className="text-5xl mt-7 md:text-6xl font-bold mb-4"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Welcome to Sentify
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Unlock the power of sentiment analysis for your content
          </motion.p>
          <motion.p
            className="text-lg md:text-xl mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Discover insights from YouTube comments with ease
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <button onClick={() => scrollToSection('about')} className="animate-bounce cursor-pointer inline-block">
              <ChevronDownIcon className="h-12 w-12 text-white" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="min-h-screen py-20 md:h-screen md:snap-start flex items-center justify-center bg-gray-100">
        <motion.section
          ref={aboutRef}
          initial="hidden"
          animate={aboutControls}
          variants={staggerChildren}
          className="container mx-auto px-6"
        >
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-8 md:mb-0"
              variants={slideIn}
            >
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Sentiment Analysis Illustration"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div
              className="md:w-1/2 md:pl-12"
              variants={slideIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-5 text-gray-800">Why Sentify?</h2>
              <p className="text-lg text-gray-600 mb-6">
                Sentify revolutionizes the way you understand your audience. Our advanced sentiment analysis tool
                processes YouTube comments to provide valuable insights into viewer opinions and emotions. Whether
                you're a content creator, marketer, or business owner, Sentify helps you make data-driven decisions
                to improve your content strategy and engage your audience more effectively.
              </p>
              <button
                onClick={() => scrollToSection('pricing')}
                className="gradient-button text-white px-6 py-3 rounded-lg transition duration-300 cursor-pointer inline-block"
              >
                Explore Pricing
              </button>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="min-h-screen py-8 md:py-16 flex items-center justify-center bg-white">
        <motion.section
          ref={pricingRef}
          initial="hidden"
          animate={pricingControls}
          variants={staggerChildren}
          className="container mx-auto px-6 pt-8 md:pt-0 max-w-6xl"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800"
            variants={fadeIn}
          >
            Choose Your Plan
          </motion.h2>
          <motion.div
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mx-auto"
          >
            {[
              { name: 'Free', price: '$0', features: ['Basic sentiment analysis', 'Up to 100 comments', 'Daily limit: 5 videos'] },
              { name: 'Individual', price: '$9.99/mo', features: ['Advanced sentiment analysis', 'Up to 1000 comments', 'Daily limit: 20 videos', 'Priority support'] },
              { name: 'Business', price: '$49.99/mo', features: ['Enterprise-level analysis', 'Unlimited comments', 'No daily limit', '24/7 priority support', 'Custom integrations'] },
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                className="bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col justify-between h-full"
                variants={slideIn}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-6 text-blue-600">{plan.price}</p>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <svg className="h-5 w-5 mr-2 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="/trial"
                  className="gradient-button w-full text-white text-center px-4 py-2 rounded-lg transition duration-300 mt-auto"
                >
                  {plan.name === 'Free' ? 'Try for Free' : 'Get Started'}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}