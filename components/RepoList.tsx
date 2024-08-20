import RepoCard from './RepoCard'
import { Repository } from '@/types/index'

interface RepoListProps {
  repositories: Repository[]
  onShowDetails: (repo: Repository) => void
}

const RepoList = ({ repositories, onShowDetails }: RepoListProps) => {
  if (!repositories.length) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {repositories.map((repo) => (
        <RepoCard 
          key={repo.id} 
          repository={repo} 
          onShowDetails={onShowDetails}
        />
      ))}
    </div>
  )
}

export default RepoList
