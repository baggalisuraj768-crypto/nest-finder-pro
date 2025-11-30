import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Star, CheckCircle2, Phone, Mail } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { agents } from "@/data/agents";

export default function Agents() {
  return (
    <>
      <Helmet>
        <title>Our Real Estate Agents | NestFinder</title>
        <meta name="description" content="Meet our expert real estate agents. Experienced professionals ready to help you find your perfect home." />
      </Helmet>
      <Layout>
        {/* Header */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                Our Expert Agents
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                Work with the best in the industry to find your perfect property
              </p>
            </motion.div>
          </div>
        </section>

        {/* Agents Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {agents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/agent/${agent.id}`}>
                    <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group">
                      <div className="relative h-72 overflow-hidden">
                        <img
                          src={agent.image}
                          alt={agent.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="w-4 h-4 text-accent fill-accent" />
                            <span className="text-primary-foreground font-semibold">{agent.rating}</span>
                            <span className="text-primary-foreground/70 text-sm">
                              ({agent.reviewCount} reviews)
                            </span>
                          </div>
                          <h3 className="font-display text-xl font-semibold text-primary-foreground flex items-center gap-2">
                            {agent.name}
                            {agent.verified && (
                              <CheckCircle2 className="w-5 h-5 text-accent" />
                            )}
                          </h3>
                          <p className="text-primary-foreground/80 text-sm mt-1">
                            {agent.experience} years experience
                          </p>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {agent.specialization.slice(0, 2).map((spec) => (
                            <span
                              key={spec}
                              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{agent.listings} listings</span>
                          <Button size="sm" className="btn-primary">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
