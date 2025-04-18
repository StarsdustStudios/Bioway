import { Button } from '@/components/ui/button'
import { router } from '@inertiajs/react'

export default function UnauthorisedError() {
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>401</h1>
        <span className='font-medium'>Unauthorized Access</span>
        <p className='text-center text-muted-foreground'>
          Please log in with the appropriate credentials <br /> to access this
          resource.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => router.visit(document.referrer)}>
            Go Back
          </Button>
          <Button onClick={() => router.visit('/')}>Back to Home</Button>
        </div>
      </div>
    </div>
  )
}
