import { Repository } from '@/types/index'
import { Star, GitFork } from 'lucide-react'
import Image from 'next/image'

interface RepoCardProps {
  repository: Repository
  onShowDetails: (repo: Repository) => void
}

const RepoCard = ({ repository, onShowDetails }: RepoCardProps) => {
  return (
    <div 
      className="glass-effect p-6 rounded-lg hover:scale-[1.02] transition-all duration-300 animate-slide-up dark:text-gray-100 cursor-pointer"
      onClick={() => onShowDetails(repository)}
    >
      <h2 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">
        <a href={repository.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {repository.name}
        </a>
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{repository.description}</p>
      <div className="flex items-center space-x-4">
        <div className="flex items-center hover:text-yellow-500 transition-colors">
          <Star className="w-4 h-4 text-yellow-500 mr-1" />
          <span>{repository.stargazers_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center hover:text-blue-500 transition-colors">
          <GitFork className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1" />
          <span>{repository.forks_count.toLocaleString()}</span>
        </div>
        <span className="text-sm px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          {repository.language}
        </span>
      </div>
      <div className="flex items-center mt-4">
        <Image
          src={repository.owner.avatar_url}
          alt={repository.owner.login}
          width={24}
          height={24}
          className="rounded-full mr-2"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {repository.owner.login}
        </span>
      </div>
    </div>
  )
}

export default RepoCard
