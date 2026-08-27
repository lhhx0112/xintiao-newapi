/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useTranslation } from 'react-i18next'

import { useSearch } from '@/context/search-provider'
import { cn } from '@/lib/utils'

type SearchProps = {
  className?: string
  placeholder?: string
}

/**
 * TENET 搜索框：参考用户提供的开源 messageBox 组件样式。
 * - 圆角消息框外观：左侧搜索图标 + 中间提示文字 + 右侧发送按钮
 * - 整块是一个按钮：点击任意位置都会打开 ⌘K 命令面板（原有功能完全保留）
 * - hover / focus 时边框高亮（品牌金）
 * 仅影响视觉，不改变任何搜索/命令面板逻辑。
 */
export function Search({ className = '', placeholder }: SearchProps) {
  const { t } = useTranslation()
  const { setOpen } = useSearch()
  const resolvedPlaceholder = placeholder ?? t('Search')

  const openCommandMenu = () => setOpen(true)

  return (
    <button
      type='button'
      className={cn('tenet-search-box group', className)}
      role='search'
      aria-label={resolvedPlaceholder}
      onClick={openCommandMenu}
    >
      <span className='tenet-search-icon' aria-hidden='true'>
        <svg
          viewBox='0 0 24 24'
          width='18'
          height='18'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='11' cy='11' r='8' />
          <path d='m21 21-4.3-4.3' />
        </svg>
      </span>

      <span className='tenet-search-text'>{resolvedPlaceholder}</span>

      <span className='tenet-search-send' aria-hidden='true'>
        <svg
          viewBox='0 0 24 24'
          width='18'
          height='18'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='m22 2-7 20-4-9-9-4z' />
          <path d='M22 2 11 13' />
        </svg>
      </span>
    </button>
  )
}
