export default function WhyChooseUs() {
  const points = [
    { title: "Trusted Professionals", desc: "All practitioners are verified by relevant health councils." },
    { title: "Convenience", desc: "Get healthcare at home or online with just a few clicks." },
    { title: "Affordable", desc: "Transparent pricing with no hidden fees." },
    { title: "Connected Network", desc: "Integrated with hospitals, labs, and pharmacies for full coverage." },
  ];

  return (
    <section className="py-24 max-w-6xl mx-auto px-6 text-center">
      <h2 className="text-3xl font-semibold mb-12">Why Choose HealthMe?</h2>

      <div className="grid grid-cols-1 bg-teal/300 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {points.map((point) => (
          <div key={point.title} className="p-6 bg-white/70 rounded-2xl shadow-glass border border-teal-400">
            <h3 className="text-lg font-semibold text-brand mb-2">
              {point.title}
            </h3>
            <p className="text-slate-600 text-sm">{point.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}