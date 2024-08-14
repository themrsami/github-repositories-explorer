import RepoCard from './RepoCard'
import { Repository } from '@/types'

interface RepoListProps {
  repositories: Repository[]
}

const RepoList = ({ repositories }: RepoListProps) => {
  if (!repositories.length) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {repositories.map((repo) => (
        <RepoCard key={repo.id} repository={repo} />
      ))}
    </div>
  )
}

export default RepoList
