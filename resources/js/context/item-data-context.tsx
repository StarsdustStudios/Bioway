import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { ItemData } from '../pages/Admin/data/data/schema'

type ItemDataDialogType = 'add' | 'edit' | 'delete'

interface ItemDataContextType {
  open: ItemDataDialogType | null
  setOpen: (str: ItemDataDialogType | null) => void
  currentRow: ItemData | null
  setCurrentRow: React.Dispatch<React.SetStateAction<ItemData | null>>
}

const ItemDataContext = React.createContext<ItemDataContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function ItemDataProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<ItemDataDialogType>(null)
  const [currentRow, setCurrentRow] = useState<ItemData | null>(null)

  return (
    <ItemDataContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </ItemDataContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useItemData = () => {
  const itemDataContext = React.useContext(ItemDataContext)

  if (!itemDataContext) {
    throw new Error('useItemData has to be used within <ItemDataContext>')
  }

  return itemDataContext
}
