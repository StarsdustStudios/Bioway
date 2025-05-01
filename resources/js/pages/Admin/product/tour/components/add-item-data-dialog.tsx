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
import { TourGetData, tourPostSchema } from './schema'
import { router, usePage } from '@inertiajs/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import React from 'react'

const postFormSchema = tourPostSchema
const putFormSchema = tourPostSchema

type PostDataForm = z.infer<typeof postFormSchema>
type PutDataForm = z.infer<typeof putFormSchema>
type FormType = PostDataForm | PutDataForm

interface Props {
  currentRow?: TourGetData
  open: boolean
  onOpenChange: (open: boolean) => void
  type: number
}

interface Location {
  id: number
  city_name: string
  created_at: string
  updated_at: string
}

const isAspectRatio16by9 = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const ratio = img.width / img.height
      resolve(Math.abs(ratio - 16 / 9) < 0.1)
    }
    img.onerror = () => resolve(false)
    img.src = URL.createObjectURL(file)
  })
}

export function ItemDataActionDialog({
  currentRow,
  open,
  onOpenChange,
  type,
}: Props) {
  const isEdit = !!currentRow
  const itemData = productData[type]
  const { locations } = usePage<{ locations: Location[] }>().props

  const form = useForm<FormType>({
    resolver: zodResolver(isEdit ? putFormSchema : postFormSchema),
    defaultValues: {},
  })

  const onSubmit = async (data: FormType) => {
    const formData = new FormData()

    if (data.tour_image instanceof File) {
      const is16by9 = await isAspectRatio16by9(data.tour_image)
      if (!is16by9) {
        form.setError('tour_image', {
          type: 'manual',
          message: 'Gambar harus berasio 16:9',
        })
        return
      }
      formData.append('tour_image', data.tour_image)
    }

    formData.append('start', String(Number(data.start)))
    formData.append('title', data.title)
    formData.append('desc', data.desc)
    formData.append('price', String(Number(data.price)))
    formData.append('passenger', String(Number(data.passenger)))
    formData.append('luggage', String(Number(data.luggage)))

    if (Array.isArray(data.pivots)) {
      data.pivots.forEach((pivot) => {
        formData.append('pivots[]', pivot)
      })
    }

    if (isEdit && currentRow?.id) {
      formData.append('id', String(currentRow.id))
      formData.append('_method', 'PUT')

      router.post(route('product.tour.update', currentRow.id), formData, {
        forceFormData: true,
        onSuccess: () => {
          onOpenChange(false)
          form.reset()
        },
      })
    } else {
      router.post(route('product.tour.store'), formData, {
        forceFormData: true,
        onSuccess: () => {
          toast({ title: 'Uploaded!' })
          onOpenChange(false)
          form.reset()
        },
      })
    }
  }

  React.useEffect(() => {
    if (currentRow) {
      form.reset({
        start: String(currentRow.start),
        title: currentRow.title,
        desc: currentRow.desc,
        price: Number(currentRow.price),
        passenger: Number(currentRow.passenger),
        luggage: Number(currentRow.luggage),
        pivots: currentRow.locations
          .slice()
          .sort((a, b) => a.pivot.id - b.pivot.id)
          .map((loc) => String(loc.id)),

        tour_image: null,
      })
    }
  }, [currentRow, form])

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>
            {isEdit ? 'Edit ' + itemData.productName : 'Add ' + itemData.productName}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the ' + itemData.productName + ' here.'
              : 'Add new ' + itemData.productName + ' here.'}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="-mr-4 h-[26.25rem] w-full py-1 pr-4">
          <Form {...form}>
            <form id="itemData-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-0.5">
              {itemData.productColumns.map((column, index) => {
                const fieldName = itemData.productColDataset[index]

                if (fieldName === 'pivots') {
                  return (
                    <FormField
                      key={fieldName}
                      control={form.control}
                      name={fieldName as keyof FormType}
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-6 items-start gap-x-4 gap-y-1">
                          <FormLabel className="col-span-2 text-right">{column}</FormLabel>
                          <FormControl className="col-span-4">
                            <div className="flex flex-col gap-2">
                              {field.value?.map((pivot: string, index: number) => (
                                <DropdownMenu key={index}>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                      {locations.find((c) => c.id.toString() === pivot)?.city_name || 'Pilih Lokasi'}
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="w-full max-w-lg">
                                    <DropdownMenuLabel>Pilih</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup
                                      value={pivot}
                                      onValueChange={(val) => {
                                        const updated = [...field.value]
                                        updated[index] = val
                                        form.setValue('pivots', updated)
                                      }}
                                    >
                                      {locations.map((c) => (
                                        <DropdownMenuRadioItem key={c.id} value={c.id.toString()}>
                                          {c.city_name}
                                        </DropdownMenuRadioItem>
                                      ))}
                                    </DropdownMenuRadioGroup>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              ))}
                              <div>
                                <Button
                                  type="button"
                                  variant="secondary"
                                  onClick={() => form.setValue('pivots', [...(field.value || []), ''])}
                                  className="w-1/2"
                                >
                                  Tambah
                                </Button>
                                <Button
                                  type="button"
                                  variant="secondary"
                                  onClick={() =>
                                    form.setValue('pivots', (field.value || []).slice(0, -1))
                                  }
                                  className="w-1/2"
                                >
                                  Hapus
                                </Button>
                              </div>

                            </div>
                          </FormControl>
                          <FormMessage className="col-span-4 col-start-3" />
                        </FormItem>
                      )}
                    />
                  )
                }

                return (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof FormType}
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1">
                        <FormLabel className="col-span-2 text-right">{column}</FormLabel>
                        <FormControl className="col-span-4">
                          {fieldName === 'start' ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="col-span-4 w-full justify-between">
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
                          ) : fieldName === 'desc' || fieldName === 'title' ? (
                            <Input
                              placeholder={'Enter ' + column + '...'}
                              {...field}
                              value={field.value ?? ''}
                              onChange={field.onChange}
                              autoComplete="off"
                              required
                            />
                          ) : fieldName === 'tour_image' ? (
                            <div className="flex flex-col items-center space-y-2">
                              {form.watch('tour_image') instanceof File ? (
                                <img
                                  src={URL.createObjectURL(form.watch('tour_image'))}
                                  alt="Preview"
                                  className="w-16 h-16 object-cover mb-2"
                                />
                              ) : currentRow?.tour_image ? (
                                <img
                                  src={currentRow.tour_image}
                                  alt="Current"
                                  className="w-16 h-16 object-cover mb-2"
                                />
                              ) : null}
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  form.setValue('tour_image', e.target.files?.[0])
                                }}
                              />
                            </div>
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
          <Button
            type="submit"
            form="itemData-form"
          // disabled={!form.formState.isValid}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
