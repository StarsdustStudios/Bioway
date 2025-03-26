import { IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useProduct } from '../../../../../context/product-context'

export function ProductPrimaryButton() {
  const { setOpen } = useProduct()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Tambahkan</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
