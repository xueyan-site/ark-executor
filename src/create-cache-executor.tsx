import React, { useEffect, useState } from 'react'
import { unmountComponentAtNode, render } from 'react-dom'

export type CloseCacheExecutor = (
  unmount?: boolean
) => void

export type CacheExecutedProps<T extends object> = T & {
  close: CloseCacheExecutor
  visible: boolean
}

export type CacheExecutor<T extends object> = (
  props: T,
  refresh?: boolean
) => {
  close: CloseCacheExecutor
  update: (props: T) => void
}

export function createCacheExecutor<T extends object = {}>(
  Component: React.ComponentType<CacheExecutedProps<T>>,
  delayClose?: number,
): CacheExecutor<T> {
  let _dom: HTMLDivElement | undefined
  let _props: T
  let _timer: any
  let _setProps: React.Dispatch<React.SetStateAction<T>> | undefined
  let _setVisible: React.Dispatch<React.SetStateAction<boolean>> | undefined

  const cancelTimer = () => {
    if (_timer) {
      clearTimeout(_timer)
      _timer = undefined
    }
  }

  const distroy = () => {
    cancelTimer()
    if (_dom) {
      unmountComponentAtNode(_dom)
      if (_dom.parentNode) {
        _dom.parentNode.removeChild(_dom)
      }
    }
    _dom = undefined
    _setVisible = undefined
  }

  const close = (unmount?: boolean, callback?: () => void) => {
    cancelTimer()
    if (_setVisible) {
      _setVisible(false)
      _setVisible = undefined
    }
    if (unmount) {
      const delay = delayClose
      const call = () => {
        distroy()
        if (callback) {
          callback()
        }
      }
      if (delay) {
        _timer = setTimeout(call, delay)
      } else {
        call()
      }
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
    useEffect(() => setVisible(true), [])
    return <Component {...props} close={close} visible={visible}/>
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
      close(true, call)
    }
  }

  return (props, refresh) => {
    cancelTimer()
    _props = props
    if (_dom && !refresh && _setVisible) {
      _setVisible(true)
    } else {
      mount()
    }
    return { close, update }
  }
}
