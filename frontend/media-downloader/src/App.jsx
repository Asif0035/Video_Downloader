// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Hero from './components/Hero';
// import Features from './components/Features';
// import FAQ from './components/FAQ';
// import PlatformPage from './components/PlatformPage';
// import PrivacyPolicy from './components/PrivacyPolicy';
// import TermsOfService from './components/TermsOfService';

// export default function App() {
//   return (
//     <Router basename="/Video_Downloader">
//       <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col">
//         <Navbar />
//         <div className="flex-grow">
//           <Routes>
//             {/* Main Homepage */}
//             <Route 
//               path="/" 
//               element={
//                 <>
//                   <Hero />
//                   <Features />
//                   <FAQ />
//                 </>
//               } 
//             />

//             {/* SOP Programmatic SEO Routes */}
//             <Route 
//               path="/youtube-shorts-downloader" 
//               element={
//                 <PlatformPage 
//                   title="YouTube Shorts Downloader - Save HD Videos Free"
//                   description="Fast and free YouTube Shorts video downloader. Save YouTube shorts and MP4 videos instantly in full HD."
//                   platformName="YouTube"
//                   faqPairs={[
//                     { q: "How do I download YouTube Shorts?", a: "Copy the short video link, paste it into our downloader input above, and click Fetch." },
//                     { q: "Is this YouTube downloader free?", a: "Yes, our tool is 100% free with no hidden charges or limits." }
//                   ]}
//                 />
//               } 
//             />

//             <Route 
//               path="/instagram-reels-downloader" 
//               element={
//                 <PlatformPage 
//                   title="Instagram Reels Downloader - High Quality Audio & Video"
//                   description="Download Instagram Reels, stories, and posts in high resolution without watermarks."
//                   platformName="Instagram"
//                   faqPairs={[
//                     { q: "Can I download private Instagram Reels?", a: "Our downloader currently supports public Instagram Reels and video posts." },
//                     { q: "Do I need an account to save Instagram videos?", a: "No account or login is required to download Instagram videos." }
//                   ]}
//                 />
//               } 
//             />

//             <Route 
//               path="/facebook-video-downloader-hd" 
//               element={
//                 <PlatformPage 
//                   title="Facebook Video Downloader HD - Save FB Clips Free"
//                   description="Convert and download Facebook videos, clips, and watch links in 1080p HD quality."
//                   platformName="Facebook"
//                   faqPairs={[
//                     { q: "Can I download Facebook Watch videos?", a: "Yes, simply copy the FB video link and paste it into the search box." }
//                   ]}
//                 />
//               } 
//             />

//             {/* Static Legal Routes */}
//             <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//             <Route path="/terms-of-service" element={<TermsOfService />} />
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// }









































import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Features from './components/Features';
import FAQ from './components/FAQ';
import PlatformPage from './components/PlatformPage';
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

export default function App() {
  return (
    <Router basename={import.meta.env.DEV ? "/" : "/Video_Downloader"}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            {/* Main Homepage */}
            <Route 
              path="/" 
              element={
                <>
                  <Hero />
                  <Features />
                  <FAQ />
                </>
              } 
            />

            {/* Programmatic SEO Routes */}
            <Route 
              path="/youtube-shorts-downloader" 
              element={
                <PlatformPage 
                  title="YouTube Shorts Downloader - Save HD Videos Free"
                  description="Fast and free YouTube Shorts video downloader. Save YouTube shorts and MP4 videos instantly in full HD."
                  platformName="YouTube"
                  faqPairs={[
                    { q: "How do I download YouTube Shorts?", a: "Copy the short video link, paste it into our downloader input above, and click Fetch." },
                    { q: "Is this YouTube downloader free?", a: "Yes, our tool is 100% free with no hidden charges or limits." }
                  ]}
                />
              } 
            />

            <Route 
              path="/instagram-reels-downloader" 
              element={
                <PlatformPage 
                  title="Instagram Reels Downloader - High Quality Audio & Video"
                  description="Download Instagram Reels, stories, and posts in high resolution without watermarks."
                  platformName="Instagram"
                  faqPairs={[
                    { q: "Can I download private Instagram Reels?", a: "Our downloader currently supports public Instagram Reels and video posts." },
                    { q: "Do I need an account to save Instagram videos?", a: "No account or login is required to download Instagram videos." }
                  ]}
                />
              } 
            />

            <Route 
              path="/facebook-video-downloader-hd" 
              element={
                <PlatformPage 
                  title="Facebook Video Downloader HD - Save FB Clips Free"
                  description="Convert and download Facebook videos, clips, and watch links in 1080p HD quality."
                  platformName="Facebook"
                  faqPairs={[
                    { q: "Can I download Facebook Watch videos?", a: "Yes, simply copy the FB video link and paste it into the search box." }
                  ]}
                />
              } 
            />

            {/* Core & Legal Static Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Privacy Policy Routes (Handles common link variations) */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />

            {/* Terms of Service Routes (Handles common link variations) */}
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/terms" element={<TermsOfService />} />

            {/* Fallback 404 Route */}
            <Route 
              path="*" 
              element={
                <div className="text-center py-20">
                  <h2 className="text-2xl font-bold mb-2">404 - Page Not Found</h2>
                  <Link to="/" className="text-blue-500 hover:underline">Return Home</Link>
                </div>
              } 
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}