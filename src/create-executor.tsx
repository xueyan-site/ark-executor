import React, { useState } from 'react'
import { unmountComponentAtNode, render } from 'react-dom'

export type ExecutedComponentCloseMethod = (
  closeDelay?: number
) => void

export type ExecutedComponentProps<T extends object> = T & {
  close: ExecutedComponentCloseMethod
}

export type ComponentExecutor<T extends object> = (
  props: T
) => ExecutedComponentCloseMethod

export function createExecutor<T extends object = {}>(
  Component: React.ComponentType<ExecutedComponentProps<T>>,
  closeDelay?: number
): ComponentExecutor<T> {
  return props => {
    let __setVisible__: React.Dispatch<React.SetStateAction<boolean>> | undefined
    const dom = document.createElement('div')
    document.body.appendChild(dom)
    const distroy = () => {
      __setVisible__ = undefined
      unmountComponentAtNode(dom)
      if (dom.parentNode) {
        dom.parentNode.removeChild(dom)
      }
    }
    const close = (closeDelay2?: number) => {
      const delay = closeDelay || closeDelay2
      if (__setVisible__ && delay) {
        __setVisible__(false)
        setTimeout(distroy, delay)
      } else {
        distroy()
      }
    }
    const Wrapper = () => {
      const [visible, setVisible] = useState(true)
      __setVisible__ = setVisible
      return <Component {...props} close={distroy} visible={visible}/>
    }
    render(<Wrapper />, dom)
    return close
  }
}
