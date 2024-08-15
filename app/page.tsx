'use client'

import { useState, useMemo } from 'react'
import SearchBar from '@/components/SearchBar'
import RepoList from '@/components/RepoList'
import Filter from '@/components/Filter'
import { Repository } from '@/types'

export default function Home() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [minStars, setMinStars] = useState('')

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

  const handleSearch = async (query: string) => {
    if (!query) return
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}&sort=stars`
      )
      const data = await response.json()
      setRepos(data.items)
    } catch (error) {
      console.error('Error fetching repos:', error)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          GitHub Repository Explorer
        </h1>
        <SearchBar onSearch={handleSearch} />
        {repos.length > 0 && (
          <Filter
            languages={languages}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            onStarCountChange={setMinStars}
          />
        )}
        {loading ? (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <RepoList repositories={filteredRepos} />
        )}
      </div>
    </main>
  )
}
