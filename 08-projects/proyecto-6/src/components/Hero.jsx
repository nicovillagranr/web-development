import videoBg from '../assets/video.mp4'

export default function Hero({ id }) {
  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: 'blur(6px)',
        }}
      >
        <source src={videoBg} type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div className="gradient-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 w-full text-left text-white pl-6 md:pl-12 lg:pl-20">
        <div
          className="max-w-6xl"
          style={{
            animation: 'fadeInUp 1s ease-out',
          }}
        >
          {/* Accent line above title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-mgd-orange" />
            <span className="font-mono text-xs uppercase tracking-widest text-mgd-orange">
              Industrial Solutions
            </span>
            <div className="w-8 h-0.5 bg-mgd-orange" />
          </div>

          {/* Main Title */}
          <h1
            className="font-display font-900 mb-6 leading-tight"
            style={{
              animation: 'fadeInUp 1s ease-out 0.1s backwards',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              letterSpacing: '-0.03em',
            }}
          >
            Quality & <span className="text-mgd-orange">Reliability</span> for the{' '}
            <span className="block text-mgd-gray-light">Mining Industry</span>
          </h1>

          {/* Subtitle */}
          <p
            className="font-body text-lg md:text-xl text-mgd-gray-light mb-10 max-w-2xl"
            style={{
              animation: 'fadeInUp 1s ease-out 0.2s backwards',
              lineHeight: 1.6,
            }}
          >
            Premium mining materials, safety equipment, hydraulic seals, and engineering expertise. Your trusted partner since 2008.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col md:flex-row gap-4 justify-start"
            style={{
              animation: 'fadeInUp 1s ease-out 0.3s backwards',
            }}
          >
            {/* Primary CTA */}
            <a
              href="#nosotros"
              className="px-8 py-4 bg-mgd-orange text-white font-display font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-mgd-orange/50 group"
              style={{
                boxShadow: '0 0 20px rgba(201, 122, 43, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.target.style.animation = 'glowPulse 0.6s ease-in-out'
              }}
            >
              Explore Our Services
            </a>

            {/* Secondary CTA */}
            <a
              href="#contacto"
              className="px-8 py-4 border-2 border-white text-white font-display font-bold rounded-lg hover:bg-white hover:text-mgd-navy transition-all duration-300"
            >
              Request a Quote
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          style={{
            animation: 'floating 3s ease-in-out infinite',
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm text-mgd-gray-light font-mono">Explora</span>
            <svg
              className="w-6 h-6 text-mgd-orange animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
