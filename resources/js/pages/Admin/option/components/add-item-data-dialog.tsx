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
import { router } from '@inertiajs/react'

// ✅ Zod schema (file can be any)
const formSchema = z.object({
  isEdit: z.boolean(),
  name: z.string().min(1, { message: 'Name is required.' }),
  logoImg: z.any().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
})

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
          name: '',
          logoImg: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          isEdit,
        },
  })

  // ✅ Submit handler using FormData
  const onSubmit = async (values: ItemDataForm) => {
    try {
      toast({
        title: 'Submitting...',
        description: 'Please wait while we save your data.',
      })

      const formData = new FormData()
      formData.append('name', values.name)
      if (values.logoImg instanceof File) {
        formData.append('brand_logo', values.logoImg)
      }

      await router.post('/product/brands', formData, {
        forceFormData: true,
        onSuccess: () => {
          form.reset()
          toast({
            title: 'Success!',
            description: 'Brand was created successfully.',
          })
          onOpenChange(false)
        },
        onError: (errors) => {
          console.error('🔴 Validation or server error:', errors)
          toast({
            title: 'Error!',
            description: 'There was an error with the submission.',
          })
        },
      })
    } catch (error) {
      console.error('🔥 Unhandled error during form submission:', error)
      toast({
        title: 'Unexpected Error',
        description: 'Something went wrong. Please try again later.',
      })
    }
  }

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
                const isFileInput = fieldName === 'logoImg'
                const isRequired =
                  column !== 'destination' && column !== 'imgUrl'

                return (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof ItemDataForm}
                    render={({ field }) => (
                      <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                        <FormLabel className='col-span-2 text-right'>
                          {column}
                        </FormLabel>
                        <FormControl className='col-span-4'>
                          {isFileInput ? (
                            <Input
                              type='file'
                              accept='image/*'
                              onChange={(e) => field.onChange(e.target.files?.[0])}
                            />
                          ) : (
                            <Input
                              placeholder={'Masukkan ' + column + '...'}
                              {...field}
                              autoComplete='off'
                              required={isRequired}
                            />
                          )}
                        </FormControl>
                        <FormMessage className='col-span-4 col-start-3' />
                      </FormItem>
                    )}
                  />
                )
              })}
            </form>
          </Form>
        </ScrollArea>

        <DialogFooter>
          <Button type='submit' onClick={() => console.log("Click")} form='itemData-form'>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
