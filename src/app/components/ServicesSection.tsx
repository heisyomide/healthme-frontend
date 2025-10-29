import GlassCard from "./GlassCard";

export default function ServicesSection() {
  const services = [
    {
      title: "Home Visits",
      desc: "Get care at home from licensed nurses and doctors for minor treatments and check-ups.",
      icon: "🏠",
    },
    {
      title: "Telehealth",
      desc: "Consult online with medical professionals anytime, anywhere.",
      icon: "💻",
    },
    {
      title: "Pharmacy Delivery",
      desc: "Get prescribed medications delivered straight to your doorstep.",
      icon: "💊",
    },
    {
      title: "Diagnostics",
      desc: "Request lab tests and screenings with partner labs and hospitals.",
      icon: "🧪",
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <GlassCard key={service.title} className="p-8 text-center">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800">
                {service.title}
              </h3>
              <p className="text-slate-600 text-sm">{service.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}