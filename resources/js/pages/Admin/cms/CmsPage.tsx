import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { getColumns } from './components/table-columns'
import { CmsDialogs } from './components/static/dialogs'
import { CmsPrimaryButton } from './components/static/add-cms-btn'
import { CmsTable } from './components/static/table'
import CmsProvider from '../../../context/cms-context'
import { cmsListSchema } from './data/schema'
import { cms } from './data/cms'
import { cmsData } from '@/components/layout/data/cms-data'

export default function CmsPage({ index }: { index: number }) {
  // Parse user list
  const userList = cmsListSchema.parse(cms)

  return (
    <CmsProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>{cmsData[index].cmsName}</h2>
            <p className='text-muted-foreground'>
              Atur layanan {cmsData[index].cmsName} anda disini
            </p>
          </div>
          <CmsPrimaryButton />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CmsTable data={userList} columns={getColumns({index})} type={index}/>
        </div>
      </Main>
        <CmsDialogs type={index}/>
    </CmsProvider>
  )
}
