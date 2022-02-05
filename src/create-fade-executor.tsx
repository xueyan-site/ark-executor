import React, { useState } from 'react'
import { unmountComponentAtNode, render } from 'react-dom'
import { FadeTransition } from 'xueyan-react-transition'
import type { FadeTransitionProps } from 'xueyan-react-transition'

export type FadeExecutedComponentCloseMethod = () => void

export type FadeExecutedComponentProps<T extends object> = T & {
  close: FadeExecutedComponentCloseMethod
}

export type FadeWrapperComponentProps = Omit<FadeTransitionProps, 'value' | 'onAfter'>

export type FadeComponentExecutor<T extends object> = (
  props: T,
  fadeProps?: FadeWrapperComponentProps
) => FadeExecutedComponentCloseMethod

export function createFadeExecutor<T extends object = {}>(
  Component: React.ComponentType<FadeExecutedComponentProps<T>>
): FadeComponentExecutor<T> {
  return (props, fadeProps) => {
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
          {...fadeProps}
          value={visible}
          onAfter={enter => {
            if (!enter) {
              distroy()
            }
          }}
        >
          <div>
            <Component {...props} close={close}/>
          </div>
        </FadeTransition>
      )
    }
    render(<Wrapper />, dom)
    return close
  }
}
