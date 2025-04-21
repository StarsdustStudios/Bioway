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
import { EventGetData, eventPostSchema, eventPutSchema } from './schema'
import { router } from '@inertiajs/react'
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from '@/lib/utils'
import React from 'react'


const postFormSchema = eventPostSchema;
const putFormSchema = eventPutSchema;
type PostDataForm = z.infer<typeof postFormSchema>
type PutDataForm = z.infer<typeof putFormSchema>

type FormType = PostDataForm | PutDataForm
type FormField = keyof FormType

interface Props {
  currentRow?: EventGetData
  open: boolean
  onOpenChange: (open: boolean) => void
  type: number
}
const [date, setDate] = React.useState<Date>()

const isAspectRatio16by9 = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    

    img.onload = () => {
      const ratio = img.width / img.height;
      URL.revokeObjectURL(url); // Clean up
      console.log(`Image dimensions: ${img.width}x${img.height}, ratio: ${ratio}`);
      resolve(Math.abs(ratio - 1) < 0.01); // 1% tolerance
    };

    img.onerror = () => {
      URL.revokeObjectURL(url); // Clean up
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
    ? { ...currentRow, isEdit, poster_img: null }
    : { name: '', poster_img: null }

  const form = useForm<PutDataForm | PostDataForm>({
    resolver: zodResolver(isEdit ? postFormSchema : putFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: PutDataForm | PostDataForm) => {
    const formData = new FormData();

    formData.append('name', data.name);

    if (data.poster_img != null) {
      const isValid = await isAspectRatio16by9(data.poster_img);
      if (!isValid) {
        toast({ title: 'Image must be 1:1 aspect ratio.' });
        return;
      }
      formData.append('poster_img', data.poster_img);
    }

    if (isEdit && currentRow?.id) {
      formData.append('id', currentRow.id.toString());
      formData.append('_method', 'PUT');
      router.post(route('product.events.update', currentRow.id), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onSuccess: () => {
          onOpenChange(false);
          form.reset();
        }
      });
    } else {
      router.post(route('product.events.store'), formData, {
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
                          {fieldName === 'poster_img' ? (
                            <div className="flex flex-col items-center space-y-2 w-60">
                              {/* Display image preview if there is a poster_img */}
                              {(isEdit && currentRow?.poster_img) || form.watch('poster_img') ? (
                                <img
                                  src={"/storage/" + currentRow?.poster_img}
                                  alt="Event logo"
                                  className="w-16 h-16 object-cover mb-2"
                                />
                              ) : null}

                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  form.setValue('poster_img', e.target.files?.[0])
                                }}
                              />
                            </div>
                          ) : fieldName === 'start_at' || fieldName === 'end_at' ? (
                            <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>

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
