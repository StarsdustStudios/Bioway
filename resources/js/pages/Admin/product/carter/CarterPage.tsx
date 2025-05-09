import React from 'react'
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
import { productData } from '@/components/data/product-data'
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
import { CarterGetData, carListSchema, carterListSchema } from './components/schema'
import { CarGetData } from '../../option/cars/components/schema'
import { LocationGetData, locationGetSchema } from '../../option/location/components/schema'
import { ItemDataPrimaryButton } from '@/components/layout/Admin/ItemDataPrimaryButton'
import { languageData } from '@/components/data/strings'

let carList: CarGetData[] | undefined = undefined
let locationList: LocationGetData[] | undefined = undefined

const getCarImage = (carId : number) => {
  if (carList != undefined) {
  return carList.find((car: CarGetData) => car.id === carId)?.car_image;
  }
};

const getLocation = (locationId : number) => {
  if (locationList != undefined) {
  return locationList.find((location: LocationGetData) => location.id === locationId)?.city_name;
  }
};


export default function CarterPage({ index, data }: { index: number; data: any }) {
  const userList = carterListSchema.parse(data.carter)
  carList= carListSchema.parse(data.cars)
  locationList = locationGetSchema.parse(data.locations);
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
            <h2 className='text-2xl font-bold tracking-tight'>{productData[index].productName}</h2>
            <p className='text-muted-foreground'>
            {strings.setService} {productData[index].productName} {strings.setService2}
            </p>
          </div>
          <ItemDataPrimaryButton/>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CarterGetDataTable data={userList} columns={getColumns({index})}/>
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


function getColumns({ index }: { index: number }): ColumnDef<CarterGetData>[] {
  const dynamicColumns = productData[index].productColumns.map((key, colIndex) => ({
    accessorKey: productData[index].productColDataset[colIndex],
    header: ({ column }: { column: any }) => (
      <DataTableColumnHeader column={column} title={key} />
    ),
    cell: ({ row }: { row: any }) => (
      <div className="w-fit text-nowrap">
        {
          productData[index].productColDataset[colIndex] === "car_id" ? (
            <img
              src={getCarImage(row.getValue(productData[index].productColDataset[colIndex]))}
              alt="Car Image"
              className="w-16 h-9 rounded-lg"
            />
          ) : productData[index].productColDataset[colIndex] === "location_id" ? (
            getLocation(row.getValue(productData[index].productColDataset[colIndex]))
          ) : (
            row.getValue(productData[index].productColDataset[colIndex])
          )
        }
      </div>
    ),
    enableSorting: ["price", "location_id"].includes(productData[index].productColDataset[colIndex]),
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
  row: Row<CarterGetData>
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
  columns: ColumnDef<CarterGetData>[]
  data: CarterGetData[]
}

function CarterGetDataTable({columns, data}: DataTableProps) {
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
            (table.getColumn('price')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('price')?.setFilterValue(event.target.value)
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
