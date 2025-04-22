'use client'

import { z } from 'zod'

import { FieldErrors, useForm } from 'react-hook-form'
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
import { productData } from '@/components/data/product-data'
import { ShuttleBusGetData, shuttleBusPostSchema } from './schema'
import { router, usePage } from '@inertiajs/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'

const postFormSchema = shuttleBusPostSchema;
const putFormSchema = shuttleBusPostSchema;

type PostDataForm = z.infer<typeof postFormSchema>
type PutDataForm = z.infer<typeof putFormSchema>

type FormType = PostDataForm | PutDataForm
type FormField = keyof FormType

interface Props {
  currentRow?: ShuttleBusGetData
  open: boolean
  onOpenChange: (open: boolean) => void
  type: number
}

interface Cars {
  id: number;
  model: string;
  brand_id: number;
  car_image: string;
  created_at: string;
  updated_at: string;
}

interface Location {
  id: number;
  city_name: string;
  created_at: string;
  updated_at: string;
}

export function ItemDataActionDialog({
  currentRow,
  open,
  onOpenChange,
  type,
}: Props) {
  const isEdit = !!currentRow
  const itemData = productData[type]

  const form = useForm<PutDataForm | PostDataForm>({
    resolver: zodResolver(isEdit ? postFormSchema : putFormSchema)
  });

  // ✅ Submit handler
  const onSubmit = async (data: PutDataForm | PostDataForm) => {
    const formData = new FormData();
    formData.append('car_id', String(Number(data.car_id)));
    formData.append('from', String(Number(data.from)));
    formData.append('to', String(Number(data.to)));
    formData.append('price', String(Number(data.price)));

    if (isEdit && currentRow?.id) {
      formData.append('id', String(currentRow.id));
      formData.append('_method', 'PUT');
      console.log('Submit data:', form.getValues());
      router.post(route('product.shuttle-bus.update', currentRow.id), formData, {
        onSuccess: () => {
          onOpenChange(false);
          form.reset();
        },
      });
    } else {
      router.post(route('product.shuttle-bus.store'), formData, {
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
        car_id: String(currentRow.car_id),
        from: String(currentRow.from),
        to: String(currentRow.to),
        price: currentRow.price,
      });
    }
  }, [currentRow, form]);

  const { cars } = usePage<{ cars: Cars[] }>().props
  const { locations } = usePage<{ locations: Location[] }>().props


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
            {isEdit ? 'Edit ' + itemData.productName : 'Add ' + itemData.productName}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the ' + itemData.productName + ' here.'
              : 'Add new ' + itemData.productName + ' here.'}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className='-mr-4 h-[26.25rem] w-full py-1 pr-4'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id='itemData-form'
              className='space-y-4 p-0.5'
            >
              {itemData.productColumns.map((column, index) => {
                const fieldName = itemData.productColDataset[index]
                return (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof (PutDataForm | PostDataForm)}
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                        <FormLabel className="col-span-2 text-right">{column}</FormLabel>
                        <FormControl className="col-span-4">
                          {fieldName === 'from' || fieldName === 'to' ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full col-span-4 justify-between">
                                  {locations.find((c) => c.id.toString() === field.value)?.city_name || 'Pilih Lokasi'}
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="col-span-4 w-full max-w-lg">
                                <DropdownMenuLabel>Pilih</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={field.value} onValueChange={field.onChange}>
                                  {locations.map((c) => (
                                    <DropdownMenuRadioItem key={c.id} value={c.id.toString()}>
                                      {c.city_name}
                                    </DropdownMenuRadioItem>
                                  ))}
                                </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>

                          ) : fieldName === 'car_id' ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full col-span-4 justify-between">
                                  {cars.find((c) => c.id.toString() === field.value)?.model || 'Pilih Mobil'}
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="col-span-4 w-full max-w-lg">
                                <DropdownMenuLabel>Pilih</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={field.value} onValueChange={field.onChange}>
                                  {cars.map((c) => (
                                    <DropdownMenuRadioItem key={c.id} value={c.id.toString()}>
                                      {c.model}
                                    </DropdownMenuRadioItem>
                                  ))}
                                </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>

                          ) : (
                            <Input
                              type="number"
                              placeholder={'Enter ' + column + '...'}
                              {...field}
                              value={field.value ?? ''}
                              onChange={field.onChange}
                              autoComplete="off"
                              required
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
          <Button type='submit' form='itemData-form' disabled={!form.formState.isValid}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
