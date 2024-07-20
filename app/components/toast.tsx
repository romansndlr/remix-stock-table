import { AriaToastProps, useToast, useToastRegion } from '@react-aria/toast'
import type { AriaToastRegionProps } from '@react-aria/toast'
import { ToastQueue, ToastState, useToastQueue } from '@react-stately/toast'
import React from 'react'
import { Button } from 'react-aria-components'

interface ToastProps<T> extends AriaToastProps<T> {
  state: ToastState<T>
}

export const toastQueue = new ToastQueue<React.ReactNode>({
  maxVisibleToasts: 5,
  hasExitAnimation: true,
})

export function Toast<T extends React.ReactNode>({
  state,
  ...props
}: ToastProps<T>) {
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
      className="bg-green-600 entering:animate-in entering:slide-in-from-bottom-0 entering:ease-out entering:duration-300 exiting:animate-out exiting:slide-out-to-bottom-0 exiting:ease-in exiting:duration-200 rounded-full shadow text-white py-2 pl-5 pr-2 flex items-center gap-x-3"
      data-entering={props.toast.animation === 'entering'}
      data-exiting={props.toast.animation === 'exiting'}
      onAnimationEnd={() => {
        if (props.toast.animation === 'exiting') {
          state.remove(props.toast.key)
        }
      }}
    >
      <div {...titleProps}>{props.toast.content}</div>
      <Button
        {...closeButtonProps}
        className="rounded-full hover:bg-white/15 p-0.5"
      >
        <CloseIcon />
      </Button>
    </div>
  )
}

export function ToastRegion(props: AriaToastRegionProps) {
  const ref = React.useRef(null)
  const state = useToastQueue(toastQueue)
  const { regionProps } = useToastRegion(props, state, ref)

  return (
    <div {...regionProps} ref={ref} className="fixed bottom-6 right-6">
      {state.visibleToasts.map((toast) => (
        <Toast key={toast.key} toast={toast} state={state} />
      ))}
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
