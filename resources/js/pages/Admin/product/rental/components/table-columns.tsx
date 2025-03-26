import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { callTypes, userTypes } from '../data/data'
import { Product } from '../data/schema'
import { DataTableColumnHeader } from './static/data-table-column-header'
import { DataTableRowActions } from './static/data-table-row-actions'
import { fa } from '@faker-js/faker'
import { productData } from '@/components/layout/data/product-data'

export function getColumns({ index }: { index: number }): ColumnDef<Product>[] {

  const dynamicColumns = productData[index].productColumns.map((key) => ({
    
      accessorKey: "email",
      header: ({ column }: {column : any}) => (
        <DataTableColumnHeader column={column} title={key} />
      ),
      cell: ({ row }: {row : any}) => (
        <div className='w-fit text-nowrap'>{row.getValue('email')}</div>
      ),
      enableSorting: false,
    
  }));
  
  return [
    {
      id: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Id/Nopol" />
      ),
      cell: ({ row }) => {
        const { firstName, lastName } = row.original;
        return (
          <LongText className='max-w-36'>{`${firstName} ${lastName}`}</LongText>
        );
      },
      meta: { className: 'w-36' },
      enableSorting: true,
    },
    ...dynamicColumns,
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Status' />
      ),
      cell: ({ row }) => {
        const { status } = row.original;
        const badgeColor = callTypes.get(status);
        return (
          <div className='flex space-x-2'>
            <Badge variant='outline' className={cn('capitalize', badgeColor)}>
              {row.getValue('status')}
            </Badge>
          </div>
        );
      },
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: 'actions',
      cell: DataTableRowActions,
    },
  ];
}
