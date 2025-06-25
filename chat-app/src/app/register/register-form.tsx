import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(form)
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
