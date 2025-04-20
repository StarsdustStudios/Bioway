import { IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useItemData } from '@/context/item-data-context'

export function ItemDataPrimaryButton() {
  const { setOpen } = useItemData()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Tambahkan</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
