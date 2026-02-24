'use client'

import { useEffect, useState, useCallback } from 'react'

interface DashboardStats {
  totalContacts: number
  totalCompanies: number
  activeDeals: number
  pipelineValue: number
  emailsSent: number
  openRate: number
  replyRate: number
  bounceRate: number
  activeCampaigns: number
  activeWorkflows: number
}

interface Activity {
  id: string
  type: string
  title: string | null
  description: string | null
  metadata: string | null
  occurredAt: string
  contact: {
    id: string
    firstName: string | null
    lastName: string | null
    email: string | null
  } | null
  company: {
    id: string
    name: string
  } | null
}

interface DashboardData {
  stats: DashboardStats
  recentActivities: Activity[]
}

interface UseDashboardResult {
  data: DashboardData | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useDashboard(): UseDashboardResult {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/dashboard')
      const result = await response.json()
      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || 'Failed to fetch dashboard data')
      }
    } catch (err) {
      setError('Failed to fetch dashboard data')
      console.error('Dashboard fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
