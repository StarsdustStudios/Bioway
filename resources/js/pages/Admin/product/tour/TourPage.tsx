'use client'

import React, { useState } from 'react'
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
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { Cross2Icon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { ItemDataActionDialog } from './components/add-item-data-dialog'
import { TourGetData, tourListSchema } from './components/schema'
import { LocationGetData, locationGetSchema } from '../../option/location/components/schema'
import { UsersDeleteDialog } from './components/delete-item-data-dialog'
import { ItemDataPrimaryButton } from '@/components/layout/Admin/ItemDataPrimaryButton'
import { languageData } from '@/components/data/strings'
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

interface TourPageProps {
  index: number
  data: { tours: any[]; locations: any[] }
}

export default function TourPage({ index, data }: TourPageProps) {
  const tours = tourListSchema.parse(data.tours)
  const strings = languageData.languageTexts

  return (
    <ItemDataProvider>
      <Header fixed>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{productData[index].productName}</h2>
            <p className="text-muted-foreground">
              {strings.setService} {productData[index].productName} {strings.setService2}
            </p>
          </div>
          <ItemDataPrimaryButton />
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <TourGetDataTable
          data={tours}
          columns={getColumns(index)}
        />
        </div>
      </Main>
      <ItemDataDialogs type={index}/>
    </ItemDataProvider>
  )
}

function getColumns(index: number): ColumnDef<TourGetData>[] {
  const dynamicColumns: ColumnDef<TourGetData>[] = productData[index].productColumns.map((title, colIndex) => {
    const key = productData[index].productColDataset[colIndex]

    return {
      accessorKey: key,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={title} />
      ),
      cell: ({ row }) => {
        if (key === 'start') {
          const location = row.original.locations.find(loc => loc.id === row.getValue('start'))
          return <div>{location?.city_name ?? '-'}</div>
        }
        if (key === 'tour_image') {
          return (
            <img
              src={row.getValue(key)}
              alt="Tour"
              className="h-9 w-16 rounded-lg object-cover"
            />
          )
        }
        if (key === 'pivots') {
          const locations = [...row.original.locations].sort(
            (a, b) => a.pivot.id - b.pivot.id
          )
          const cityNames = locations.map(loc => loc.city_name).join(' - ')
          
          return <div>{cityNames}</div>
        }
        
        return <div>{row.getValue(key)}</div>
      },
      enableSorting: ['price', 'title'].includes(key),
      enableHiding: false,
    }
  })

  return [
    ...dynamicColumns,
    {
      accessorKey: 'id',
      header: '',
      enableSorting: false,
      enableHiding: true,
    },
    {
      id: 'actions',
      header: 'Action',
      cell: DataTableRowActions,
    },
  ]
}
interface ItemDataDialogsProps {
  type: number,
}
function ItemDataDialogs({ type}: ItemDataDialogsProps) {
  const { open, setOpen, currentRow, setCurrentRow } = useItemData()

  return (
    <>
      <ItemDataActionDialog
        key="user-add"
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
        type={type}

      />
      {currentRow && (
        <>
          <ItemDataActionDialog
            key={`user-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => setCurrentRow(null), 500)
            }}
            currentRow={currentRow}
            type={type}
          />
          <UsersDeleteDialog
            key={`user-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => setCurrentRow(null), 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}

interface DataTableProps {
  columns: ColumnDef<TourGetData>[]
  data: TourGetData[]
}

function TourGetDataTable({ columns, data }: DataTableProps) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ id: false })
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
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
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

function DataTableRowActions({ row }: { row: Row<TourGetData> }) {
  const { setOpen, setCurrentRow } = useItemData()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => {
          setCurrentRow(row.original)
          setOpen('edit')
        }}>
          Edit
          <DropdownMenuShortcut><IconEdit size={16} /></DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('delete')
          }}
          className="!text-red-500"
        >
          Delete
          <DropdownMenuShortcut><IconTrash size={16} /></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function DataTableToolbar<TData>({ table }: { table: ReactTable<TData> }) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Filter..."
          value={(table.getColumn('price')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('price')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
