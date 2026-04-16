export default function About({ id }) {
  const values = [
    {
      title: 'Mission',
      description: 'Deliver world-class solutions for the mining and industrial sector, prioritizing safety, efficiency, and sustainability.',
      icon: '🎯',
    },
    {
      title: 'Vision',
      description: 'Be the preferred strategic partner for mining and construction companies across Latin America.',
      icon: '🌟',
    },
    {
      title: 'Values',
      description: 'Integrity, innovation, commitment to excellence, and responsibility towards our environment.',
      icon: '💎',
    },
  ]

  return (
    <section id={id} className="bg-white py-20 md:py-28 px-6 md:px-8">
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-mgd-orange rounded-full" />
            <span className="font-mono text-xs uppercase tracking-widest text-mgd-orange">
              About Us
            </span>
          </div>
          <h2 className="font-display font-800 text-3xl md:text-4xl text-mgd-dark mb-6">
            15+ Years of Industrial Excellence
          </h2>
          <div className="w-16 h-1 bg-mgd-orange rounded-full" />
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div>
            <h3 className="font-display font-700 text-2xl mb-6 text-mgd-navy">
              Experience, Quality & Commitment
            </h3>
            <p className="text-mgd-gray-med text-lg mb-6 leading-relaxed">
              Since 2008, MGD Exports has been the trusted choice for mining and construction companies across Latin America. We are committed to providing the highest quality materials while ensuring safety in every operation.
            </p>
            <p className="text-mgd-gray-med text-lg mb-8 leading-relaxed">
              We work directly with leading international suppliers to ensure every product meets rigorous standards. Our expert team is available for technical consulting and comprehensive post-sale support.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="p-4 bg-mgd-gray-light/30 rounded-lg">
                <p className="font-display font-900 text-3xl text-mgd-orange">500+</p>
                <p className="text-mgd-gray-med text-sm mt-2">Satisfied Clients</p>
              </div>
              <div className="p-4 bg-mgd-gray-light/30 rounded-lg">
                <p className="font-display font-900 text-3xl text-mgd-orange">15</p>
                <p className="text-mgd-gray-med text-sm mt-2">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative">
            <div
              className="aspect-square rounded-2xl overflow-hidden shadow-industrial"
              style={{
                backgroundImage: 'url(/images/about-team.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Fallback gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-mgd-hero to-mgd-blue opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-center font-display font-bold">Team & Facilities</p>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-mgd-orange/10 rounded-full blur-2xl" />
          </div>
        </div>

        {/* Values Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 pt-16 border-t border-mgd-gray-light">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-xl border border-mgd-gray-light hover:shadow-industrial transition-all duration-300"
            >
              <p className="text-4xl mb-4">{value.icon}</p>
              <h3 className="font-display font-700 text-xl mb-3 text-mgd-navy">
                {value.title}
              </h3>
              <p className="text-mgd-gray-med leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
