import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
功能：以调用函数的方式渲染组件。

\`\`\`ts
const showStatus = createExecutor<{
  value: boolean
}>(({ value }) => {
  const [state, setState] = useState<boolean>(value)
  return (
    <Modal visible={true} title="状态">
      <div onClick={() => setState(!state)}>
        {label}: {state ? 'true' : 'false'}
      </div>
    </Modal>
  )
})

showStatus({ value: true })
\`\`\`

## 实现方法

前端开发时，可以经常遇到组件函数化的场景，比如实现 Toast、Confirm、Modal 等效果。

我们一般有两种方案：

1、使用 ReactDOM.createPortal 组件，在组件内部将节点挂载在组件外。这样，节点可以继承上下文，除了挂载位置不同，其他表现行为与普通节点一样，但它必须渲染在组件内。

2、使用 ReactDom.render 将节点渲染在一个新创建的DOM元素上。这种方式下，节点无法继承上下文，与当前渲染的 React 节点树无关，但节点可以脱离组件内部，独立渲染。

大部分时候，我们用不上 Context，即使需要用到，也可以在外部获取，以参数的形式传递给节点。

所以，我们采用了第二种做法，这使我们可以在任何地方调用弹窗或其他独立组件。

\`\`\`ts
// 在捕获到异常后，弹出窗口提示用户
try {
  ...
} catch (err) {
  showError(err)
}
\`\`\`

## 限制

它的工作方式限制了它，使得节点只能挂载在 document.body 节点下，不能指定挂在其他位置。

如果需要挂载在其他位置，我们推荐你使用 [xueyan-react-portal](/xueyan-react-portal) 去实现。
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
