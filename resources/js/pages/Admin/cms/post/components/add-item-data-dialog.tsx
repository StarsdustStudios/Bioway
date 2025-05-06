'use client'
import { z } from 'zod'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
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
import { PostGetData, postPostSchema, postPutSchema } from './schema'
import { router, usePage } from '@inertiajs/react'
import { format } from "date-fns"

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CategoryGetData } from '../../category/components/schema'
import TipTapEditor from '@/components/layout/Admin/tiptap-editor2'


const postFormSchema = postPostSchema;
const putFormSchema = postPutSchema;
type PostDataForm = z.infer<typeof postFormSchema>
type PutDataForm = z.infer<typeof putFormSchema>

type FormType = PostDataForm | PutDataForm
type FormField = keyof FormType

interface Props {
  currentRow?: PostGetData
  open: boolean
  onOpenChange: (open: boolean) => void
  type: number
}

const isAspectRatio16by9 = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);


    img.onload = () => {
      const ratio = img.width / img.height;
      URL.revokeObjectURL(url);
      console.log(`Image dimensions: ${img.width}x${img.height}, ratio: ${ratio}`);
      resolve(Math.abs(ratio - 16 / 9) < 0.5); // 1% tolerance
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      console.error('Image failed to load');
      resolve(false);
    };
    img.src = url;
  });
};


export function ItemDataActionDialog({
  currentRow,
  open,
  onOpenChange,
  type,
}: Props) {
  const isEdit = !!currentRow
  const cmsDatas = cmsData[type]

  const defaultValues = isEdit
    ? { ...currentRow, isEdit, hero_image: null }
    : { name: '', hero_image: null }

  const form = useForm<PutDataForm | PostDataForm>({
    resolver: zodResolver(isEdit ? postFormSchema : putFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: PutDataForm | PostDataForm) => {
    const formData = new FormData();

    formData.append('category_id', String(Number(data.category_id)));
    formData.append('title', data.title);
    formData.append('slug', data.slug);
    formData.append('content', data.content);

    if (data.hero_image != null) {
      const isValid = await isAspectRatio16by9(data.hero_image);
      if (!isValid) {
        toast({ title: 'Image must be 1:1 aspect ratio.' });
        return;
      }
      formData.append('hero_image', data.hero_image);
    }

    if (isEdit && currentRow?.id) {
      formData.append('id', currentRow.id.toString());
      formData.append('_method', 'PUT');
      router.post(route('cms.posts.update', currentRow.id), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onSuccess: () => {
          onOpenChange(false);
          form.reset();
        }
      });
    } else {
      router.post(route('cms.posts.store'), formData, {
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

  const { categories } = usePage<{ categories: CategoryGetData[] }>().props
  const [isSlugEdited, setIsSlugEdited] = React.useState(false)



  return (
    <Dialog
  open={open}
  onOpenChange={(state) => {
    if (!isEdit) {
      form.reset()
    }
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
                          {(fieldName === 'published_at' || (fieldName === 'content' && isEdit)) ? null : column}
                        </FormLabel>
                        <FormControl className='col-span-4'>
                          {fieldName === 'hero_image' ? (
                            <div className="flex flex-col items-center space-y-2 w-60">
                              {/* Display image preview if there is a hero_image */}
                              {(isEdit && currentRow?.hero_image) || form.watch('hero_image') ? (
                                <img
                                  src={currentRow?.hero_image}
                                  alt="Post logo"
                                  className="w-16 h-16 object-cover mb-2"
                                />
                              ) : null}

                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  form.setValue('hero_image', e.target.files?.[0])
                                }}
                              />
                            </div>
                          ) : fieldName === 'category_id' ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full col-span-4 justify-between">
                                  {categories.find((b) => b.id.toString() === field.value)?.name || 'Pilih Kategori'}
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="col-span-4 w-full max-w-lg">
                                <DropdownMenuLabel>Pilih</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={field.value} onValueChange={field.onChange}>
                                  {categories.map((c) => (
                                    <DropdownMenuRadioItem key={c.id} value={c.id.toString()}>
                                      {c.name}
                                    </DropdownMenuRadioItem>
                                  ))}
                                </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          ) : fieldName === 'title' ? (
                            <Input
                              placeholder={'Enter ' + column + '...'}
                              {...field}
                              onChange={(e) => {
                                const newTitle = e.target.value;
                                field.onChange(newTitle);

                                if (!isSlugEdited) {
                                  const generatedSlug = newTitle
                                    .toLowerCase()
                                    .replace(/[^\w\s-]/g, '')
                                    .trim()
                                    .replace(/\s+/g, '-');

                                  form.setValue('slug', generatedSlug);
                                }
                              }}
                              autoComplete='off'
                              required={isRequired}
                            />

                          ) : fieldName === 'slug' ? (
                            <Input
                              placeholder="Enter slug..."
                              {...field}
                              onChange={(e) => {
                                setIsSlugEdited(true);
                                field.onChange(e.target.value);
                              }}
                              autoComplete="off"
                            />
                          ) : fieldName === 'content' ? (
                            !isEdit ? (
                              <TipTapEditor
                                value={field.value}
                                onChange={field.onChange}
                              />
                            ) : null
                            
                          ) : fieldName === 'published_at' ? (
                            null
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
          <Button type='submit' form='cmsDatas-form'>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
