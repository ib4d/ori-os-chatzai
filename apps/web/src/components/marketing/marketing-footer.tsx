'use client'

import { Zap, Twitter, Linkedin, Github, Youtube } from 'lucide-react'
import { useAppStore } from '@/lib/store'

type MarketingPage = Parameters<ReturnType<typeof useAppStore.getState>['setMarketingPage']>[0]

const footerLinks = {
  product: [
    { label: 'Features', page: 'features' as MarketingPage },
    { label: 'Pricing', page: 'pricing' as MarketingPage },
    { label: 'Integrations', page: 'integrations' as MarketingPage },
    { label: 'Changelog', page: 'changelog' as MarketingPage },
    { label: 'Roadmap', page: 'roadmap' as MarketingPage },
  ],
  company: [
    { label: 'About', page: 'about' as MarketingPage },
    { label: 'Blog', page: 'blog' as MarketingPage },
    { label: 'Careers', page: 'careers' as MarketingPage },
    { label: 'Press', page: 'press' as MarketingPage },
    { label: 'Contact', page: 'contact' as MarketingPage },
  ],
  resources: [
    { label: 'Documentation', page: 'docs' as MarketingPage },
    { label: 'API Reference', page: 'api' as MarketingPage },
    { label: 'Help Center', page: 'help' as MarketingPage },
    { label: 'Community', page: 'community' as MarketingPage },
    { label: 'Status', page: 'status' as MarketingPage },
  ],
  legal: [
    { label: 'Privacy Policy', page: 'privacy' as MarketingPage },
    { label: 'Terms of Service', page: 'terms' as MarketingPage },
    { label: 'Cookie Policy', page: 'cookies' as MarketingPage },
    { label: 'GDPR', page: 'gdpr' as MarketingPage },
    { label: 'Security', page: 'security' as MarketingPage },
  ],
}

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export function MarketingFooter() {
  const { setMarketingPage } = useAppStore()

  const handleNavigate = (page: MarketingPage) => {
    setMarketingPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <footer className="py-24 px-6 md:px-12 border-t border-white/10 bg-black">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <button
              onClick={() => handleNavigate('home')}
              className="flex items-center gap-2 mb-8"
            >
              <Zap className="h-6 w-6 text-axion-orange fill-current" />
              <span className="text-2xl font-black tracking-[-0.05em] text-white uppercase">AXION</span>
            </button>
            <p className="text-sm text-white/40 mb-10 leading-relaxed font-mono uppercase tracking-widest text-[10px]">
              Distribute intelligence. Scale autonomy. The core engine for modern infrastructure teams.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="h-10 w-10 flex items-center justify-center border border-white/10 text-white/20 hover:text-axion-orange hover:border-axion-orange/40 transition-all group"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          {['product', 'company', 'resources', 'legal'].map((section) => (
            <div key={section}>
              <h4 className="font-mono font-bold text-white mb-8 text-[10px] uppercase tracking-[0.3em]">{section}</h4>
              <ul className="space-y-6">
                {(footerLinks as any)[section].map((link: any) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavigate(link.page)}
                      className="text-[11px] font-mono font-bold text-white/40 hover:text-axion-orange transition-colors uppercase tracking-[0.15em] text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 bg-axion-green animate-pulse" />
            <p className="text-[10px] font-mono font-bold text-white/20 uppercase tracking-[0.4em]">
              © {new Date().getFullYear()} AXION_CORE // SYSTEM_STABLE
            </p>
          </div>
          <div className="flex items-center gap-8 text-[10px] font-mono font-bold text-white/20 uppercase tracking-[0.2em]">
            <button
              onClick={() => handleNavigate('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy_Protocol
            </button>
            <button
              onClick={() => handleNavigate('terms')}
              className="hover:text-white transition-colors"
            >
              Terms_Of_Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
