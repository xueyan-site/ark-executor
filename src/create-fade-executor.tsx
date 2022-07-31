import React, { useState } from 'react'
import { unmountComponentAtNode, render } from 'react-dom'
import { FadeTransition } from 'ark-transition'
import type { FadeTransitionProps } from 'ark-transition'

export type CloseFadeExecutor = () => void

export type FadeExecutedProps<T extends object> = T & {
  close: CloseFadeExecutor
}

export type FadeExecutor<T extends object> = (
  props: T
) => {
  close: CloseFadeExecutor
  update: (props: T) => void
}

export function createFadeExecutor<T extends object = {}>(
  Component: React.ComponentType<FadeExecutedProps<T>>,
  transition?: FadeTransitionProps,
  containerProps?: React.HTMLAttributes<HTMLDivElement>
): FadeExecutor<T> {
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

    const close = () => {
      if (_setVisible) {
        _setVisible(false)
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
    return { close, update }
  }
}
