import { ColumnDef } from '@tanstack/react-table'
import { OptionData } from '../data/schema'
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header'
import { DataTableRowActions } from './static/data-table-row-actions'
import { itemDatas } from '@/components/data/item-data'
import { usePage } from '@inertiajs/react'

interface Brand {
  id: number;
  name: string;
  brand_logo: string;
  created_at: string;
  updated_at: string;
  cars: Cars[];
}
interface Cars {
  model: string;
  brand_id: number;
  car_image: string;
  created_at: string;
  updated_at: string;
}

export function getColumns({ index }: { index: number }): ColumnDef<OptionData>[] {
  const { cars, brands } = usePage<{ cars: Cars[], brands: Brand[] }>().props
  const dynamicColumns = itemDatas[index].optionColumns.map((key, colIndex) => ({
    accessorKey: itemDatas[index].optionColDataset[colIndex],
    header: ({ column }: { column: any }) => (
      <DataTableColumnHeader column={column} title={key} />
    ),
    cell: ({ row }: { row: any }) => (
      <div className="w-fit text-nowrap">
          {
          itemDatas[index].optionColDataset[colIndex] === "car_image" ? (
            <img src={row.getValue(itemDatas[index].optionColDataset[colIndex])
            } alt="Car Image" className="w-16 h-16 rounded-lg" />
          ) : itemDatas[index].optionColDataset[colIndex] === "brand_id" ? (
            brands.find((brand: Brand) => brand.id === row.getValue(itemDatas[index].optionColDataset[colIndex]))?.name
          ):
          (
            row.getValue(itemDatas[index].optionColDataset[colIndex])
          )
          }
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

