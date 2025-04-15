'use client'

import { z } from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { itemDatas } from '@/components/data/item-data'
import { OptionData } from '../data/schema'
import { router, usePage } from '@inertiajs/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'

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

// ✅ Zod schema (file can be any)
const formSchema = z.object({
  model: z.string().min(1, 'Model wajib diisi'),
  brand_id: z.string().min(1, 'Brand wajib diisi'),
  car_image: z
    .any()
    .refine((file) => file instanceof File, 'Logo wajib diunggah')
    .refine((file) => file?.size <= 2 * 1024 * 1024, 'Maksimal 2MB')
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'].includes(file?.type),
      'Format tidak valid (jpeg, png, jpg, gif, svg saja)'
    ),
});

type ItemDataForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: OptionData
  open: boolean
  onOpenChange: (open: boolean) => void
  type: number
}

export function ItemDataActionDialog({
  currentRow,
  open,
  onOpenChange,
  type,
}: Props) {
  const isEdit = !!currentRow
  const itemData = itemDatas[type]

  const form = useForm<ItemDataForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? { ...currentRow, isEdit }
      : {
        model: '',
        brand_id: '',
        car_image: null,
      },
  });

  // ✅ Submit handler
  const onSubmit = (data: ItemDataForm) => {
    const formData = new FormData();
    formData.append('model', data.model);
    formData.append('brand_id', data.brand_id);
    formData.append('car_image', data.car_image);
  
    if (isEdit && currentRow?.id) {
      router.put(`/product/cars/${currentRow.id}`, formData, {
        forceFormData: true,
        onSuccess: () => {
          toast({ title: 'Updated!' });
          onOpenChange(false);
          form.reset();
        },
      });
    } else {
      router.post('/product/cars', formData, {
        forceFormData: true,
        onSuccess: () => {
          toast({ title: 'Uploaded!' });
          onOpenChange(false);
          form.reset();
        },
      });
    }
  };
  
  

  React.useEffect(() => {
    if (currentRow) {
      form.reset({
        model: currentRow.model,
        brand_id: currentRow.brand_id.toString(),
        car_image: null, // Do not preload image
      });
    }
  }, [currentRow, form]);

  const { cars, brands } = usePage<{ cars: Cars[], brands: Brand[] }>().props

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>
            {isEdit ? 'Edit ' + itemData.optionName : 'Add ' + itemData.optionName}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the ' + itemData.optionName + ' here.'
              : 'Add new ' + itemData.optionName + ' here.'}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className='-mr-4 h-[26.25rem] w-full py-1 pr-4'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id='itemData-form'
              className='space-y-4 p-0.5'
            >
              {itemData.optionColumns.map((column, index) => {
                const fieldName = itemData.optionColDataset[index]
                const isRequired = true
                // column !== 'destination' && column !== 'imgUrl'

                return (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof ItemDataForm}
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                        <FormLabel className="col-span-2 text-right">{column}</FormLabel>
                        <FormControl className="col-span-4">
                          {fieldName === 'car_image' ? (
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                form.setValue('car_image', e.target.files?.[0])
                              }}
                            />
                          ) : fieldName === 'brand_id' ? (
                            <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" className="w-full col-span-4 justify-between">
      {/* Show the brand name based on the selected brand ID */}
      {brands.find((b) => b.id.toString() === field.value)?.name || 'Pilih Brand'}
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="col-span-4 w-full max-w-lg">
    <DropdownMenuLabel>Pilih</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value={field.value} onValueChange={field.onChange}>
      {brands.map((brand) => (
        <DropdownMenuRadioItem key={brand.id} value={brand.id.toString()}>
          {/* The displayed name is the brand name */}
          {brand.name}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>

                          ) : (
                            <Input
                              placeholder={'Enter ' + column + '...'}
                              {...field}
                              autoComplete="off"
                              required={isRequired}
                            />
                          )}
                        </FormControl>
                        <FormMessage className="col-span-4 col-start-3" />
                      </FormItem>
                    )}
                  />

                )
              })}
            </form>
          </Form>
        </ScrollArea>

        <DialogFooter>
          {/* Button now displays errors if the form is invalid */}
          <Button type='submit' form='itemData-form'>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
