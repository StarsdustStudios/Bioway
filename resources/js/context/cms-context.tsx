import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Cms } from '../pages/Admin/cms/data/schema'

type CmsDialogType = 'add' | 'edit' | 'delete'

interface CmsContextType {
  open: CmsDialogType | null
  setOpen: (str: CmsDialogType | null) => void
  currentRow: Cms | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Cms | null>>
}

const CmsContext = React.createContext<CmsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function CmsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<CmsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Cms | null>(null)

  return (
    <CmsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </CmsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCms = () => {
  const cmsContext = React.useContext(CmsContext)

  if (!cmsContext) {
    throw new Error('useCms has to be used within <CmsContext>')
  }

  return cmsContext
}
