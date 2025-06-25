import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import { config } from '@/config'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAuthGuard from '@/hooks/use-auth-guard'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  useAuthGuard()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      if (form.email === '' || form.password === '') {
        toast.error('Please fill all fields')
        return
      }

      if (form.password === '123456') {
        toast.error('Just kidding, please use a real password 😛')
        return
      }

      const response = await axios.post(`${config.apiUrl}/api/v1/login`, form)

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data))

        toast.success('Account created successfully. You can now login.')

        window.location.href = '/app'
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } else if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <img src='/logo.png' alt='logo' className='mx-auto mb-6 w-20 h-20' />
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  autoComplete='off'
                  autoSave='off'
                  onChange={onChangeInput}
                  required
                />
              </div>
              <div className='grid gap-3'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  <Link
                    to='#'
                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                    onClick={() => {
                      toast('Not implemented yet')
                    }}
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id='password'
                  type='password'
                  autoComplete='off'
                  autoSave='off'
                  onChange={onChangeInput}
                  placeholder='My password is 123456 😎'
                  required
                />
              </div>
              <div className='flex flex-col gap-3'>
                <Button type='submit' className='w-full'>
                  Login
                </Button>
              </div>
            </div>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link to='/register' className='underline underline-offset-4'>
                Register
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
