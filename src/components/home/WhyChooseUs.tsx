import { motion } from "framer-motion";
import { Shield, Users, Clock, Award, HeartHandshake, Search } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Properties",
    description: "All listings are thoroughly verified for authenticity and legal compliance.",
  },
  {
    icon: Users,
    title: "Expert Agents",
    description: "Work with experienced professionals who understand your needs.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your property-related queries.",
  },
  {
    icon: Award,
    title: "Best Deals",
    description: "Access exclusive properties and competitive pricing in the market.",
  },
  {
    icon: HeartHandshake,
    title: "Trusted Service",
    description: "Over 1000+ happy clients trust us with their real estate needs.",
  },
  {
    icon: Search,
    title: "Easy Search",
    description: "Advanced filters and search to find exactly what you're looking for.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Experience the NestFinder Difference
          </h2>
          <p className="text-muted-foreground mt-4">
            We're committed to making your property search seamless, secure, and successful.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-card-hover transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
