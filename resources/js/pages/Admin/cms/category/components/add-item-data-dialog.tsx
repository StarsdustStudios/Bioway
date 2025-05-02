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
import { cmsData } from '@/components/data/cms-data'
import { CategoryGetData, categoryPostSchema, categoryPutSchema } from './schema'
import { router } from '@inertiajs/react'
import React from 'react'


const postFormSchema = categoryPostSchema;
const putFormSchema = categoryPutSchema;
type PostDataForm = z.infer<typeof postFormSchema>
type PutDataForm = z.infer<typeof putFormSchema>

type FormType = PostDataForm | PutDataForm
type FormField = keyof FormType

interface Props {
  currentRow?: CategoryGetData
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
  const cmsDatas = cmsData[type]

  const form = useForm<PutDataForm | PostDataForm>({
    resolver: zodResolver(isEdit ? postFormSchema : putFormSchema)
  });

  const onSubmit = (data: PutDataForm | PostDataForm) => {
    const formData = new FormData();

    formData.append('name', data.name);
    if (isEdit && currentRow?.id) {
      formData.append('id', currentRow.id.toString());
      formData.append('_method', 'PUT');
      router.post(route('cms.categories.update', currentRow.id), formData, {
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
      router.post(route('cms.categories.store'), formData, {
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

  React.useEffect(() => {
    if (currentRow) {
      form.reset({
        name: currentRow.name,
      });
    }
  }, [currentRow, form]);

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
            {isEdit ? 'Edit ' + cmsDatas.cmsName : 'Add ' + cmsDatas.cmsName}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the ' + cmsDatas.cmsName + ' here.'
              : 'Add new ' + cmsDatas.cmsName + ' here.'}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className='-mr-4 h-[26.25rem] w-full py-1 pr-4'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id='cmsDatas-form'
              className='space-y-4 p-0.5'
            >
              {cmsDatas.cmsColumns.map((column, index) => {
                const fieldName = cmsDatas.cmsColDataset[index]
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
                          <Input
                            placeholder={'Enter ' + column + '...'}
                            {...field}
                            autoComplete='off'
                            required={isRequired}
                          />
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
          <Button type='submit' form='cmsDatas-form' disabled={!form.formState.isValid}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
