export default function WhyUs({ id }) {
  const stats = [
    {
      number: '500+',
      label: 'Active Clients',
      icon: '👥',
    },
    {
      number: '15',
      label: 'Years in Business',
      icon: '⏳',
    },
    {
      number: '1200+',
      label: 'Products Available',
      icon: '📦',
    },
    {
      number: '40+',
      label: 'Countries Served',
      icon: '🌍',
    },
    {
      number: '24/7',
      label: 'Technical Support',
      icon: '🛠️',
    },
    {
      number: 'ISO 9001',
      label: 'Quality Certified',
      icon: '✓',
    },
  ]

  return (
    <section id={id} className="bg-mgd-navy py-20 md:py-28 px-6 md:px-8">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-mgd-orange rounded-full" />
            <span className="font-mono text-xs uppercase tracking-widest text-mgd-orange">
              Why Choose Us
            </span>
            <div className="w-1 h-8 bg-mgd-orange rounded-full" />
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-mgd-gray-light text-lg max-w-2xl mx-auto">
            Our track record speaks for itself. We're the trusted partner for mining and construction companies across Latin America.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              {/* Icon */}
              <p className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </p>

              {/* Number */}
              <p className="font-display font-black text-4xl md:text-5xl text-mgd-orange mb-2">
                {stat.number}
              </p>

              {/* Label */}
              <p className="text-mgd-gray-light text-lg font-body">
                {stat.label}
              </p>

              {/* Underline on hover */}
              <div className="w-0 h-1 bg-mgd-orange mx-auto mt-4 group-hover:w-full transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Features List */}
        <div className="mt-20 pt-20 border-t border-mgd-blue/30 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xl text-white mb-6">
              Why Trust Us
            </h3>
            {[
              'Over 15 years serving the mining industry',
              'Internationally certified suppliers',
              'Quality guarantee on all products',
              'Fast and secure delivery worldwide',
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-mgd-orange shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-mgd-gray-light">{feature}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-display font-bold text-xl text-white mb-6">
              Our Commitment
            </h3>
            {[
              'Personalized technical consultation',
              'Professional after-sales support',
              'ISO standards compliance',
              'Environmental responsibility & sustainability',
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-mgd-orange shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-mgd-gray-light">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 pt-12 border-t border-mgd-blue/30">
          <h3 className="font-display font-bold text-2xl text-white mb-4">
            Ready to Partner With Us?
          </h3>
          <a
            href="#contact"
            className="orange-glow inline-block px-10 py-4 bg-mgd-orange text-white font-display font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:bg-orange-dark"
          >
            Request a Quote
          </a>
        </div>
      </div>
    </section>
  )
}
