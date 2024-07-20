import clsx from 'clsx'
import { Dialog, DialogProps, Modal, ModalOverlay } from 'react-aria-components'

function _Modal({ children }: { children: DialogProps['children'] }) {
  return (
    <ModalOverlay
      className={({ isEntering, isExiting }) =>
        clsx(
          'fixed inset-0 z-10 overflow-y-auto bg-black/25 flex min-h-full items-center justify-center p-4 text-center backdrop-blur',
          isEntering && 'animate-in fade-in duration-300 ease-out',
          isExiting && 'animate-out fade-out duration-200 ease-in'
        )
      }
    >
      <Modal
        className={({ isEntering, isExiting }) =>
          clsx(
            'w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-gray-600 text-left align-middle shadow-xl',
            isEntering && 'animate-in zoom-in-95 ease-out duration-300',
            isExiting && 'animate-out zoom-out-95 ease-in duration-200'
          )
        }
      >
        <Dialog role="alertdialog" className="outline-none relative">
          {children}
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}

export { _Modal as Modal }
