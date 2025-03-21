import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Residential = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    requirements: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Message sent! We\'ll get back to you as soon as possible.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
      requirements: ''
    });
    
    // Close dialog
    setShowDialog(false);
  };

  return (
    <div className="residential-page">
      {/* Hero Section */}
      <header className="hero">
        <nav className="navbar">
          <div className="logo">BigMama Proxy Network</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact" onClick={() => setShowDialog(true)}>Contacts</a>
            <button className="btn-login">Log in</button>
            <button className="btn-signup">Sign up</button>
          </div>
        </nav>
        
        <div className="hero-content">
          <h1>BigMama Proxy Network</h1>
          <h2>teleport your traffic</h2>
          <p>The next-generation global proxy & traffic routing service.</p>
          <button className="btn-primary">Get started</button>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2>Private LTE/4G Mobile and WiFi Proxies</h2>
        
        <div className="feature-grid">
          <div className="feature-item">
            <h3>Residential IPs from real devices</h3>
          </div>
          <div className="feature-item">
            <h3>Safe service, superb prices</h3>
          </div>
          <div className="feature-item">
            <h3>Cellular network IPs</h3>
          </div>
          <div className="feature-item">
            <h3>Top-class realtime update and search</h3>
          </div>
          <div className="feature-item">
            <h3>Unlimited traffic</h3>
          </div>
          <div className="feature-item">
            <h3>Native TCP fingerprint</h3>
          </div>
          <div className="feature-item">
            <h3>Standard SOCKSv5 protocol support</h3>
          </div>
          <div className="feature-item">
            <h3>Detailed metadata for each proxy</h3>
          </div>
          <div className="feature-item">
            <h3>New IPs added every few minutes</h3>
          </div>
          <div className="feature-item">
            <h3>Private 24/7 support</h3>
          </div>
        </div>
        
        <p className="feature-note">
          Our proxy network is exclusive, operated and managed by ourselves, end-to-end. 
          Best selection, top freshness, highest uptime and speed are guaranteed.
        </p>
      </section>
      
      {/* Rotating Proxies Section */}
      <section className="rotating-proxies">
        <h2>Rotating Proxies</h2>
        
        <div className="proxy-features">
          <div className="proxy-feature">
            <h3>Mobile Rotation Proxy</h3>
          </div>
          <div className="proxy-feature">
            <h3>Cheapest mobile traffic - 12$/Gb</h3>
          </div>
          <div className="proxy-feature">
            <h3>Unlimited mobile rotation ports</h3>
          </div>
          <div className="proxy-feature">
            <h3>UP to 400 threads per port</h3>
          </div>
          <div className="proxy-feature">
            <h3>Manual and Automatic proxy rotation</h3>
          </div>
          <div className="proxy-feature">
            <h3>1000000 IPS</h3>
          </div>
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section className="use-cases">
        <h2>Global Internet routing for your most complex use-cases</h2>
        <p>With the unprecedented selection and quality of our proxy network, all your business needs can be covered:</p>
        
        <div className="use-case-grid">
          <div className="use-case">Ad Verification</div>
          <div className="use-case">Price comparison</div>
          <div className="use-case">Web scraping</div>
          <div className="use-case">Data collection</div>
          <div className="use-case">Online tickets</div>
          <div className="use-case">SEO</div>
          <div className="use-case">Content analyzing</div>
          <div className="use-case">Market research</div>
          <div className="use-case">Sales intelligence</div>
          <div className="use-case">Brand protection</div>
          <div className="use-case">Web testing</div>
          <div className="use-case">Social</div>
        </div>
        
        <p>..as well as any others</p>
        
        <div className="global-cta">
          <h3>Proxies from whole world</h3>
          <p>Lots of proxies for any of your needs.</p>
          <button className="btn-primary">Get started</button>
        </div>
      </section>
      
      {/* Discounts Section */}
      <section className="discounts">
        <h2>Sign-up Discounts</h2>
        <p>A discount of 10-20% is given to each registered user when the first deposit is made, depending on the deposit amount:</p>
        
        <div className="discount-grid">
          <div className="discount-item">
            <h3>10%</h3>
            <p>$50 - $100</p>
          </div>
          <div className="discount-item">
            <h3>15%</h3>
            <p>$150 - $500</p>
          </div>
          <div className="discount-item">
            <h3>20%</h3>
            <p>&gt; $500</p>
          </div>
        </div>
      </section>
      
      {/* Rotating Packages Section */}
      <section className="rotating-packages">
        <h2>Rotating Packages</h2>
        
        <div className="unlimited-section">
          <h3>Unlimited 1 port</h3>
          
          <div className="package-grid">
            <div className="package-column">
              <h4>Per Day</h4>
              <div className="package">
                <p className="price">$20</p>
                <p>US, GB, UK, AU, CA</p>
              </div>
              <div className="package">
                <p className="price">$16</p>
                <p>Europe</p>
              </div>
              <div className="package">
                <p className="price">$12</p>
                <p>World wide</p>
              </div>
            </div>
            
            <div className="package-column">
              <h4>Per Week</h4>
              <div className="package">
                <p className="price">$110</p>
                <p>US, GB, UK, AU, CA</p>
              </div>
              <div className="package">
                <p className="price">$88</p>
                <p>Europe</p>
              </div>
              <div className="package">
                <p className="price">$66</p>
                <p>World wide</p>
              </div>
            </div>
            
            <div className="package-column">
              <h4>Per Month</h4>
              <div className="package">
                <p className="price">$400</p>
                <p>US, GB, UK, AU, CA</p>
              </div>
              <div className="package">
                <p className="price">$300</p>
                <p>Europe</p>
              </div>
              <div className="package">
                <p className="price">$160</p>
                <p>World wide</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="traffic-section">
          <h3>By Traffic Up to 400 ports</h3>
          
          <div className="package-grid">
            <div className="package-column">
              <h4>Week</h4>
              <div className="package">
                <p className="price">$9/Gb</p>
                <p>World wide</p>
              </div>
              <div className="package">
                <p className="price">$12/Gb</p>
                <p>US, GB, UK, AU, CA</p>
              </div>
              <div className="package">
                <p className="price">$10/Gb</p>
                <p>Other countries</p>
              </div>
            </div>
            
            <div className="package-column">
              <h4>Month 10GB+</h4>
              <div className="package">
                <p className="price">$8/Gb</p>
                <p>World wide</p>
              </div>
              <div className="package">
                <p className="price">$11/Gb</p>
                <p>US, GB, UK, AU, CA</p>
              </div>
              <div className="package">
                <p className="price">$9/Gb</p>
                <p>Other countries</p>
              </div>
            </div>
            
            <div className="package-column">
              <h4>Month 50GB+</h4>
              <div className="package">
                <p className="price">$7/Gb</p>
                <p>World wide</p>
              </div>
              <div className="package">
                <p className="price">$10/Gb</p>
                <p>US, GB, UK, AU, CA</p>
              </div>
              <div className="package">
                <p className="price">$8/Gb</p>
                <p>Other countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <h2>Pricing</h2>
        
        <div className="pricing-grid">
          <div className="pricing-plan">
            <h3>Shared</h3>
            <p className="price">$0.40</p>
            <p className="period">per 24 hours</p>
            <p className="description">May be shared by up to 3 more customers.</p>
            <ul className="features-list">
              <li>SOCKS5</li>
              <li>Unlimited bandwidth</li>
              <li>Real LTE/4G and residential WiFi IPs</li>
              <li>Detailed targeting</li>
              <li>24/7 support</li>
            </ul>
          </div>
          
          <div className="pricing-plan">
            <h3>Private</h3>
            <p className="price">From $ 1</p>
            <p className="period">per 24 hours</p>
            <p className="description">Exclusively leased to you</p>
            <ul className="features-list">
              <li>SOCKS5</li>
              <li>Unlimited bandwidth</li>
              <li>Real LTE/4G and residential WiFi IPs</li>
              <li>Detailed targeting</li>
              <li>24/7 support</li>
            </ul>
          </div>
          
          <div className="pricing-plan custom">
            <h3>Custom</h3>
            <button className="contact-btn" onClick={() => setShowDialog(true)}>Contact us</button>
            <p className="description">Contact us for any special requests, we'll be happy to help.</p>
            <ul className="features-list">
              <li>SOCKS5</li>
              <li>Unlimited bandwidth</li>
              <li>IP rotation</li>
              <li>Real LTE/4G ips</li>
              <li>Detailed targeting</li>
              <li>IPs from desired networks</li>
              <li>Premium support</li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Contact Dialog */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <button className="close-button" onClick={() => setShowDialog(false)}>×</button>
            <h2>Contact Us</h2>
            <p>Fill out the form below and we'll get back to you as soon as possible.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="requirements">Proxy Requirements</label>
                <input
                  type="text"
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="E.g., number of proxies, locations, specific use case"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your needs and how we can help"
                  required
                />
              </div>
              
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      )}
      
      {/* Add some basic CSS styles */}
      <style jsx>{`
        .residential-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          color: #333;
          line-height: 1.6;
        }
        
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
        }
        
        .logo {
          font-weight: bold;
          font-size: 1.5rem;
        }
        
        .nav-links {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }
        
        .nav-links a {
          text-decoration: none;
          color: #333;
        }
        
        .btn-login, .btn-signup {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .btn-login {
          background-color: transparent;
          border: 1px solid #333;
        }
        
        .btn-signup {
          background-color: #4a6cf7;
          color: white;
        }
        
        .hero {
          text-align: center;
          padding: 3rem 1rem;
          background: linear-gradient(to right, #f7f9fc, #e6f7ff);
          margin-bottom: 2rem;
        }
        
        .hero-content h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        
        .hero-content h2 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: #4a6cf7;
        }
        
        .btn-primary {
          background-color: #4a6cf7;
          color: white;
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          margin-top: 1rem;
        }
        
        section {
          padding: 3rem 2rem;
          margin-bottom: 2rem;
        }
        
        h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .feature-item {
          background-color: #f9f9f9;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        
        .feature-note {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          font-style: italic;
        }
        
        .proxy-features {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .proxy-feature {
          background-color: #f0f8ff;
          padding: 1.5rem;
          border-radius: 8px;
        }
        
        .use-case-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
          margin: 2rem 0;
        }
        
        .use-case {
          background-color: #f5f7ff;
          padding: 1rem;
          border-radius: 6px;
          text-align: center;
        }
        
        .global-cta {
          text-align: center;
          padding: 2rem 0;
        }
        
        .discount-grid {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin: 2rem 0;
        }
        
        .discount-item {
          background-color: #f5f7ff;
          padding: 1.5rem;
          border-radius: 8px;
          text-align: center;
          min-width: 150px;
        }
        
        .discount-item h3 {
          color: #4a6cf7;
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }
        
        .package-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }
        
        .package-column h4 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .package {
          background-color: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .price {
          font-size: 1.6rem;
          font-weight: bold;
          color: #4a6cf7;
          margin-bottom: 0.5rem;
        }
        
        .unlimited-section, .traffic-section {
          margin-bottom: 3rem;
        }
        
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .pricing-plan {
          background-color: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          text-align: center;
        }
        
        .pricing-plan h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .pricing-plan .price {
          font-size: 2rem;
          margin-bottom: 0.25rem;
        }
        
        .pricing-plan .period {
          color: #666;
          margin-bottom: 1rem;
        }
        
        .features-list {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0;
          text-align: left;
        }
        
        .features-list li {
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
          position: relative;
        }
        
        .features-list li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #4a6cf7;
        }
        
        .contact-btn {
          background-color: #4a6cf7;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
          margin: 1rem 0;
        }
        
        .dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .dialog {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          width: 90%;
          max-width: 600px;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        
        .form-group input, 
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: inherit;
          font-size: 1rem;
        }
        
        .submit-btn {
          background-color: #4a6cf7;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
          width: 100%;
        }
        
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          
          .discount-grid {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Residential;