'use client'
import { Repository } from '@/types/index'
import { X } from 'lucide-react'

interface RepoDetailsProps {
  repository: Repository
  onClose: () => void
}

const RepoDetails = ({ repository, onClose }: RepoDetailsProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">{repository.name}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{repository.description}</p>
        <div className="space-y-2">
        <p>Owner: {repository.owner.login}</p>
          <p>Stars: {repository.stargazers_count.toLocaleString()}</p>
          <p>Forks: {repository.forks_count.toLocaleString()}</p>
          {repository.language && <p>Language: {repository.language}</p>}
        </div>
        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View on GitHub
        </a>
      </div>
    </div>
  )
}

export default RepoDetails
