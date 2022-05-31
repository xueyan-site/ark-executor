import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
创建附带有渐变效果和缓存效果的执行器。

当组件被渲染和卸载时，会有淡入淡出的动画效果，且在执行器关闭之后，组件没有被销毁，仍然可以继续使用，除非手动销毁。

> 过渡节点：为了完成过渡，执行器会在节点外层包裹一个div。  
> 过渡参数：[xueyan-react-transition](/xueyan-react-transition)  

\`\`\`ts
type createCacheFadeExecutor<T extends object = {}> = (
  Component: React.ComponentType<CacheFadeExecutedProps<T>>,  // 要执行的组件
  transition?: FadeTransitionProps,                           // 过渡参数
  containerProps?: React.HTMLAttributes<HTMLDivElement>       // 过渡节点的属性
) => CacheFadeExecutor<T>
\`\`\`

\`\`\`
type CacheFadeExecutor<T extends object> = (
  props: T,                   // 组件的参数
  refresh?: boolean           // 是否刷新（卸载原组件后，重新挂载）
) => {
  close: CloseCacheFadeExecutor   // 关闭方法
  update: (props: T) => void      // 更新props
}
\`\`\`

\`\`\`
type CacheFadeExecutedProps<T extends object> = T & {
  close: CloseCacheFadeExecutor   // 关闭方法
}
\`\`\`

\`\`\`
type CloseCacheFadeExecutor = (
  unmount?: boolean               // 关闭时，是否卸载组件
) => void
\`\`\`

普通执行器的演示示例，用缓存渐变执行器可以写成：

\`\`\`tsx
const sayHello = createCacheFadeExecutor(({ close }) => {
  return (
    <div onClose={() => close()}>
      hello!
    </div>
  )
})

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
