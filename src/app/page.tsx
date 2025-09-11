"use client";

import { motion } from "framer-motion";
import NavbarMain from "@/components/navbar/main";
import BottomNavBar from "@/components/navbar/main_bottom";
import StorePage from "./store/page";
import PageFooter from "@/components/footer";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] w-full text-gray-900 bg-[#F9F6F1] min-h-screen">
      <main className="w-full">
        <NavbarMain />

        {/* 🌟 Hero Section */}
        <section className="relative bg-[#F9F6F1] text-gray-900 px-6 py-24 text-center overflow-hidden">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Explore the Beauty of <br />
            African
            <span className="ml-2 text-yellow-600">Elegance</span>
          </motion.h1>
          <motion.p
            className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Timeless fashion rooted in tradition. Clothing that connects culture,
            memory, and identity.
          </motion.p>
          <motion.button
            className="mt-8 bg-[#C9A44C] text-white px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.button>
        </section>

        {/* 🛍 Store Section */}
        <StorePage />

        {/* 🌿 Brand Story Section */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-6xl mx-auto space-y-24">
            {/* Section Block */}
            <motion.div
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-4xl font-bold mb-6">UDAMMA FASHION | <span className="text-yellow-600">Brand Scroll</span></h2>
                <h3 className="text-2xl font-semibold mb-4">Our Essence</h3>
                <p className="text-gray-700 leading-relaxed">
                  Udamma is more than a fashion brand. It is a return to
                  wholeness—through clothing, culture, and connection. Every
                  thread carries a story. Every piece is designed with
                  intention. We create garments that restore—not just style, but
                  the deeper sense of belonging to self, to community, and to
                  origin.
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  We are here to reclaim beauty as a language of memory. To
                  remind ourselves and each other that we are allowed to feel
                  good, radiant, rooted.
                </p>
              </div>
              <div className="bg-amber-100 rounded-xl h-80 shadow-inner" />
            </motion.div>

            {/* What We’re Doing */}
            <motion.div
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="order-2 md:order-1 bg-indigo-100 rounded-xl h-80 shadow-inner" />
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-semibold mb-4">What We’re Doing</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Through seasonal capsule collections, we:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Weave African legacy into modern silhouettes</li>
                  <li>Celebrate community through cultural storytelling</li>
                  <li>Offer fashion as a source of joy, remembrance, and dignity</li>
                </ul>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  We don’t create for trends—we create for resonance. Our pieces
                  are designed to be worn, cherished, passed on. Each garment
                  holds the energy of hands, laughter, ancestry, and vision.
                </p>
              </div>
            </motion.div>

            {/* Brighter Future */}
            <motion.div
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-4">Our Brighter Future</h3>
                <p className="text-gray-700 leading-relaxed">
                  We are walking gently toward a world where people wear what
                  they believe in. Where fashion becomes a portal to deeper
                  self-respect. Where community gatherings include beauty, joy,
                  and reflection.
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  Our future includes gardens, gatherings, and garments—all woven
                  into harmony. Udamma is part of a living system that nourishes
                  not only what we wear, but how we live, and how we connect.
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed font-medium">
                  This is clothing with memory. <br />
                  This is design with purpose. <br />
                  This is Udamma.
                </p>
              </div>
              <div className="bg-emerald-100 rounded-xl h-80 shadow-inner" />
            </motion.div>

            {/* About Section */}
            <motion.div
              className="bg-[#F9F6F1] p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-semibold mb-6">About Udamma</h3>
              <p className="text-gray-700 leading-relaxed">
                Udamma means Synergy in the Nigerian language of Igala; a
                testament that we are better when we work together. It is the
                spirit of bringing people, cultures, and stories together into
                one shared fabric.
              </p>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Udamma is a culture-forward fashion label creating
                limited-edition collections that blend African heritage with
                contemporary design. We believe clothing can do more than
                cover—it can connect. Our seasonal capsules are intentionally
                crafted to reflect rhythm, meaning, and beauty in every stitch.
              </p>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Rooted in both Victoria Island, Nigeria and Vancouver Island,
                Canada, Udamma bridges tradition and trend through timeless
                fashion, bespoke pieces, and wearable storytelling. Each piece
                is designed to celebrate identity, community, and creative
                excellence.
              </p>
              <p className="mt-4 text-gray-700 leading-relaxed">
                We proudly support fair trade with local artisans in less
                affluent communities, ensuring their skills and creativity are
                valued and rewarded. This means your purchases are not only
                fashion statements—they are lifelines.
              </p>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Every purchase supports more than fashion—it fuels a movement. A
                movement to uplift culture, honour craftsmanship, and celebrate
                the beauty of belonging. With each garment shared, a ripple of
                good spreads outward: empowering artisans, connecting
                communities, and reminding us all our style can be a source of
                healing and joy.
              </p>
              <p className="mt-4 text-gray-700 leading-relaxed font-medium text-bold">
                Udamma is where culture meets craft. <br />
                Where legacy meets the present. <br />
                And where every thread tells a story.
              </p>
            </motion.div>
          </div>
        </section>

        <BottomNavBar />
      </main>
      <PageFooter />
    </div>
  );
}
