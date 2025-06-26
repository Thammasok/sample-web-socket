import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { useState } from 'react'
import { Link } from 'react-router'
import { config } from '@/config'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [form, setForm] = useState({
    displayName: '',
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

      if (form.displayName === '' || form.email === '' || form.password === '') {
        toast.error('Please fill all fields')
        return
      }

      const response = await axios.post(`${config.apiUrl}/api/v1/register`, form)

      if (response.status === 201) {
        localStorage.setItem('user', JSON.stringify(response.data.data))

        toast.success('Account created successfully. You can now login.')

        window.location.href = '/app'
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message.includes('E11000')) {
          toast.error('Email already exists')
        } else {
          toast.error(error.response?.data.message)
        }
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
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Display Name</Label>
                <Input
                  id='displayName'
                  type='text'
                  placeholder='John Doe'
                  autoComplete='off'
                  autoSave='off'
                  max={100}
                  onChange={onChangeInput}
                  autoFocus
                  required
                />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  autoComplete='off'
                  autoSave='off'
                  max={100}
                  onChange={onChangeInput}
                  required
                />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='Password'
                  autoComplete='off'
                  autoSave='off'
                  max={64}
                  min={4}
                  onChange={onChangeInput}
                  required
                />
              </div>
              <div className='flex flex-col gap-3'>
                <Button type='submit' className='w-full'>
                  Register
                </Button>
              </div>
            </div>
            <div className='mt-4 text-center text-sm'>
              I have account{' '}
              <Link to='/login' className='underline underline-offset-4'>
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
