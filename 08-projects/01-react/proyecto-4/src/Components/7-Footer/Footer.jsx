import logo from '../../assets/images/logo.webp'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-mgd-dark text-white py-16 md:py-20 px-6 md:px-8">
      <div className="container-wide">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-mgd-blue/20">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logo}
                alt="MGD Exports Logo"
                className="h-10 w-auto"
              />
              <span className="font-display font-bold text-lg">MGD Exports</span>
            </div>
            <p className="text-mgd-gray-light text-sm leading-relaxed mb-6">
              Integrated solutions for mining, safety equipment, hydraulic seals, and engineering services.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {['LinkedIn', 'Facebook', 'Twitter'].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-mgd-blue/20 flex items-center justify-center hover:bg-mgd-orange transition-colors"
                  aria-label={social}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About', href: '#about-us' },
                { label: 'Services', href: '#services' },
                { label: 'Contact', href: '#contact' },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-mgd-gray-light hover:text-mgd-orange transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                'Mining Materials',
                'Certified PPE',
                'Hydraulic Seals',
                'Engineering Support',
              ].map((service, idx) => (
                <li key={idx}>
                  <a
                    href="#services"
                    className="text-mgd-gray-light hover:text-mgd-orange transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-mgd-gray-med text-sm text-center md:text-left">
            © {currentYear} MGD Exports. All rights reserved.
          </p>

          {/* Back to Top */}
          <a
            href="#home"
            className="flex items-center gap-2 text-mgd-orange hover:gap-3 transition-all text-sm font-semibold"
          >
            Back to Top
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7-7m0 0l-7 7m7-7v12"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
