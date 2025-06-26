export default function NotFoundPage() {
  return (
    <div className='flex flex-col gap-4 justify-center items-center h-screen w-full'>
      <img src='/not-found-page.png' alt='ChitChat' className='w-40 h-40' />
      <h1 className='text-6xl font-bold'>Page not found</h1>
      <p className='text-lg text-gray-400'>Look like you're lost. or We not Implement it yet.</p>
      <a href='/' className='text-blue-500 hover:text-blue-600 hover:underline'>
        Go back to home
      </a>
    </div>
  )
}
