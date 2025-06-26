import { TerminalIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface ErrorMessagesProps {
  error: string | null
}

const ErrorMessages = ({ error }: ErrorMessagesProps) => {
  return (
    error && (
      <Alert variant='destructive'>
        <TerminalIcon />
        <AlertTitle>Error: </AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  )
}

export default ErrorMessages
