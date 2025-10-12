'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Github } from "lucide-react"
import { useTranslations } from 'next-intl';

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const t = useTranslations('LoginModal');
  const [isLoading, setIsLoading] = useState(false)

  const handleGithubLogin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/auth/github", { method: "POST" });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("GitHub login failed:", error)
      setIsLoading(false)
      try { window.location.href = '/auth/auth-code-error' } catch {}
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/auth/google", { method: "POST" });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Google login failed:", error)
      setIsLoading(false)
      try { window.location.href = '/auth/auth-code-error' } catch {}
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md min-h-[420px]">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Button
            onClick={handleGithubLogin}
            className="w-full bg-[#24292e] hover:bg-[#1f2327] text-white"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Github className="mr-2 h-4 w-4" />
            )}
            {t('github')}
          </Button>

          <Button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-[#3c4043] border border-gray-300 hover:bg-gray-50"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              // Google "G" logo (brand colors)
              <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.52 0 6.72 1.26 9.22 3.35l6.86-6.86C35.78 2.52 30.22 0 24 0 14.64 0 6.56 5.34 2.56 13.1l7.94 6.17C12.4 13.14 17.8 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.5 24.5c0-1.7-.15-3.33-.43-4.9H24v9.28h12.7c-.55 2.97-2.21 5.49-4.7 7.18l7.22 5.6C43.86 37.95 46.5 31.65 46.5 24.5z"/>
                <path fill="#FBBC05" d="M10.5 28.27A14.5 14.5 0 0 1 9.5 24c0-1.49.25-2.93.7-4.27l-7.94-6.17A24.02 24.02 0 0 0 0 24c0 3.9.93 7.57 2.56 10.9l7.94-6.17z"/>
                <path fill="#34A853" d="M24 48c6.22 0 11.45-2.05 15.27-5.58l-7.22-5.6c-2.01 1.36-4.6 2.16-8.05 2.16-6.2 0-11.6-3.64-13.5-8.27l-7.94 6.17C6.56 42.66 14.64 48 24 48z"/>
              </svg>
            )}
            {t('google')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}