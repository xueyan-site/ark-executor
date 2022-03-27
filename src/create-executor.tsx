import React, { useState } from 'react'
import { unmountComponentAtNode, render } from 'react-dom'

export type CloseExecutor = (
  delayClose?: number
) => void

export type ExecutedProps<T extends object> = T & {
  close: CloseExecutor
}

export type Executor<T extends object> = (
  props: T
) => CloseExecutor

export function createExecutor<T extends object = {}>(
  Component: React.ComponentType<ExecutedProps<T>>,
  delayClose?: number
): Executor<T> {
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
    const close = (_delayClose?: number) => {
      const delay = (_delayClose && _delayClose > 0) ? _delayClose : delayClose
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
