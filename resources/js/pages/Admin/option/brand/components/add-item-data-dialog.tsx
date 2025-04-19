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
import { BrandGetData, brandPostSchema, brandPutSchema } from './schema'
import { router } from '@inertiajs/react'


const postFormSchema = brandPostSchema;
const putFormSchema = brandPutSchema;
type PostDataForm = z.infer<typeof postFormSchema>
type PutDataForm = z.infer<typeof putFormSchema>

type FormType = PostDataForm | PutDataForm
type FormField = keyof FormType

interface Props {
  currentRow?: BrandGetData
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

  const defaultValues = isEdit
    ? { ...currentRow, isEdit, brand_logo: currentRow?.brand_logo ?? null }
    : { name: '', brand_logo: null }

  const form = useForm<PutDataForm | PostDataForm>({
    resolver: zodResolver(isEdit ? postFormSchema : putFormSchema),
    defaultValues,
  });

  const onSubmit = (data: PutDataForm | PostDataForm) => {
    const formData = new FormData();

    formData.append('name', data.name);
    if(data.brand_logo != null) {
      formData.append('brand_logo', data.brand_logo);
    }
    if (isEdit && currentRow?.id) {
      formData.append('id', currentRow.id.toString());
      formData.append('_method', 'PUT');
      router.post(route('product.brands.update', currentRow.id), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onSuccess: () => {
          onOpenChange(false);
          form.reset();
        }
      });
      
    }  
     else {
      router.post(route('product.brands.store'), formData, {
        forceFormData: true,
        onSuccess: () => {
          toast({ title: 'Uploaded!' });
          onOpenChange(false);
          form.reset();
        },
      });
    }
  };

  function getErrorMessage(
    errors: FieldErrors<FormType>,
    field: string
  ): string | undefined {
    return (errors as Record<string, { message?: string }>)[field]?.message
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
                const isRequired =
                  column !== 'destination' && column !== 'imgUrl'

                return (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof (PutDataForm | PostDataForm)}
                    render={({ field }) => (
                      <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                        <FormLabel className='col-span-2 text-right'>
                          {column}
                        </FormLabel>
                        <FormControl className='col-span-4'>
                          {fieldName === 'brand_logo' ? (
                            <div className="flex flex-col items-center space-y-2">
                              {/* Display image preview if there is a brand_logo */}
                              {(isEdit && currentRow?.brand_logo) || form.watch('brand_logo') ? (
                                <img
                                  // src={"/storage/" + isEdit && currentRow?.brand_logo ? currentRow.brand_logo : "/storage/" + URL.createObjectURL(form.watch('brand_logo'))}
                                  src={"/storage/"+currentRow?.brand_logo} 
                                  alt="Brand logo"
                                  className="w-16 h-16 object-cover mb-2" // Adjust size as needed
                                />
                              ) : null}

                              <Input
                                type='file'
                                accept='image/*'
                                onChange={(e) => {
                                  form.setValue('brand_logo', e.target.files?.[0]) // Update form value with the file
                                }}
                              />
                            </div>
                          ) : (
                            <Input
                              placeholder={'Enter ' + column + '...'}
                              {...field}
                              autoComplete='off'
                              required={isRequired}
                            />
                          )}
                        </FormControl>
                        <FormMessage className='col-span-4 col-start-3'>
                          {getErrorMessage(form.formState.errors, fieldName)}
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
          <Button type='submit' form='itemData-form'>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
