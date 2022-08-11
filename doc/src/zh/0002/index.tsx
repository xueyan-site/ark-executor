import React from 'react'
import { Article, Segment } from 'ark-markdown'

const MARK1 = `
创建执行器，不附带任何效果

\`\`\`ts
type createExecutor<T extends object = {}> = (
  Component: React.ComponentType<ExecutedProps<T>>, // 要执行的组件
  delayClose?: number | undefined                   // 调用关闭方法后，推迟的时间，单位（ms）
) => Executor<T>
\`\`\`

\`\`\`
type ExecutedProps<T extends object> = T & {
  close: CloseExecutor         // 关闭方法
}
\`\`\`

\`\`\`
type Executor<T extends object> = (
  props: T                    // 组件的参数
) => {
  close: CloseExecutor        // 关闭方法
  update: (props: T) => void  // 更新props
}
\`\`\`

\`\`\`
type CloseExecutor = (
  delayClose?: number         // 调用关闭方法后，推迟的时间，单位（ms）
) => void
\`\`\`

示例：

\`\`\`tsx
// 假设示例中使用的 Modal 关闭时动画效果会持续 300 ms
const sayHello = createExecutor(({ close }) => {
  return (
    <Modal visible={true} onClose={() => close()}>
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
