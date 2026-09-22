"use client";

import { useState } from "react";
import { deleteProduct } from "@/app/actions";
import PriceChart from "./PriceChart.jsx";
import {
  ExternalLink,
  Trash2,
  TrendingDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const [showChart, setShowChart] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Remove this product from tracking?")) return;
    setDeleting(true);
    await deleteProduct(product.id);
  };

  return (
    <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
      {/* Card header */}
      <div className="p-5 flex gap-4">
        {product.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg border border-white/10 shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white/90 text-sm line-clamp-2 mb-3 leading-snug">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              {product.currency} {product.current_price}
            </span>
            <span className="text-xs text-white/30 border border-white/10 rounded-full px-2 py-0.5 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              Tracking
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 pb-4 flex gap-2 border-t border-white/5 pt-3">
        <button
          onClick={() => setShowChart(!showChart)}
          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors"
        >
          {showChart ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {showChart ? "Hide Chart" : "Price History"}
        </button>

        <span className="text-white/10">·</span>

        <Link
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Product
        </Link>

        <span className="ml-auto">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 text-xs text-white/20 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remove
          </button>
        </span>
      </div>

      {/* Chart */}
      {showChart && (
        <div className="border-t border-white/5 px-5 pb-5 pt-4">
          <PriceChart productId={product.id} />
        </div>
      )}
    </div>
  );
}