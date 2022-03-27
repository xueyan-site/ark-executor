import React, { useState } from 'react'
import { unmountComponentAtNode, render } from 'react-dom'
import { FadeTransition } from 'xueyan-react-transition'
import type { FadeTransitionProps } from 'xueyan-react-transition'

export type CloseFadeExecutor = () => void

export type FadeExecutedProps<T extends object> = T & {
  close: CloseFadeExecutor
}

export type FadeExecutor<T extends object> = (
  props: T
) => CloseFadeExecutor

export function createFadeExecutor<T extends object = {}>(
  Component: React.ComponentType<FadeExecutedProps<T>>,
  transition?: FadeTransitionProps,
  containerProps?: React.HTMLAttributes<HTMLDivElement>
): FadeExecutor<T> {
  return props => {
    let __setVisible__: React.Dispatch<React.SetStateAction<boolean>> | undefined
    const dom = document.createElement('div')
    document.body.appendChild(dom)
    const distroy = () => {
      unmountComponentAtNode(dom)
      if (dom.parentNode) {
        dom.parentNode.removeChild(dom)
      }
      __setVisible__ = undefined
    }
    const close = () => {
      if (__setVisible__) {
        __setVisible__(false)
      } else {
        distroy()
      }
    }
    const Wrapper = () => {
      const [visible, setVisible] = useState(true)
      __setVisible__ = setVisible
      return (
        <FadeTransition 
          {...transition}
          value={visible}
          onAfter={enter => {
            if (!enter) {
              distroy()
            }
          }}
        >
          <div {...containerProps}>
            <Component {...props} close={close}/>
          </div>
        </FadeTransition>
      )
    }
    render(<Wrapper />, dom)
    return close
  }
}
