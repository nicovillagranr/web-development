import videoBg from '../../assets/images/video.mp4'

export default function Hero({ id }) {
  return (
    <section id={id} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Video Background */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover filter-[blur(6px)]">
        <source src={videoBg} type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div className="gradient-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 w-full text-left text-white pl-6 md:pl-12 lg:pl-20">
        <div className="max-w-6xl">
          {/* Accent line above title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-mgd-orange" />
            <span className="font-mono text-xs uppercase tracking-widest text-mgd-orange">
              Industrial Solutions
            </span>
            <div className="w-8 h-0.5 bg-mgd-orange" />
          </div>

          {/* Main Title */}
          <h1 className="font-display font-black mb-6 leading-tight">
            Quality & <span className="text-mgd-orange">Reliability</span> for the{' '}
            <span className="block text-mgd-gray-light">Mining Industry</span>
          </h1>

          {/* Subtitle */}
          <p className="font-body text-lg md:text-xl text-mgd-gray-light mb-10 max-w-2xl leading-relaxed">
            Premium mining materials, safety equipment, hydraulic seals, and engineering expertise.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-start items-start md:w-[50%]">
            {/* Primary CTA */}
            <a
              href="#services"
              className="orange-glow px-8 py-4 bg-mgd-orange text-white font-display font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-mgd-orange/50 group"
            >
              Explore Our Services
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-white text-white font-display font-bold rounded-lg hover:bg-white hover:text-mgd-navy transition-all duration-300"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden md:flex flex-col items-center gap-3 absolute bottom-8 left-1/2 -translate-x-1/2">
        <span className="text-sm text-mgd-gray-light font-mono">Explore</span>
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
    </section>
  )
}
