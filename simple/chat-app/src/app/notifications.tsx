import type { Notification } from '@/app/chat-app'

interface NotificationsProps {
  notifications: Notification[]
}

const Notifications = ({ notifications }: NotificationsProps) => {
  const getNotificationColor = (type: Notification['type']): string => {
    switch (type) {
      case 'join':
        return 'bg-green-100 text-green-800'
      case 'leave':
        return 'bg-red-100 text-red-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    notifications.length > 0 && (
      <div className='mb-4 space-y-2'>
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-3 rounded-lg transition-opacity ${getNotificationColor(notif.type)}`}
          >
            {notif.message}
          </div>
        ))}
      </div>
    )
  )
}

export default Notifications
