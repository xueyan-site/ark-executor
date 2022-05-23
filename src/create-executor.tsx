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
) => {
  close: CloseExecutor
  update: (props: T) => void
}

export function createExecutor<T extends object = {}>(
  Component: React.ComponentType<ExecutedProps<T>>,
  delayClose?: number
): Executor<T> {
  return _props => {
    let _setProps: React.Dispatch<React.SetStateAction<T>> | undefined
    let _setVisible: React.Dispatch<React.SetStateAction<boolean>> | undefined

    const dom = document.createElement('div')
    document.body.appendChild(dom)
    const distroy = () => {
      unmountComponentAtNode(dom)
      if (dom.parentNode) {
        dom.parentNode.removeChild(dom)
      }
      _setProps = undefined
      _setVisible = undefined
    }

    const close = (_delayClose?: number) => {
      const delay = (_delayClose && _delayClose > 0) ? _delayClose : delayClose
      if (_setVisible && delay) {
        _setVisible(false)
        setTimeout(distroy, delay)
      } else {
        distroy()
      }
    }

    const update = (props: T) => {
      if (_setProps) {
        _setProps(props)
      }
    }

    const Wrapper = () => {
      const [props, setProps] = useState(_props)
      const [visible, setVisible] = useState(true)
      _setProps = setProps
      _setVisible = setVisible
      return <Component {...props} close={distroy} visible={visible}/>
    }

    render(<Wrapper />, dom)
    return { close, update }
  }
}
