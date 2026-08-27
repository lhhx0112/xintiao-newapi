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
import { Input as InputPrimitive } from '@base-ui/react/input'
import { Eye, EyeOff } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'

type FloatingLabelInputProps = React.ComponentProps<'input'> & {
  label: string
  containerClassName?: string
  trailing?: React.ReactNode
}

function splitLabel(label: string) {
  return label.split('').map((ch, i) => (
    <span key={`${ch}-${i}`} style={{ transitionDelay: `${i * 25}ms` }}>{ch === ' ' ? '\u00A0' : ch}</span>
  ))
}

/**
 * TENET 浮动标签输入框：无边框 + 底部细线 + 聚焦/有值时标签弹起动画。
 * 与 react-hook-form 的 FormControl 完全兼容（透传 id / aria-*）。
 */
function FloatingLabelInput({
  label,
  className,
  containerClassName,
  trailing,
  id,
  type,
  ...props
}: FloatingLabelInputProps) {
  return (
    <div className={cn('tenet-float-field', containerClassName)}>
      <InputPrimitive
        id={id}
        data-slot='input'
        type={type ?? 'text'}
        placeholder=' '
        className={cn('h-12 w-full min-w-0', className)}
        {...props}
      />
      <label htmlFor={id}>{splitLabel(label)}</label>
      {trailing}
    </div>
  )
}

type FloatingLabelPasswordInputProps = Omit<
  FloatingLabelInputProps,
  'type'
>

export function FloatingLabelPasswordInput({
  className,
  disabled,
  ...props
}: FloatingLabelPasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <FloatingLabelInput
      type={showPassword ? 'text' : 'password'}
      disabled={disabled}
      className={className}
      {...props}
      trailing={
        <Button
          type='button'
          size='icon'
          variant='ghost'
          disabled={disabled}
          className='text-muted-foreground absolute end-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-md'
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label='Toggle password visibility'
        >
          {showPassword ? (
            <Eye size={18} aria-hidden='true' />
          ) : (
            <EyeOff size={18} aria-hidden='true' />
          )}
        </Button>
      }
    />
  )
}

export { FloatingLabelInput }
