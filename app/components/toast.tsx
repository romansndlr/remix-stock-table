import { AriaToastProps, useToast, useToastRegion } from '@react-aria/toast'
import type { AriaToastRegionProps } from '@react-aria/toast'
import { ToastQueue, ToastState } from '@react-stately/toast'
import React from 'react'
import { Button } from 'react-aria-components'

interface ToastContent {
  title: string
}

interface ToastProps extends AriaToastProps<ToastContent> {
  state: ToastState<ToastContent>
}

interface ToastRegionProps extends AriaToastRegionProps {
  state: ToastState<ToastContent>
}

export const toastQueue = new ToastQueue<ToastContent>({
  maxVisibleToasts: 5,
  hasExitAnimation: true,
})

export function ToastRegion({ state, ...props }: ToastRegionProps) {
  const ref = React.useRef(null)
  const { regionProps } = useToastRegion(props, state, ref)

  return (
    <div
      {...regionProps}
      className="fixed bottom-6 right-6 flex flex-col gap-2 focus:outline-none"
      ref={ref}
    >
      {state.visibleToasts.map((toast) => (
        <Toast key={toast.key} state={state} toast={toast} />
      ))}
    </div>
  )
}

function Toast({ state, ...props }: ToastProps) {
  const ref = React.useRef(null)
  const { toastProps, titleProps, closeButtonProps } = useToast(
    props,
    state,
    ref
  )

  return (
    <div
      {...toastProps}
      ref={ref}
      className="bg-green-600 overflow-hidden data-[animation=entering]:animate-in data-[animation=entering]:slide-in-from-right data-[animation=exiting]:animate-out data-[animation=exiting]:slide-out-to-right rounded-xl shadow text-white flex"
      data-animation={props.toast.animation}
      onAnimationEnd={() => {
        if (props.toast.animation === 'exiting') {
          state.remove(props.toast.key)
        }
      }}
    >
      <div {...titleProps} className="py-2 pl-4 pr-2">
        {props.toast.content.title}
      </div>
      <Button
        {...closeButtonProps}
        className="flex justify-center items-center hover:bg-white/10 pl-2 pr-2.5 outline-none border-l border-white/25"
      >
        <CloseIcon />
      </Button>
    </div>
  )
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5 pt-0.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  )
}
