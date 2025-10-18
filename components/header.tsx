'use client'

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { ChevronDown, Globe, Sparkles } from "lucide-react"
import Link from "next/link"
import { LoginModal } from "@/components/login-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

interface HeaderProps {
  locale?: string;
}

export function Header({ locale: propLocale }: HeaderProps = {}) {
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [languageOpen, setLanguageOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    if (locale === 'zh') return '中文'
    if (locale === 'zh-TW') return '繁體中文'
    if (locale === 'ja') return '日本語'
    if (locale === 'fr') return 'Français'
    if (locale === 'it') return 'Italiano'
    if (locale === 'ko') return '한국어'
    return 'English'
  })
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)

  const supabase = createClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user?.id) {
        supabase
          .from('profiles')
          .select('nickname,username,full_name,avatar_url')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => {
            setProfile(data || null)
          })
          .catch(() => {
            setProfile(null)
          })
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  // 统一处理不同 OAuth 提供商的昵称与头像字段
  const userMeta = user?.user_metadata || {}
  const displayName = (
    profile?.nickname ||
    profile?.username ||
    profile?.full_name ||
    userMeta.full_name ||
    userMeta.name ||
    userMeta.nickname ||
    userMeta.user_name ||
    userMeta.preferred_username ||
    user?.email ||
    ''
  ) as string
  const avatarSrc = (
    profile?.avatar_url ||
    userMeta.avatar_url || // GitHub
    userMeta.picture ||    // Google
    userMeta.avatar ||
    ''
  ) as string

  // 更新选中的语言显示
  useEffect(() => {
    if (locale === 'zh') setSelectedLanguage('中文')
    else if (locale === 'zh-TW') setSelectedLanguage('繁體中文')
    else if (locale === 'ja') setSelectedLanguage('日本語')
    else if (locale === 'fr') setSelectedLanguage('Français')
    else if (locale === 'it') setSelectedLanguage('Italiano')
    else if (locale === 'ko') setSelectedLanguage('한국어')
    else setSelectedLanguage('English')
  }, [locale])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const languages = [
    { name: "English", code: "en" },
    { name: "中文", code: "zh" },
    { name: "繁體中文", code: "zh-TW" },
    { name: "日本語", code: "ja" },
    { name: "Français", code: "fr" },
    { name: "Italiano", code: "it" },
    { name: "한국어", code: "ko" },
  ]

  const handleLanguageChange = (lang: {name: string, code: string}) => {
    setSelectedLanguage(lang.name)
    setLanguageOpen(false)
    try {
      // 写入 Cookie 以便服务端读取
      document.cookie = `NEXT_LOCALE=${lang.code}; path=/; max-age=${60 * 60 * 24 * 365}`
      // 写入本地缓存
      localStorage.setItem('NEXT_LOCALE', lang.code)
    } catch {}
    // 刷新当前页面以应用语言更改（不使用前缀）
    window.location.reload()
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/`} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Video Generator
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#pricing" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
            {t('pricing')}
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div
            data-nohover
            className="relative hidden md:block"
            onMouseEnter={() => setLanguageOpen(true)}
            onMouseLeave={() => setLanguageOpen(false)}
          >
            <button className="flex items-center gap-2 text-gray-700 text-sm">
              <Globe className="w-4 h-4" />
              <span>{selectedLanguage}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {languageOpen && (
              <div className="absolute top-full right-0 pt-1 w-48">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2 max-h-80 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        selectedLanguage === lang.name ? "bg-purple-50 text-purple-600 font-medium" : "text-gray-700"
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            {t('generateVideo')}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer select-none">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatarSrc} alt={displayName} />
                    <AvatarFallback>{(displayName || user?.email || 'U')?.[0]}</AvatarFallback>
                  </Avatar>
                  <span>{displayName}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleSignOut}>{t('signOut')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent" onClick={() => setIsLoginModalOpen(true)}>
              {t('signIn')}
            </Button>
          )}
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  )
}