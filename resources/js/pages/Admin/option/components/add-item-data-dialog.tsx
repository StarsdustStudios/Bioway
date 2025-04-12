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
  name: z.string().min(1, 'Nama wajib diisi'),
  brand_logo: z.string().min(1, 'Logo wajib diisi'),
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
          brand_logo: '',
        },
  });

  // ✅ Submit handler
  const onSubmit = (values: ItemDataForm) => {
    if (isEdit && !currentRow?.id) return;
  
    toast({ title: isEdit ? 'Updating...' : 'Submitting...', description: 'Please wait...' });
  
    const route = isEdit
      ? `/product/brands/${currentRow.id}`
      : '/product/brands';
  
    const payload = isEdit
      ? { ...values, _method: 'put' }
      : values;
  
    router.post(route, payload, {
      onSuccess: () => {
        toast({
          title: isEdit ? 'Updated!' : 'Success!',
          description: isEdit
            ? 'Brand updated successfully!'
            : 'Brand created successfully!',
        });
        form.reset();
        onOpenChange(false);
      },
      onError: (errors) => {
        toast({
          title: isEdit ? 'Update Failed' : 'Submission Failed',
          description: errors.message ?? 'Something went wrong.',
        });
      },
    });
  };
  

  
  
  
  

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
                          {fieldName === 'imgUrl' ? (
                            // For imgUrl (string), use a simple input field
                            <Input
                              placeholder={'Enter ' + column + ' URL...'}
                              {...field}
                              autoComplete='off'
                              required={isRequired}
                            />
                          ) : (
                            // Other fields can be handled as needed
                            <Input
                              placeholder={'Enter ' + column + '...'}
                              {...field}
                              autoComplete='off'
                              required={isRequired}
                            />
                          )}
                        </FormControl>
                        {/* Displaying error messages */}
                        <FormMessage className='col-span-4 col-start-3'>
                          {form.formState.errors[fieldName]?.message}
                        </FormMessage>
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
