import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Shield, Award, Users, Target, Heart, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";

const stats = [
  { value: "500+", label: "Properties Listed" },
  { value: "50+", label: "Cities Covered" },
  { value: "1000+", label: "Happy Clients" },
  { value: "8+", label: "Expert Agents" },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "We believe in complete transparency in all our dealings, ensuring you have all the information to make informed decisions.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in every aspect of our service, from property verification to customer support.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your satisfaction is our priority. We go above and beyond to ensure your property journey is smooth and successful.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We leverage the latest technology to provide you with the best property search experience possible.",
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About NestFinder | Your Trusted Real Estate Partner</title>
        <meta name="description" content="Learn about NestFinder, your trusted partner in finding the perfect home. Discover our mission, values, and commitment to excellence." />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative bg-primary py-20 md:py-32 overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Building Dreams, <br />
                <span className="text-accent">One Nest at a Time</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
                NestFinder is more than a real estate platform — we're your partners in 
                finding the perfect place to call home. With years of experience and a 
                passion for helping people, we make property searching simple and enjoyable.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-card border-b border-border">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Our Mission
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                  Making Property Search Effortless
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  At NestFinder, our mission is to revolutionize the way people find their 
                  perfect homes. We understand that buying or renting a property is one of 
                  life's most significant decisions, and we're here to make that journey 
                  as smooth as possible.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Through cutting-edge technology, verified listings, and a network of 
                  expert agents, we provide a platform that connects property seekers with 
                  their dream homes. Whether you're a first-time buyer or a seasoned 
                  investor, NestFinder is your trusted companion in the real estate journey.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                  alt="Modern home"
                  className="rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-2xl shadow-lg">
                  <div className="font-display text-3xl font-bold">10+</div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Values
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                What Drives Us Forward
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-8 shadow-card"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
