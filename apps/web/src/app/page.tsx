'use client'

import { useLayoutEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { OriSidebar } from '@/components/ori-sidebar'
import { DashboardView } from '@/components/dashboard-view'
import { IntelligenceView } from '@/components/intelligence-view'
import { CRMView } from '@/components/crm-view'
import { AutomationView } from '@/components/automation-view'
import { EngagementView } from '@/components/engagement-view'
import { ComplianceView } from '@/components/compliance-view'
import { KnowledgeView } from '@/components/knowledge-view'
import { MarketingView } from '@/components/marketing-view'
import { SettingsView } from '@/components/settings-view'
import { SEOStudioView } from '@/components/seo-studio-view'
import { GlobalSearch } from '@/components/global-search'
import { cn } from '@/lib/utils'

export default function Home() {
  const { currentView, sidebarCollapsed, theme } = useAppStore()

  // Apply theme on mount and when theme changes
  useLayoutEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  // Show marketing page as the default/landing
  if (currentView === 'marketing') {
    return <MarketingView />
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />
      case 'intelligence':
        return <IntelligenceView />
      case 'crm':
        return <CRMView />
      case 'automation':
        return <AutomationView />
      case 'engagement':
        return <EngagementView />
      case 'seo':
        return <SEOStudioView />
      case 'compliance':
        return <ComplianceView />
      case 'tasks':
        return <KnowledgeView />
      case 'settings':
        return <SettingsView />
      default:
        return <DashboardView />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <OriSidebar />
      <main
        className={cn(
          'transition-all duration-300',
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        )}
      >
        {renderView()}
      </main>
      <GlobalSearch />
    </div>
  )
}
