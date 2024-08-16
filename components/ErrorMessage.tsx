import { AlertCircle } from 'lucide-react'

interface ErrorMessageProps {
  message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg mt-4">
      <AlertCircle className="w-5 h-5" />
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage
