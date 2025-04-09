import { IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useCms } from '../../../../../context/cms-context'

export function CmsPrimaryButton() {
  const { setOpen } = useCms()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Tambahkan</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
