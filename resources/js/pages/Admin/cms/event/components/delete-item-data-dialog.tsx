'use client'

import { useState } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { EventGetData } from './schema'
import { router } from '@inertiajs/react'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: EventGetData
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('')

    
  const handleDelete = () => {
    if (!currentRow || !currentRow.id) {
      toast({
        title: 'Delete Failed',
        description: 'Invalid ID. Cannot delete this item.',
      });
      return;
    }
  
    if (value.trim() !== currentRow.name) {
      toast({
        title: 'Delete Failed',
        description: 'The entered event name does not match.',
      });
      return;
    }
    console.log(currentRow.id)
    router.delete(route('cms.events.destroy', currentRow.id), {
      preserveScroll: true,
      onSuccess: () => {
        console.log('Deleted!')
        window.location.replace('/cms/events')
      }
    })    
  }
    
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.name}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='mr-1 inline-block stroke-destructive'
            size={18}
          />
          Delete User
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.name}</span>?
            <br />
            This action will permanently remove this event from the system. This cannot be undone.
          </p>

          <Label className='my-2'>
            Confirm by typing <span className='font-bold'>{currentRow.name}</span>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter Event Name to confirm deletion.'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation cannot be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}
