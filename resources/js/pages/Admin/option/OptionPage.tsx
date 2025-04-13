import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/ui/profile-dropdown'
import { Search } from '@/components/ui/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { getColumns } from './components/table-columns'
import { ItemDataDialogs } from './components/static/dialogs'
import { ItemDataPrimaryButton } from './components/static/add-item-data-btn'
import { OptionDataTable } from './components/static/table'
import ItemDataProvider from '@/context/item-data-context'
import { itemListSchema } from './data/schema'
import { optionData } from './data/option'
import { itemDatas } from '@/components/data/item-data'
import { usePage } from '@inertiajs/react'
import { SharedData } from '@/types'

export default function ItemDataPage({ index }: { index: number }, {data}) {
  // Parse user list
  const userList = itemListSchema.parse(data.brands)
  
  return (
    <ItemDataProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>{itemDatas[index].optionName}</h2>
            <p className='text-muted-foreground'>
              Atur layanan {itemDatas[index].optionName} anda disini
            </p>
          </div>
          <ItemDataPrimaryButton />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <OptionDataTable data={userList} columns={getColumns({index})} type={index}/>
        </div>
        <script>
          console.log(data)
        </script>
      </Main>
        <ItemDataDialogs type={index}/>
    </ItemDataProvider>
  )
}
