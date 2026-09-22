"use client"
import React, { useState } from 'react'
import { Loader2Icon } from 'lucide-react';
import AuthModal from './AuthModal';
import { addProduct } from '@/app/actions';
import { toast } from 'sonner';

const AddProductForm = ({user}) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthModal , setShowAuthModal] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user){
      setShowAuthModal(true);
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("url", url);
    const result = await addProduct(formData);
    if(result.error){
      toast.error(result.error);
    } else {
      toast.success("Product added successfully!");
      setUrl("");
    }
    setLoading(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2 p-1.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste product URL (Amazon, Flipkart, etc.)"
            className="flex-1 bg-transparent text-white placeholder-white/30 text-sm px-4 py-3 outline-none"
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black text-sm font-medium px-6 py-3 rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 shrink-0"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2Icon className="h-4 w-4 animate-spin" />
                Adding...
              </span>
            ) : (
              "Track Price"
            )}
          </button>
        </div>
      </form>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  )
}

export default AddProductForm