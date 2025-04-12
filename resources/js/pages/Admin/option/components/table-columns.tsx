import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import LongText from '@/components/ui/long-text'
import { callTypes } from '../data/data'
import { OptionData } from '../data/schema'
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header'
import { DataTableRowActions } from './static/data-table-row-actions'
import { itemDatas } from '@/components/data/item-data'

export function getColumns({ index }: { index: number }): ColumnDef<OptionData>[] {

  const dynamicColumns = itemDatas[index].optionColumns.map((key, colIndex) => ({
    accessorKey: itemDatas[index].optionColDataset[colIndex],
    header: ({ column }: { column: any }) => (
      <DataTableColumnHeader column={column} title={key} />
    ),
    cell: ({ row }: { row: any }) => (
      <div className="w-fit text-nowrap">
        {row.getValue(itemDatas[index].optionColDataset[colIndex])}
      </div>
    ),
    enableSorting: false,
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

