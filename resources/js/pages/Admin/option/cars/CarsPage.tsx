import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ProfileDropdown } from '@/components/ui/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header'
import { DataTablePagination } from '@/components/tables/data-table-pagination'
import { DataTableViewOptions } from '@/components/tables/data-table-view-options'
import ItemDataProvider, { useItemData } from '@/context/item-data-context'
import { itemDatas } from '@/components/data/item-data'
import { IconEdit, IconTrash, IconUserPlus } from '@tabler/icons-react'
import { Cross2Icon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { ItemDataActionDialog } from './components/add-item-data-dialog'
import { UsersDeleteDialog } from './components/delete-item-data-dialog'
import {
  ColumnDef,
  Row,
  Table as ReactTable,
  ColumnFiltersState,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { CarGetData, brandListSchema, carListSchema, carSchema } from './components/schema'
import { BrandGetData } from '../brand/components/schema'
import { ItemDataPrimaryButton } from '@/components/layout/Admin/ItemDataPrimaryButton'
import { languageData } from '@/components/data/strings'

let brandList: BrandGetData[] | undefined = undefined

const getBrandImage = (brandId : number) => {
  if (brandList != undefined) {
  return brandList.find((brand: BrandGetData) => brand.id === brandId)?.brand_logo;
  }
};



export default function CarsPage({ index, data }: { index: number; data: any }) {
  const userList = carListSchema.parse(data.cars)
  brandList= brandListSchema.parse(data.brands)
  const strings = languageData.languageTexts;
  return (
    <ItemDataProvider>
      <Header fixed>
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
            {strings.setService} {itemDatas[index].optionName} {strings.setService2}
            </p>
          </div>
          <ItemDataPrimaryButton/>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CarGetDataTable data={userList} columns={getColumns({index})}/>
        </div>
      </Main>
        <ItemDataDialogs type={index}/>
    </ItemDataProvider>
  )
}

function ItemDataDialogs({ type }: { type: number }) {
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


function getColumns({ index }: { index: number }): ColumnDef<CarGetData>[] {
  const dynamicColumns = itemDatas[index].optionColumns.map((key, colIndex) => ({
    accessorKey: itemDatas[index].optionColDataset[colIndex],
    header: ({ column }: { column: any }) => (
      <DataTableColumnHeader column={column} title={key} />
    ),
    cell: ({ row }: { row: any }) => (
      <div className="w-fit text-nowrap">
        {
          itemDatas[index].optionColDataset[colIndex] === "car_image" ? (
            <img
              src={row.getValue(itemDatas[index].optionColDataset[colIndex])}
              alt="Car Image"
              className="w-16 h-9 rounded-lg"
            />
          ) : itemDatas[index].optionColDataset[colIndex] === "brand_id" ? (
            // Handle brand_id column
            <img
              src={getBrandImage(row.getValue(itemDatas[index].optionColDataset[colIndex]))}
              alt="Brand Logo"
              className="w-16 h-16 rounded-lg"
            />
          ) : (
            // Default behavior for other columns
            row.getValue(itemDatas[index].optionColDataset[colIndex])
          )
        }
      </div>
    ),
    enableSorting: itemDatas[index].optionColDataset[colIndex] === "model" ? true : false,
    enableHiding: false,

  }));

  return [
    ...dynamicColumns,
    {
      accessorKey: 'id',
      header: '',
      enableSorting: false,
      enableHiding: false, // cannot be toggled
    },
    {
      id: 'actions',
      header: 'Action',
      cell: DataTableRowActions,
    },
  ];
}




interface DataTableRowActionsProps {
  row: Row<CarGetData>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useItemData()
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('edit')
            }}
          >
            Edit
            <DropdownMenuShortcut>
              <IconEdit size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('delete')
            }}
            className='!text-red-500'
          >
            Delete
            <DropdownMenuShortcut>
              <IconTrash size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}


declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string
  }
}

interface DataTableProps {
  columns: ColumnDef<CarGetData>[]
  data: CarGetData[]
}

function CarGetDataTable({columns, data}: DataTableProps) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table} />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='group/row'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={header.column.columnDef.meta?.className ?? ''}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='group/row'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell.column.columnDef.meta?.className ?? ''}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}


interface DataTableToolbarProps<TData> {
  table: ReactTable<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter...'
          value={
            (table.getColumn('model')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('model')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
