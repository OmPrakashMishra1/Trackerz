"use client"
import React from 'react'
import { Button } from './ui/button'
import { LogIn, LogOut } from 'lucide-react'
import AuthModal from './AuthModal'
import { signOut } from '@/app/actions'

const AuthButton = ({user}) => {
    const [showAuthModal , setShowAuthModal] = React.useState(false);

    if (user) {
    return (
      <form action={signOut}>
        {/* Kept variant="ghost" as it is neutral, but you can add text-purple-600 if desired */}
        <Button variant="ghost" size="sm" type="submit" className="gap-2">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </form>
    );
  }

  return (
    <div>
      {/* Changed bg-orange-500 to bg-purple-600 and hover:bg-orange-600 to hover:bg-purple-700 */}
      <Button 
        onClick={() => setShowAuthModal(true)} 
        variant="default" 
        size="sm" 
        className="bg-purple-600 hover:bg-purple-700 gap-2"
      >
        <LogIn className="h-4 w-4" />
        Sign In
      </Button>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  )
}

export default AuthButton