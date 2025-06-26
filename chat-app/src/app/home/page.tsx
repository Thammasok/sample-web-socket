export default function HomePage() {
  return (
    <div className='flex flex-col gap-4 justify-center items-center h-screen w-screen'>
      <img src='/logo.png' alt='ChitChat' className='w-24 h-24 animate-bounce' />
      <h1 className='text-4xl font-bold'>Welcome to Chat App</h1>
      <p>
        Please{' '}
        <a href='/login' className='text-blue-500 hover:text-blue-600 hover:underline'>
          login
        </a>{' '}
        or{' '}
        <a href='/register' className='text-blue-500 hover:text-blue-600 hover:underline'>
          Create an account
        </a>{' '}
        to continue.
      </p>
    </div>
  )
}
