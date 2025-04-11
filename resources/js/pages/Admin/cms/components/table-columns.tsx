import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import LongText from '@/components/ui/long-text'
import { callTypes } from '../data/data'
import { Cms } from '../data/schema'
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header'
import { DataTableRowActions } from './static/data-table-row-actions'
import { cmsData } from '@/components/data/cms-data'

export function getColumns({ index }: { index: number }): ColumnDef<Cms>[] {

  const dynamicColumns = cmsData[index].cmsColumns.map((key, colIndex) => ({
      accessorKey: cmsData[index].cmsColDataset[colIndex],
      header: ({ column }: {column : any}) => (
        <DataTableColumnHeader column={column} title={key} />
      ),
      cell: ({ row }: {row : any}) => (
        <div className="w-fit text-nowrap">
          {
          // cmsData[index].cmsColDataset[colIndex] === "imgUrl" ? (
          //   <img src="/stardust.png" alt="Cms" className="w-16 h-16 rounded-lg" />
          // ) : (
            row.getValue(cmsData[index].cmsColDataset[colIndex])
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
