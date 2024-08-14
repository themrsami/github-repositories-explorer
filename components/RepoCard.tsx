import { Repository } from '@/types'
import { Star, GitFork } from 'lucide-react'

interface RepoCardProps {
  repository: Repository
}

const RepoCard = ({ repository }: RepoCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2 text-blue-600">
        <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
          {repository.name}
        </a>
      </h2>
      <p className="text-gray-600 mb-4 line-clamp-2">{repository.description}</p>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-500 mr-1" />
          <span>{repository.stargazers_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <GitFork className="w-4 h-4 text-gray-500 mr-1" />
          <span>{repository.forks_count.toLocaleString()}</span>
        </div>
        <span className="text-sm text-gray-500">{repository.language}</span>
      </div>
    </div>
  )
}

export default RepoCard
