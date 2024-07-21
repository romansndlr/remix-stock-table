import { useFetcher, useLoaderData } from '@remix-run/react'
import React from 'react'
import {
  Button,
  DialogTrigger,
  Group,
  Heading,
  Input,
  Label,
  NumberField,
} from 'react-aria-components'
import { AnimatePresence, motion } from 'framer-motion'
import { isEmpty } from 'lodash-es'
import { Modal } from '~/components/modal'
import { loader } from './route'

interface FetcherData {
  ok: boolean
  errors?: Record<string, string[]>
}

export const StocksUpdateIntervalModal = React.memo(() => {
  const fetcher = useFetcher<FetcherData>()
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.ok) {
      setIsOpen(false)
    }
  }, [fetcher.data?.ok, fetcher.state])

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-end items-center">
        <Button className="inline-flex cursor-pointer items-center group gap-x-2 justify-center rounded-md bg-black bg-opacity-20 bg-clip-padding border border-white/20 px-3.5 py-2 font-medium text-base text-white hover:bg-opacity-30 pressed:bg-opacity-40 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          Update interval <IntervalIcon />
        </Button>
      </div>
      <Modal>
        {({ close }) => (
          <>
            <Heading className="text-lg font-medium">
              How often do you want to update the stocks?
            </Heading>
            <fetcher.Form
              method="POST"
              className="mt-8 flex flex-col items-start"
            >
              <IntervalField errorMessage={fetcher.data?.errors?.interval} />
              <footer className="flex gap-3 justify-end items-center w-full mt-8">
                <Button
                  className="px-5 py-1.5 rounded-lg hover:bg-slate-200 transition-colors bg-slate-100 outline-slate-300"
                  onPress={close}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isDisabled={
                    fetcher.state === 'submitting' ||
                    fetcher.state === 'loading'
                  }
                  className="px-5 py-1.5 rounded-lg disabled:bg-indigo-200 disabled:text-indigo-300 disabled:cursor-not-allowed hover:bg-indigo-600 transition-colors bg-indigo-500 outline-indigo-700 text-white"
                >
                  Update
                </Button>
              </footer>
            </fetcher.Form>
          </>
        )}
      </Modal>
    </DialogTrigger>
  )
})

function IntervalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4 group-hover:rotate-180 duration-300 transition-transform"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  )
}

function IntervalField({ errorMessage }: { errorMessage?: string[] }) {
  const loaderData = useLoaderData<typeof loader>()

  return (
    <NumberField
      name="interval"
      defaultValue={loaderData.interval}
      minValue={1000}
      maxValue={10000}
      step={500}
      className="flex flex-col gap-1"
      formatOptions={{
        unit: 'millisecond',
        style: 'unit',
        unitDisplay: 'short',
      }}
    >
      <Label className="font-medium text-sm">Interval</Label>
      <Group className="border flex border-slate-300 rounded-lg overflow-hidden data-[focus-within]:ring-1 ring-slate-200">
        <Button
          slot="decrement"
          className="px-3 py-1 border-r outline-none disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          -
        </Button>
        <Input className="outline-none max-w-32 flex-1 leading-8 px-3 disabled:text-gray-300 transition-colors disabled:cursor-not-allowed" />
        <Button
          slot="increment"
          className="px-3 py-1 border-l outline-none disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          +
        </Button>
      </Group>
      <AnimatePresence>
        {!isEmpty(errorMessage) && (
          <motion.em
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-500 mt-1 text-xs not-italic"
          >
            {errorMessage}
          </motion.em>
        )}
      </AnimatePresence>
    </NumberField>
  )
}
