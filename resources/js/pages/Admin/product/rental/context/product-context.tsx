import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Product } from '../data/schema'

type ProductDialogType = 'add' | 'edit' | 'delete'

interface ProductContextType {
  open: ProductDialogType | null
  setOpen: (str: ProductDialogType | null) => void
  currentRow: Product | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Product | null>>
}

const ProductContext = React.createContext<ProductContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function ProductProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<ProductDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Product | null>(null)

  return (
    <ProductContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </ProductContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProduct = () => {
  const productContext = React.useContext(ProductContext)

  if (!productContext) {
    throw new Error('useProduct has to be used within <ProductContext>')
  }

  return productContext
}
