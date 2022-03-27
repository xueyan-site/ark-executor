import React, { useState } from 'react'
import { unmountComponentAtNode, render } from 'react-dom'
import { FadeTransition } from 'xueyan-react-transition'
import type { FadeTransitionProps } from 'xueyan-react-transition'

export type CloseCacheFadeExecutor = (
  unmount?: boolean
) => void

export type CacheFadeExecutedProps<T extends object> = T & {
  close: CloseCacheFadeExecutor
}

export type CacheFadeExecutor<T extends object> = (
  props: T,
  refresh?: boolean
) => CloseCacheFadeExecutor

export function createCacheFadeExecutor<T extends object = {}>(
  Component: React.ComponentType<CacheFadeExecutedProps<T>>,
  transition?: FadeTransitionProps,
  containerProps?: React.HTMLAttributes<HTMLDivElement>
): CacheFadeExecutor<T> {
  let __dom__: HTMLDivElement | undefined
  let __props__: T
  let __setVisible__: React.Dispatch<React.SetStateAction<boolean|undefined>> | undefined
  let __callback__: (() => void) | undefined
  let __unmount__: (() => void) | undefined
  const distroy = () => {
    if (__dom__) {
      unmountComponentAtNode(__dom__)
      if (__dom__.parentNode) {
        __dom__.parentNode.removeChild(__dom__)
      }
    }
    if (__callback__) {
      __callback__()
    }
    __dom__ = undefined
    __setVisible__ = undefined
    __callback__ = undefined
    __unmount__ = undefined
  }
  const close = (unmount?: boolean) => {
    if (__setVisible__) {
      __setVisible__(false)
    }
    if (unmount) {
      __unmount__ = distroy
    }
  }
  /** 渲染 */
  const Wrapper = () => {
    const [visible, setVisible] = useState<boolean|undefined>(true)
    __setVisible__ = setVisible
    return (
      <FadeTransition 
        {...transition}
        value={visible}
        onAfter={enter => {
          if (!enter && __unmount__) {
            __unmount__()
            __unmount__ = undefined
          }
        }}
      >
        <div {...containerProps}>
          <Component {...__props__} close={close}/>
        </div>
      </FadeTransition>
    )
  }
  /** 创建并挂载 */
  const mount = () => {
    const call = () => {
      __dom__ = document.createElement('div')
      document.body.appendChild(__dom__)
      render(<Wrapper />, __dom__)
    }
    if (!__dom__) {
      call()
    } else {
      close(true)
      __callback__ = call
    }
  }
  /** 返回调用 */
  return (props, refresh) => {
    __props__ = props
    if (__dom__ && !refresh && __setVisible__) {
      __setVisible__(true)
    } else {
      mount()
    }
    return close
  }
}
