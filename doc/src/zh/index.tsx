import React from 'react'
import { FunctionIcon } from 'sicon'
import { PageDoc } from 'com/page-doc'
import pkg from '../../../package.json'
import type { PageProps } from 'sdin-react'
import type { Collection } from 'ark-doc'

const FUNCTION_ICON = <FunctionIcon color="var(--orange)" />

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
