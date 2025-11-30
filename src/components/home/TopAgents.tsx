import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTopAgents } from "@/data/agents";

export default function TopAgents() {
  const agents = getTopAgents(4);

  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Meet Our Experts
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              Top Real Estate Agents
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Work with the best in the industry to find your perfect property.
            </p>
          </div>
          <Link to="/agents">
            <Button variant="outline" className="gap-2">
              View All Agents
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/agent/${agent.id}`}>
                <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group">
                  <div className="relative h-64 overflow-hidden">
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
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {agent.specialization.slice(0, 2).map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <span className="text-sm text-muted-foreground">
                        {agent.experience} years exp.
                      </span>
                      <span className="text-sm text-primary font-medium">
                        {agent.listings} listings
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
