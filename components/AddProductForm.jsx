"use client"
import React, { useState } from 'react'
import { Loader2Icon } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
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
      setShowAuthModal(true); // Fixed: should be boolean true, not "true" string
      return; // Stop execution if not logged in
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("url", url);
    const result = await addProduct(formData);
    if(result.error){
      toast.error(result.error);
    }
     else{
      toast.success("Product added successfully!");
      setUrl("");
     }
     setLoading(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste product URL (Amazon, Walmart, etc.)"
            className="h-12 text-base focus-visible:ring-purple-500" // Added purple ring on focus
            required
            disabled={loading}
          />

          {/* Changed bg-orange-500 to bg-purple-600 and hover:bg-orange-600 to hover:bg-purple-700 */}
          <Button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 h-10 sm:h-12 px-8"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Track Price"
            )}
          </Button>
        </div>
      </form>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  )
}

export default AddProductForm