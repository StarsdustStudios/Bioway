'use client'

import { IconAlertTriangle } from '@tabler/icons-react'
import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { router } from '@inertiajs/react'
import { RentalGetData } from './schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: RentalGetData
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const handleDelete = () => {
    if (!currentRow || !currentRow.id) {
      toast({
        title: 'Delete Failed',
        description: 'Invalid ID. Cannot delete this item.',
      })
      return
    }

    router.delete(route('product.rental.destroy', currentRow.id), {
      preserveScroll: true,
      onSuccess: () => {
        console.log('Deleted!')
        window.location.replace('/product/rental')
      },
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
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
            Are you sure you want to delete this product?
            This action will permanently remove this product from the system.
          </p>

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
