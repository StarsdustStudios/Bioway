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
import { itemDatas } from '@/components/data/item-data'
import { CarGetData, carPostSchema } from './schema'
import { router, usePage } from '@inertiajs/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'

const postFormSchema = carPostSchema;
const putFormSchema = carPostSchema;

type PostDataForm = z.infer<typeof postFormSchema>
type PutDataForm = z.infer<typeof putFormSchema>

type FormType = PostDataForm | PutDataForm
type FormField = keyof FormType

interface Props {
  currentRow?: CarGetData
  open: boolean
  onOpenChange: (open: boolean) => void
  type: number
}
interface Brand {
  id: number;
  name: string;
  brand_logo: string;
  created_at: string;
  updated_at: string;
  cars: Cars[];
}

interface Cars {
  id: number;
  model: string;
  brand_id: number;
  car_image: string;
  created_at: string;
  updated_at: string;
}

const isAspectRatio16by9 = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const ratio = img.width / img.height;
      resolve(Math.abs(ratio - 16 / 9) < 0.1); // 1% tolerance
    };
    img.onerror = () => resolve(false);
    img.src = URL.createObjectURL(file);
  });
};

export function ItemDataActionDialog({
  currentRow,
  open,
  onOpenChange,
  type,
}: Props) {
  const isEdit = !!currentRow
  const itemData = itemDatas[type]

  const form = useForm<PutDataForm | PostDataForm>({
    resolver: zodResolver(isEdit ? postFormSchema : putFormSchema)
  });

  // ✅ Submit handler
  const onSubmit = async (data: PutDataForm | PostDataForm) => {
    if (data.car_image instanceof File) {
      const is16by9 = await isAspectRatio16by9(data.car_image);
      if (!is16by9) {
        form.setError('car_image', {
          type: 'manual',
          message: 'Gambar harus berasio 16:9',
        });
        return;
      }
    }

    const formData = new FormData();
    formData.append('model', data.model);
    if (data.car_image != null) {
      formData.append('car_image', data.car_image);
    }
    formData.append('brand_id', String(Number(data.brand_id)));
    formData.append('seat', String(Number(data.seat)));
    formData.append('luggage', String(Number(data.luggage)));

    if (isEdit && currentRow?.id) {
      formData.append('id', String(currentRow.id));
      formData.append('_method', 'PUT');
      console.log('Submit data:', form.getValues());
      router.post(route('product.cars.update', currentRow.id), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onSuccess: () => {
          onOpenChange(false);
          form.reset();
        },
      });
    } else {
      router.post(route('product.cars.store'), formData, {
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
        brand_id: String(currentRow.brand_id),
        car_image: null, // Do not preload image
        seat: currentRow.seat,
        luggage: currentRow.luggage,
      });
    }
  }, [currentRow, form]);

  const { brands } = usePage<{ brands: Brand[] }>().props

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

                return (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof (PutDataForm | PostDataForm)}
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                        <FormLabel className="col-span-2 text-right">{column}</FormLabel>
                        <FormControl className="col-span-4">
                          {fieldName === 'car_image' ? (
                            <div className="flex flex-col items-center space-y-2">
                              {(isEdit && currentRow?.car_image) || form.watch('car_image') ? (
                                <img
                                  src={currentRow?.car_image}
                                  alt="Car Image"
                                  className="w-16 h-16 object-cover mb-2"
                                />
                              ) : null}

                              <Input
                                type='file'
                                accept='image/*'
                                onChange={(e) => {
                                  form.setValue('car_image', e.target.files?.[0])
                                }}
                              />
                            </div>
                          ) : fieldName === 'brand_id' ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full col-span-4 justify-between">
                                  {brands.find((b) => b.id.toString() === field.value)?.name || 'Pilih Brand'}
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="col-span-4 w-full max-w-lg">
                                <DropdownMenuLabel>Pilih</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={field.value} onValueChange={field.onChange}>
                                  {brands.map((brand) => (
                                    <DropdownMenuRadioItem key={brand.id} value={brand.id.toString()}>
                                      {brand.name}
                                    </DropdownMenuRadioItem>
                                  ))}
                                </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          ) : (fieldName === 'seat' || fieldName === 'luggage') ?(
                            <Input
                              type="number"
                              placeholder={'Enter ' + column + '...'}
                              {...field}
                              value={field.value ?? ''}
                              onChange={field.onChange}
                              autoComplete="off"
                              required
                            />

                          ) : (
                            <Input
                              placeholder={'Enter ' + column + '...'}
                              {...field}
                              autoComplete="off"
                              required={true}
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
          <Button type='submit' form='itemData-form' disabled={!form.formState.isValid}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
