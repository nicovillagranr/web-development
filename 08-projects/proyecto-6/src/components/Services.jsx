import MiningIcon from './icons/MiningIcon'
import EPPIcon from './icons/EPPIcon'
import HydraulicIcon from './icons/HydraulicIcon'
import EngineeringIcon from './icons/EngineeringIcon'

export default function Services({ id }) {
  const services = [
    {
      title: 'Mining Materials',
      description: 'Explosives, cables, specialized tools, and consumables for mining operations of any scale. Certified and tested for durability.',
      icon: MiningIcon,
      color: 'text-mgd-orange',
    },
    {
      title: 'Safety Equipment (PPE)',
      description: 'Hard hats, gloves, harnesses, safety footwear, and protective gear. All items certified to international safety standards.',
      icon: EPPIcon,
      color: 'text-mgd-cta',
    },
    {
      title: 'Hydraulic Seals',
      description: 'Premium seals, retainers, o-rings, and hydraulic repair kits for heavy industrial machinery and equipment.',
      icon: HydraulicIcon,
      color: 'text-mgd-orange',
    },
    {
      title: 'Engineering Services',
      description: 'Technical consultation, custom specifications, and comprehensive post-sale support for every project requirement.',
      icon: EngineeringIcon,
      color: 'text-orange-dark',
    },
  ]

  return (
    <section id={id} className="bg-mgd-gray-light py-20 md:py-28 px-6 md:px-8">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-mgd-orange rounded-full" />
            <span className="font-mono text-xs uppercase tracking-widest text-mgd-orange">
              Our Services
            </span>
            <div className="w-1 h-8 bg-mgd-orange rounded-full" />
          </div>
          <h2 className="font-display font-800 text-3xl md:text-4xl text-mgd-dark mb-4">
            Complete Solutions for Your Industry
          </h2>
          <p className="text-mgd-dark text-lg max-w-2xl mx-auto font-medium">
            A comprehensive portfolio of specialized products and services for mining, construction, and heavy industry operations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, idx) => {
            const IconComponent = service.icon
            return (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-8 shadow-industrial hover:shadow-lg-industrial transition-all duration-300 cursor-pointer"
                style={{
                  transform: 'translateZ(0)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Icon with background */}
                <div className="mb-6 inline-block">
                  <div className={`w-16 h-16 rounded-xl bg-mgd-gray-light flex items-center justify-center group-hover:bg-mgd-orange/20 transition-colors ${service.color}`}>
                    <IconComponent size={32} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display font-700 text-xl mb-3 text-mgd-navy group-hover:text-mgd-orange transition-colors">
                  {service.title}
                </h3>
                <p className="text-mgd-dark text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Link Arrow */}
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 text-mgd-orange font-semibold hover:gap-3 transition-all"
                >
                  Learn More
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-mgd-dark mb-6 font-medium">
            Can't find what you need? Contact us for customized solutions tailored to your requirements.
          </p>
          <a
            href="#contacto"
            className="inline-block px-8 py-3 border-2 border-mgd-orange text-mgd-orange font-display font-bold rounded-lg hover:bg-mgd-orange hover:text-white transition-all duration-300"
          >
            Request Consultation
          </a>
        </div>
      </div>
    </section>
  )
}
