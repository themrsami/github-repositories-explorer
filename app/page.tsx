'use client'

import { useState, useMemo, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import RepoList from '@/components/RepoList'
import Filter from '@/components/Filter'
import TabView from '@/components/TabView'
import { Repository } from '@/types'
import ErrorMessage from '@/components/ErrorMessage'

export default function Home() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [minStars, setMinStars] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<'stars' | 'forks' | 'updated'>('stars')
  const ITEMS_PER_PAGE = 10
  const [activeTab, setActiveTab] = useState('search')
  const [trendingRepos, setTrendingRepos] = useState<Repository[]>([])
  const [recentRepos, setRecentRepos] = useState<Repository[]>([])

  // Extract unique languages from repos
  const languages = useMemo(() => {
    const langSet = new Set(repos.map(repo => repo.language).filter(Boolean))
    return Array.from(langSet)
  }, [repos])

  // Filter repositories based on selected criteria
  const filteredRepos = useMemo(() => {
    return repos.filter(repo => {
      const languageMatch = !selectedLanguage || repo.language === selectedLanguage
      const starsMatch = !minStars || repo.stargazers_count > parseInt(minStars)
      return languageMatch && starsMatch
    })
  }, [repos, selectedLanguage, minStars])

  const fetchTrendingRepos = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=100`
      )
      const data = await response.json()
      setTrendingRepos(data.items)
    } catch (error) {
      setError('Failed to fetch trending repositories')
    }
    setLoading(false)
  }

  const fetchRecentRepos = async () => {
    setLoading(true)
    try {
      const date = new Date()
      date.setDate(date.getDate() - 7) // Last 7 days
      const dateString = date.toISOString().split('T')[0]
      
      const response = await fetch(
        `https://api.github.com/search/repositories?q=created:>${dateString}&sort=updated&order=desc&per_page=100`
      )
      const data = await response.json()
      setRecentRepos(data.items)
    } catch (error) {
      setError('Failed to fetch recent repositories')
    }
    setLoading(false)
  }

  useEffect(() => {
    if (activeTab === 'trending') {
      fetchTrendingRepos()
    } else if (activeTab === 'recent') {
      fetchRecentRepos()
    }
  }, [activeTab])

  const handleSearch = async (query: string) => {
    if (!query) return
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}&sort=${sortBy}&page=${currentPage}&per_page=100`
      )
      if (!response.ok) {
        throw new Error('Failed to fetch repositories')
      }
      const data = await response.json()
      setRepos(data.items)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    }
    setLoading(false)
  }

  const totalPages = Math.ceil(repos.length / ITEMS_PER_PAGE)
  const paginatedRepos = filteredRepos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const displayedRepos = useMemo(() => {
    switch (activeTab) {
      case 'trending':
        return trendingRepos
      case 'recent':
        return recentRepos
      default:
        return filteredRepos
    }
  }, [activeTab, trendingRepos, recentRepos, filteredRepos])

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          GitHub Repository Explorer
        </h1>
        
        <TabView activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === 'search' && (
          <>
            <SearchBar onSearch={handleSearch} />
            {error && <ErrorMessage message={error} />}
            {repos.length > 0 && (
              <div className="flex justify-between items-center">
                <Filter
                  languages={languages}
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={setSelectedLanguage}
                  onStarCountChange={setMinStars}
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'stars' | 'forks' | 'updated')}
                  className="p-2 border rounded-lg"
                >
                  <option value="stars">Stars</option>
                  <option value="forks">Forks</option>
                  <option value="updated">Recently Updated</option>
                </select>
              </div>
            )}
          </>
        )}

        {loading ? (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <RepoList repositories={displayedRepos} />
        )}
      </div>
    </main>
  )
}
