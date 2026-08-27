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
*/
import { Loader2 } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

/** 实心填充右箭头（Material arrow_forward 路径，fill 由 CSS 控制） */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 24 24'
      width='24'
      height='24'
      className={className}
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z' />
    </svg>
  )
}

type AnimatedButtonProps = React.ComponentProps<'button'> & {
  loading?: boolean
}

/**
 * TENET 动画提交按钮：严格复刻开源「animated-button」动效。
 * - 常态：药丸形 + 品牌金描边 + 实心箭头在右侧
 * - hover：金色圆从中心扩散填满按钮、左侧箭头滑入/右侧箭头滑出、文字右移、圆角变方
 * - active：整体微缩 0.95
 * 配色按 TENET 设计语言，动效严格一致。
 */
function AnimatedButton({
  className,
  children,
  loading = false,
  disabled,
  type = 'submit',
  ...props
}: AnimatedButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'tenet-animated-button disabled:opacity-60 disabled:cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      <ArrowIcon className='arr-1' />
      <ArrowIcon className='arr-2' />
      <span className='circle' aria-hidden='true' />
      <span className='text inline-flex items-center gap-2'>
        {loading ? <Loader2 className='h-4 w-4 animate-spin' /> : null}
        {children}
      </span>
    </button>
  )
}

export { AnimatedButton }