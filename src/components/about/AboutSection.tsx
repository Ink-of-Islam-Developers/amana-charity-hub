
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-amana-dark mb-4">About Amana Charity & Edir</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Working together to create lasting change and improve lives in our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-amana-dark mb-4">Our Mission</h3>
            <p className="text-gray-700 mb-4">
              Amana Charity & Edir works to alleviate suffering and provide support to the most vulnerable members of our community through transparent, accountable, and impactful aid programs.
            </p>
            <p className="text-gray-700">
              We believe that everyone deserves access to basic necessities, healthcare, and opportunities to improve their lives, regardless of their circumstances.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1593113598332-cd59a0c3015c" 
              alt="Volunteers distributing aid" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-row-reverse mb-16">
          <div className="order-1 md:order-2">
            <h3 className="text-2xl font-bold text-amana-dark mb-4">Our Vision</h3>
            <p className="text-gray-700 mb-4">
              We envision a society where all community members have their basic needs met, with equal access to healthcare, education, and economic opportunities.
            </p>
            <p className="text-gray-700">
              Through our community-centered approach, we aim to build resilient neighborhoods where people support each other and grow together.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl order-2 md:order-1">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
              alt="Community supporting each other" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-amana-light rounded-xl p-8 md:p-12 mb-16">
          <h3 className="text-2xl font-bold text-amana-dark mb-6 text-center">Our Core Values</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-amana-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-amana-dark mb-2 text-center">Transparency</h4>
              <p className="text-gray-700 text-center">
                We maintain complete openness in our operations, finances, and decision-making processes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-amana-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-amana-dark mb-2 text-center">Compassion</h4>
              <p className="text-gray-700 text-center">
                We approach our work with empathy and respect for the dignity of those we serve.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-amana-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-amana-dark mb-2 text-center">Community</h4>
              <p className="text-gray-700 text-center">
                We believe in the power of communities working together to solve shared challenges.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-amana-dark mb-6">Our Team</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 10}.jpg`} 
                    alt="Team member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h4 className="font-semibold text-amana-dark">Team Member {i}</h4>
                  <p className="text-gray-600 text-sm">Position Title</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amana-primary text-white rounded-xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Whether through donations, volunteering, or spreading awareness, your support makes a meaningful difference in the lives of those we serve.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-amana-primary hover:bg-amana-accent">
                Contact Us
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
