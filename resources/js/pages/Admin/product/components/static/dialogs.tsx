import { useProduct } from '@/context/product-context'
import { ProductsActionDialog } from '../add-product-dialog'
import { UsersDeleteDialog } from '../delete-product-dialog'

export function ProductDialogs({ type }: { type: number }) {
  const { open, setOpen, currentRow, setCurrentRow } = useProduct()
  return (
    <>
      <ProductsActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
        type = {type}
      />

      {currentRow && (
        <>
          <ProductsActionDialog
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
            key={`user-delete-${currentRow.id}`}
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
