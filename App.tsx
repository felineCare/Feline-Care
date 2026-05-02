/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import KnowledgeBase from './components/KnowledgeBase';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <BookingForm />
        <KnowledgeBase />
      </main>
      <Footer />
    </div>
  );
}
