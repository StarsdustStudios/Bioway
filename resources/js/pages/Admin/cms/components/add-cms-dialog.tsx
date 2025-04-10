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
import { SelectDropdown } from '@/components/ui/select-dropdown'
import { cmsData } from '@/components/data/cms-data'
import { Cms } from '../data/schema'

// Form schema without the password fields
const formSchema = z
  .object({
    imgUrl: z.string().url(),
    brand: z.string().min(1, { message: 'Brand is required.' }),
    price: z.coerce.number().positive().min(1, { message: 'Price cannot be less than 1.' }),
    driverFee: z.coerce.number().positive().min(1, { message: 'Driver fee is required.' }),
    location: z.string().min(1, { message: 'Location is required.' }),
    passengerCapacity: z.coerce.number().positive().min(1, { message: 'Passenger capacity is required.' }),
    luggageCapacity: z.coerce.number().positive().min(1, { message: 'Luggage capacity is required.' }),
    destination: z.string().min(1, { message: 'Destination is required.' }),
    status: z.string().min(1, { message: 'Status is required.' }),
    role: z.string().min(1, { message: 'Role is required.' }),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    isEdit: z.boolean(),
  })

type CmsForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Cms
  open: boolean
  onOpenChange: (open: boolean) => void
  type: number
}

export function CmsActionDialog({ currentRow, open, onOpenChange, type }: Props) {
  const isEdit = !!currentRow
  const cms = cmsData[type]
  const form = useForm<CmsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          isEdit,
        }
      : {
          imgUrl: '',
          brand: '',
          price: 0,
          driverFee: 0,
          location: '',
          passengerCapacity: 0,
          luggageCapacity: 0,
          destination: '',
          status: '',
          role: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          isEdit,
        },
  })

  const onSubmit = (values: CmsForm) => {
    form.reset()
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    onOpenChange(false)
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
          <DialogTitle>{isEdit ? 'Edit ' + cms.cmsName : 'Add ' + cms.cmsName}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the cms here.' : 'Add ' + cms.cmsName + ' here.'}
            Click the save button when finished.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='-mr-4 h-[26.25rem] w-full py-1 pr-4'>
          <Form {...form}>
            <form
              id='cms-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              {cms.cmsColumns.map((column, index) => {
                const fieldName = cms.cmsColDataset[index] // Get the field name dynamically
                const placeHolder = cms.cmsColumns[index] // Get the placeholder dynamically
                const isRequired = placeHolder !== 'destination' && placeHolder !== 'imgUrl'

                return (
                  <FormField
                    key={placeHolder}
                    control={form.control}
                    name={fieldName}
                    render={({ field }) => (
                      <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                        <FormLabel className='col-span-2 text-right'>{column}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"Masukkan " + column + "..."}
                            className='col-span-4'
                            {...field}
                            autoComplete='off'
                            required={isRequired}
                          />
                        </FormControl>
                        <FormMessage className='col-span-4 col-start-3' />
                      </FormItem>
                    )}
                  />
                )
              })}

              {/* Add dynamic status dropdown */}
              {/* <FormField
                control={form.control}
                name='status'
                key={"Status"}
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>Status</FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select a status'
                        className='col-span-4'
                        items={cms.cmsStatus.map((status) => ({
                          label: status,
                          value: status,
                        }))}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              /> */}
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='cms-form'>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
