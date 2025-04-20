import { useItemData } from '@/context/item-data-context'
import { ItemDataActionDialog } from '../add-item-data-dialog'
import { UsersDeleteDialog } from '../delete-item-data-dialog'

export function ItemDataDialogs({ type }: { type: number }) {
  const { open, setOpen, currentRow, setCurrentRow } = useItemData()
  return (
    <>
      <ItemDataActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
        type = {type}
      />

      {currentRow && (
        <>
          <ItemDataActionDialog
            key={`user-edit-${currentRow.title}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
            type = {type}
          />

          <UsersDeleteDialog
            key={`user-delete-${currentRow.title}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
