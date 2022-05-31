import React from 'react'
import { PageDoc } from 'com/page-doc'
import pkg from '../../../package.json'
import type { PageProps } from 'xueyan-react'
import type { Collection } from 'xueyan-react-doc'
import { 
  // ConfigIcon,
  // InterfaceIcon,
  // ConstIcon,
  // ClassIcon,
  // HookFunctionIcon,
  // ComponentIcon,
  FunctionIcon
} from 'xueyan-react-icon'

// const INTERFACE_ICON = <InterfaceIcon color="var(--pink)"/>
// const CONFIG_ICON = <ConfigIcon color="var(--indigo)"/>
// const CONST_ICON = <ConstIcon color="var(--teal)"/>
const FUNCTION_ICON = <FunctionIcon color="var(--orange)" />
// const CLASS_ICON = <ClassIcon color="var(--red)" />
// const HOOK_ICON = <HookFunctionIcon color="var(--green)" />
// const COMPONENT_ICON = <ComponentIcon color="var(--blue)" />

const COLLECTIONS: Collection<string,string>[] = [
  {
    value: '9999',
    label: '指南',
    contents: [
      {
        value: '0001',
        label: '介绍',
        content: () => import('./0001')
      }
    ]
  },
  {
    value: '9998',
    label: '接口文档',
    contents: [
      {
        value: '0002',
        label: '普通执行器',
        icon: FUNCTION_ICON,
        content: () => import('./0002')
      },
      {
        value: '0003',
        label: '渐变执行器',
        icon: FUNCTION_ICON,
        content: () => import('./0003')
      },
      {
        value: '0004',
        label: '缓存执行器',
        icon: FUNCTION_ICON,
        content: () => import('./0004')
      },
      {
        value: '0005',
        label: '缓存渐变执行器',
        icon: FUNCTION_ICON,
        content: () => import('./0005')
      }
    ]
  }
]

export default function Index(props: PageProps) {
  return (
    <PageDoc 
      {...props}
      language="zh"
      version={pkg.version}
      collections={COLLECTIONS}
      name={pkg.name}
      description={pkg.description}
    />
  )
}
