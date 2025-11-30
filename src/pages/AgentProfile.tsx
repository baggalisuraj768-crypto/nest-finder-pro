import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Star, CheckCircle2, Phone, Mail, MapPin, Briefcase } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ContactModal from "@/components/modals/ContactModal";
import ListingCard from "@/components/listings/ListingCard";
import { Button } from "@/components/ui/button";
import { getAgentById } from "@/data/agents";
import { getListingsByAgent } from "@/data/listings";

export default function AgentProfile() {
  const { id } = useParams<{ id: string }>();
  const agent = getAgentById(id || "");
  const agentListings = agent ? getListingsByAgent(agent.id) : [];
  const [contactModalOpen, setContactModalOpen] = useState(false);

  if (!agent) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Agent not found</h1>
          <Link to="/agents">
            <Button>Back to Agents</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{agent.name} - Real Estate Agent | NestFinder</title>
        <meta name="description" content={agent.bio.substring(0, 160)} />
      </Helmet>
      <Layout>
        {/* Profile Header */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row items-center gap-8"
            >
              <img
                src={agent.image}
                alt={agent.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-primary-foreground/20"
              />
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
                    {agent.name}
                  </h1>
                  {agent.verified && (
                    <CheckCircle2 className="w-7 h-7 text-accent" />
                  )}
                </div>
                <div className="flex items-center justify-center md:justify-start gap-4 text-primary-foreground/80 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-accent fill-accent" />
                    <span className="font-semibold">{agent.rating}</span>
                    <span>({agent.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-5 h-5" />
                    <span>{agent.experience} years</span>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {agent.specialization.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1 bg-primary-foreground/20 text-primary-foreground text-sm rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="font-display text-2xl font-semibold mb-4">About</h2>
                  <p className="text-muted-foreground leading-relaxed">{agent.bio}</p>
                </motion.div>

                {/* Agent's Listings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="font-display text-2xl font-semibold mb-6">
                    Properties by {agent.name} ({agentListings.length})
                  </h2>
                  {agentListings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {agentListings.map((listing, index) => (
                        <ListingCard key={listing.id} listing={listing} index={index} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No listings available at the moment.</p>
                  )}
                </motion.div>
              </div>

              {/* Sidebar */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card rounded-2xl p-6 shadow-card sticky top-24"
                >
                  <h3 className="font-display text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-secondary transition-colors"
                    >
                      <Mail className="w-5 h-5 text-primary" />
                      <span className="text-sm">{agent.email}</span>
                    </a>
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-secondary transition-colors"
                    >
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="text-sm">{agent.phone}</span>
                    </a>
                  </div>

                  <Button
                    className="w-full mt-6 btn-accent"
                    onClick={() => setContactModalOpen(true)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>

                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="font-display text-2xl font-bold text-primary">
                          {agent.listings}
                        </div>
                        <div className="text-sm text-muted-foreground">Listings</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="font-display text-2xl font-bold text-primary">
                          {agent.reviewCount}
                        </div>
                        <div className="text-sm text-muted-foreground">Reviews</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <ContactModal
          open={contactModalOpen}
          onOpenChange={setContactModalOpen}
          agent={agent}
        />
      </Layout>
    </>
  );
}
