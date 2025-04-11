import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import LongText from '@/components/ui/long-text'
import { callTypes } from '../data/data'
import { Product } from '../data/schema'
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header'
import { DataTableRowActions } from './static/data-table-row-actions'
import { productData } from '@/components/data/product-data'

export function getColumns({ index }: { index: number }): ColumnDef<Product>[] {

  const dynamicColumns = productData[index].productColumns.map((key, colIndex) => ({
      accessorKey: productData[index].productColDataset[colIndex],
      header: ({ column }: {column : any}) => (
        <DataTableColumnHeader column={column} title={key} />
      ),
      cell: ({ row }: {row : any}) => (
        <div className="w-fit text-nowrap">
          {
          // productData[index].productColDataset[colIndex] === "imgUrl" ? (
          //   <img src="/stardust.png" alt="Product" className="w-16 h-16 rounded-lg" />
          // ) : (
            row.getValue(productData[index].productColDataset[colIndex])
          // )
          }
        </div>
      ),
      enableSorting: false,
    
  }));
  
  return [
    // {
    //   id: "id",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Id/Nopol" />
    //   ),
    //   cell: ({ row }) => {
    //     const { id } = row.original;
    //     return (
    //       <LongText className='max-w-36'>{id}</LongText>
    //     );
    //   },
    //   meta: { className: 'w-36' },
    //   enableSorting: true,
    // },
    ...dynamicColumns,
    // {
    //   accessorKey: 'status',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title='Status' />
    //   ),
    //   cell: ({ row }) => {
    //     const { status } = row.original;
    //     const badgeColor = callTypes.get(status);
    //     return (
    //       <div className='flex space-x-2'>
    //         <Badge variant='outline' className={cn('capitalize', badgeColor)}>
    //           {row.getValue('status')}
    //         </Badge>
    //       </div>
    //     );
    //   },
    //   filterFn: (row, id, value) => value.includes(row.getValue(id)),
    //   enableHiding: false,
    //   enableSorting: false,
    // },
    {
      id: 'actions',
      cell: DataTableRowActions,
    },
  ];
}
