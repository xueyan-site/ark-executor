import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
创建附带有渐变效果的执行器。

当组件被渲染和卸载时，会有淡入淡出的动画效果。

> 过渡节点：为了完成过渡，执行器会在节点外层包裹一个div。  
> 过渡参数：[xueyan-react-transition](/xueyan-react-transition)  

\`\`\`ts
type createFadeExecutor<T extends object = {}> = (
  Component: React.ComponentType<FadeExecutedProps<T>>, // 要执行的组件
  transition?: FadeTransitionProps,                     // 过渡参数
  containerProps?: React.HTMLAttributes<HTMLDivElement> // 过渡节点的属性
) => FadeExecutor<T> 

type FadeExecutor<T extends object> = (
  props: T                         // 组件的参数
) => {
  close: CloseFadeExecutor         // 关闭方法
  update: (props: T) => void       // 更新props
}

type FadeExecutedProps<T extends object> = T & {
  close: CloseFadeExecutor         // 关闭方法
}

type CloseFadeExecutor = () => void
\`\`\`

普通执行器的演示示例，用渐变执行器可以写成：

\`\`\`tsx
const sayHello = createFadeExecutor(({ close }) => {
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
