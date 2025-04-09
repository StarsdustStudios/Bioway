import { useCms } from '../../../../../context/cms-context'
import { CmsActionDialog } from '../add-cms-dialog'
import { UsersDeleteDialog } from '../delete-cms-dialog'

export function CmsDialogs({ type }: { type: number }) {
  const { open, setOpen, currentRow, setCurrentRow } = useCms()
  return (
    <>
      <CmsActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
        type = {type}
      />

      {currentRow && (
        <>
          <CmsActionDialog
            key={`user-edit-${currentRow.brand}`}
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
            key={`user-delete-${currentRow.brand}`}
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
