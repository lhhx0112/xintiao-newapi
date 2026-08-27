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
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { Skeleton } from '@/components/ui/skeleton'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useSystemConfig } from '@/hooks/use-system-config'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()

  return (
    <div className='relative grid h-svh max-w-none place-items-center overflow-hidden'>
      {/* 顶部品牌：左上角 logo + 名称 */}
      <Link
        to='/'
        className='absolute top-4 left-4 z-10 flex items-center gap-2 transition-opacity hover:opacity-80 sm:top-8 sm:left-8'
      >
        <div className='relative h-9 w-9'>
          {loading ? (
            <Skeleton className='absolute inset-0 rounded-xl' />
          ) : (
            <img
              src={logo}
              alt={t('Logo')}
              className='h-9 w-9 rounded-xl object-contain shadow-sm'
            />
          )}
        </div>
        {loading ? (
          <Skeleton className='h-6 w-28' />
        ) : (
          <h1 className='text-lg font-medium tracking-tight'>{systemName}</h1>
        )}
      </Link>

      {/* 中央卡片 */}
      <div className='container flex items-center justify-center px-4 sm:pt-0'>
        <div className='relative w-full max-w-md'>
          <div className='absolute top-3 right-3 z-20'>
            <LanguageSwitcher />
          </div>
          <div className='border-border/60 from-card/90 to-card/60 bg-gradient-to-b p-6 shadow-[0_20px_50px_-20px_rgba(120,80,30,0.25)] ring-1 ring-black/5 sm:rounded-3xl sm:p-8 sm:ring-1'>
            <div className='mx-auto flex w-full flex-col space-y-6'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
