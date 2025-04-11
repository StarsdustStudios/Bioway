import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/ui/profile-dropdown'
import { Search } from '@/components/ui/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { getColumns } from './components/table-columns'
import { ProductDialogs } from './components/static/dialogs'
import { ProductTable } from './components/static/table'
import ProductProvider from '@/context/product-context'
import { productListSchema } from './data/schema'
import { product } from './data/products'
import { productData } from '@/components/data/product-data'

export default function ProductPage({ index }: { index: number }) {
  // Parse user list
  const userList = productListSchema.parse(product)

  return (
    <ProductProvider>
      <Header fixed>
        {/* <Search /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>{productData[index].productName}</h2>
            <p className='text-muted-foreground'>
              Atur layanan {productData[index].productName} anda disini
            </p>
          </div>
          <ProductPrimaryButton />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <ProductTable data={userList} columns={getColumns({index})} type={index}/>
        </div>
      </Main>
        <ProductDialogs type={index}/>
    </ProductProvider>
  )
}


import { IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useProduct } from '@/context/product-context'

function ProductPrimaryButton() {
  const { setOpen } = useProduct()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Tambahkan</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
