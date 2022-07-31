import React, { useState } from 'react'
import { unmountComponentAtNode, render } from 'react-dom'
import { FadeTransition } from 'ark-transition'
import type { FadeTransitionProps } from 'ark-transition'

export type CloseCacheFadeExecutor = (
  unmount?: boolean
) => void

export type CacheFadeExecutedProps<T extends object> = T & {
  close: CloseCacheFadeExecutor
}

export type CacheFadeExecutor<T extends object> = (
  props: T,
  refresh?: boolean
) => {
  close: CloseCacheFadeExecutor
  update: (props: T) => void
}

export function createCacheFadeExecutor<T extends object = {}>(
  Component: React.ComponentType<CacheFadeExecutedProps<T>>,
  transition?: FadeTransitionProps,
  containerProps?: React.HTMLAttributes<HTMLDivElement>
): CacheFadeExecutor<T> {
  let _dom: HTMLDivElement | undefined
  let _props: T
  let _setProps: React.Dispatch<React.SetStateAction<T>> | undefined
  let _setVisible: React.Dispatch<React.SetStateAction<boolean>> | undefined
  let _callback: (() => void) | undefined
  let _unmount: (() => void) | undefined

  const distroy = () => {
    if (_dom) {
      unmountComponentAtNode(_dom)
      if (_dom.parentNode) {
        _dom.parentNode.removeChild(_dom)
      }
    }
    if (_callback) {
      _callback()
    }
    _dom = undefined
    _setVisible = undefined
    _callback = undefined
    _unmount = undefined
  }

  const close = (unmount?: boolean) => {
    if (_setVisible) {
      _setVisible(false)
    }
    if (unmount) {
      _unmount = distroy
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
          if (!enter && _unmount) {
            _unmount()
            _unmount = undefined
          }
        }}
      >
        <div {...containerProps}>
          <Component {...props} close={close}/>
        </div>
      </FadeTransition>
    )
  }

  const mount = () => {
    const call = () => {
      _dom = document.createElement('div')
      document.body.appendChild(_dom)
      render(<Wrapper />, _dom)
    }
    if (!_dom) {
      call()
    } else {
      close(true)
      _callback = call
    }
  }

  return (props, refresh) => {
    _props = props
    if (_dom && !refresh && _setVisible) {
      _setVisible(true)
    } else {
      mount()
    }
    return { close, update }
  }
}
