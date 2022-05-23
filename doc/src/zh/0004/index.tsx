import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
创建附带有缓存效果的执行器。

执行器关闭之后，组件没有被销毁，仍然可以继续使用，除非手动销毁。

\`\`\`ts
type createCacheExecutor<T extends object = {}> = (
  Component: React.ComponentType<CacheExecutedProps<T>> // 要执行的组件
  delayClose?: number                                   // 调用关闭方法后，推迟的时间，单位（ms）
) => CacheExecutor<T>

type CacheExecutedProps<T extends object> = T & {
  close: CloseCacheExecutor         // 关闭方法
  visible: boolean                  // 是否可见
}

type CacheExecutor<T extends object> = (
  props: T,                         // 组件的参数
  refresh?: boolean                 // 是否刷新（卸载原组件后，重新挂载）
) => {
  close: CloseCacheExecutor         // 关闭方法
  update: (props: T) => void        // 更新props
}

type CloseCacheExecutor = (
  unmount?: boolean                 // 关闭时，是否卸载组件
) => void
\`\`\`

普通执行器的演示示例，用缓存执行器可以写成：

\`\`\`tsx
// 假设示例中使用的 Modal 关闭时动画效果会持续 300 ms
const sayHello = createCacheExecutor(({ visible, close }) => {
  return (
    <Modal visible={visible} onClose={() => close()}>
      hello!
    </Modal>
  )
}, 300)

// 对用户说 hello
const close = sayHello({})
// 外部主动关闭弹窗
close()
\`\`\`
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
