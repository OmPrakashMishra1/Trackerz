import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { Rabbit, Shield, Bell, TrendingDown } from "lucide-react";
import Image from "next/image";
import { getProducts } from "./actions";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];
  
  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description: "Extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description: "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];

  return (
    <main className="min-h-screen bg-white" suppressHydrationWarning={true}>

      {/* ── Header ── */}
      <header className="bg-black border-b border-white/10 sticky top-0 z-10">
        <div className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
          <Image
            src="/trackerz-logo.svg"
            alt="Trackerz"
            width={600}
            height={200}
            className="h-8 w-auto invert"
          />
          <AuthButton user={user} />
        </div>
      </header>

      {/* ── Hero (dark) ── */}
      <section className="bg-black text-white py-28 px-6 animate-fade-in">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-white/15 text-white/50 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase mb-8">
            Made with ❤️ by OM PRAKASH
          </div>
          <h1 className="text-6xl font-bold text-white mb-5 tracking-tight leading-[1.08]">
            Never Miss a<br />Price Drop
          </h1>
          <p className="text-lg text-white/50 mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Track prices from any e-commerce site. Get instant alerts when
            prices drop. Save money effortlessly.
          </p>
          <AddProductForm user={user} />
        </div>
      </section>

      {/* ── Feature cards (only when no products) ── */}
      {products.length === 0 && (
        <section className="bg-black border-t border-white/5 py-16 px-6">
          <div className="grid md:grid-cols-3 gap-px max-w-4xl mx-auto bg-white/10 rounded-xl overflow-hidden">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-black p-8 hover:bg-white/5 transition-colors"
              >
                <div className="w-9 h-9 border border-white/15 rounded-lg flex items-center justify-center mb-5">
                  <Icon className="w-4 h-4 text-white/70" />
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Products grid ── */}
      {user && products.length > 0 && (
        <section className="bg-[#0a0a0a] min-h-screen px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold text-white">
                Tracked Products
              </h2>
              <span className="text-xs text-white/30 font-mono">
                {products.length} {products.length === 1 ? "item" : "items"}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 items-start">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Empty state ── */}
      {user && products.length === 0 && (
        <section className="bg-[#0a0a0a] px-6 py-16 text-center">
          <div className="max-w-sm mx-auto border border-white/10 rounded-xl p-12">
            <TrendingDown className="w-10 h-10 text-white/20 mx-auto mb-4" />
            <h3 className="text-sm font-semibold text-white mb-1">
              No products yet
            </h3>
            <p className="text-xs text-white/40">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}
    </main>
  );
}