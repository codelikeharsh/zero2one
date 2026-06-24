import { useLenis } from './hooks/useLenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import WhyChooseUs from './components/WhyChooseUs'
import About from './components/About'
import Pricing from './components/Pricing'
import Terms from './components/Terms'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useLenis()

  return (
    <div className="relative min-h-screen bg-navy text-gray-200 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Services />
        <Portfolio />
        <WhyChooseUs />
        <About />
        <Pricing />
        <Terms />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
