import React from 'react'
import { createCacheFadeExecutor } from 'xueyan-react-executor'

const style: React.CSSProperties = {
  position: 'fixed',
  top: 300,
  left: 100,
  width: 200,
  height: 100,
  backgroundColor: '#f38',
  overflow: 'auto'
}

const hello = createCacheFadeExecutor<{
  math: number
}>(({ math, close }) => {
  console.log(math)
  return <div style={style}>
    <div onClick={() => close(true)}>卸载</div>
    <div>000</div>
    <div>000</div>
    <div>000</div>
    <div>000</div>
    <div>777</div>
    <div>000</div>
    <div>999</div>
    <div onClick={() => close()}>隐藏</div>
    <div>000</div>
    <div>---</div>
    <div>000</div>
    <div>===</div>
    <div>000</div>
    <div>...</div>
  </div>
})

export default function Main() {
  const handleClick = () => {
    hello({ 
      math: Math.random()
    })
  }
  return (
    <div>
      <button onClick={handleClick}>显示hello</button>
    </div>
  )
}
