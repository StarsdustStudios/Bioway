import { useItemData } from "@/context/item-data-context"
import { Button } from "../../ui/button"
import { IconPlus } from "@tabler/icons-react"
import { languageData } from "@/components/data/strings"

export function ItemDataPrimaryButton() {
    const { setOpen } = useItemData()
    return (
      <div className='flex gap-2'>
        <Button className='space-x-1' onClick={() => setOpen('add')}>
          <span>{languageData.languageTexts.add}</span> <IconPlus size={18} />
        </Button>
      </div>
    )
  }