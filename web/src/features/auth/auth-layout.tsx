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
import {
  ArrowLeft,
  Fingerprint,
  KeyRound,
  Layers3,
  Lock,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { LanguageSwitcher } from '@/components/language-switcher'
import { Skeleton } from '@/components/ui/skeleton'
import { useSystemConfig } from '@/hooks/use-system-config'

type AuthLayoutProps = {
  children: React.ReactNode
}

/**
 * TENET 认证页布局：沉浸式全屏品牌背景 + 左右分栏（大屏 6:4）。
 * - 整屏为品牌轻奢背景（无分栏底色），顶部导航头固定在整屏最上方、滚动不消失
 * - 左 60%：品牌展示（标语 / 特性 / 品牌理念）
 * - 右 40%：悬浮白色表单卡片（登录 / 注册）
 * - 窄屏（<lg）隐藏品牌展示，仅保留悬浮表单 + 移动端导航
 * 仅影响视觉与排版，不改变任何认证 / 校验 / 提交逻辑。
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()

  const features: ReadonlyArray<{
    icon: LucideIcon
    title: string
    description: string
  }> = [
    {
      icon: Lock,
      title: t('Privacy first'),
      description: t(
        'We never store request bodies or train on your data — it stays yours.'
      ),
    },
    {
      icon: ShieldCheck,
      title: t('Secure by design'),
      description: t(
        'Full-chain TLS encryption, with key operations auditable end to end.'
      ),
    },
    {
      icon: Zap,
      title: t('Instant access'),
      description: t(
        'Register and go — a single API key unlocks every model on the platform.'
      ),
    },
  ]

  const creedPoints: ReadonlyArray<{ icon: LucideIcon; text: string }> = [
    { icon: Layers3, text: t('One unified API, all models') },
    { icon: KeyRound, text: t('One key, one control panel') },
    { icon: Fingerprint, text: t('Private by default, yours forever') },
  ]

  return (
    <div className='tenet-auth-page relative flex h-svh w-full max-w-none flex-col overflow-hidden'>
      {/* 装饰光晕（整屏品牌背景） */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(255,224,178,0.5),transparent_62%)] blur-2xl'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute top-1/4 -right-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(214,164,105,0.28),transparent_62%)] blur-2xl'
      />

      {/* ===== 全宽固定导航头（始终置顶，不随滚动消失） ===== */}
      <header className='tenet-auth-nav relative z-20 flex shrink-0 items-center justify-between px-6 sm:px-10'>
        <Link
          to='/'
          className='flex items-center gap-3 transition-opacity hover:opacity-80'
        >
          <div className='relative h-9 w-9'>
            {loading ? (
              <Skeleton className='absolute inset-0 rounded-xl bg-black/10' />
            ) : (
              <img
                src={logo}
                alt={t('Logo')}
                className='h-9 w-9 rounded-xl object-contain shadow-sm'
              />
            )}
          </div>
          {loading ? (
            <Skeleton className='h-6 w-28 bg-black/10' />
          ) : (
            <h1 className='text-lg font-semibold tracking-wide text-[oklch(0.3_0.02_55)]'>
              {systemName}
            </h1>
          )}
        </Link>

        <nav className='flex items-center gap-1'>
          <LanguageSwitcher className='text-[oklch(0.3_0.02_55)] hover:bg-[oklch(0.92_0.02_60)]/70 hover:text-[oklch(0.42_0.08_60)]' />
          <Link
            to='/'
            className='flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm text-[oklch(0.3_0.02_55)] transition-colors hover:bg-[oklch(0.92_0.02_60)]/70 hover:text-[oklch(0.42_0.08_60)]'
          >
            <ArrowLeft className='size-4' aria-hidden='true' />
            {t('Back to Home')}
          </Link>
        </nav>
      </header>

      {/* ===== 主体：左品牌展示 + 右悬浮表单 ===== */}
      <div className='relative z-10 flex min-h-0 flex-1'>
        {/* 左 60%：品牌展示（仅大屏） */}
        <aside className='hidden w-[60%] shrink-0 flex-col justify-center px-10 pb-4 lg:flex'>
          <div className='flex items-center gap-2 text-[oklch(0.62_0.11_68)]'>
            <Sparkles className='size-4' aria-hidden='true' />
            <span className='text-sm font-semibold tracking-[0.25em] uppercase'>
              {t('TENET CREED')}
            </span>
          </div>

          <h2 className='mt-5 max-w-xl font-serif text-4xl leading-[1.18] font-medium tracking-tight text-[oklch(0.28_0.02_55)] xl:text-5xl'>
            {t('One creed, every model within reach')}
          </h2>

          <p className='mt-6 max-w-md text-base leading-relaxed text-[oklch(0.42_0.02_58)]'>
            {t(
              'Access a vast selection of models through one unified protocol — manage keys in one place, see usage in real time.'
            )}
          </p>

          {/* 特性点 */}
          <div className='mt-9 max-w-md space-y-4'>
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className='flex items-start gap-3'>
                <div className='mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border border-[oklch(0.72_0.1_72)]/35 bg-white/55 shadow-sm backdrop-blur-sm'>
                  <Icon
                    className='size-4.5 text-[oklch(0.58_0.11_68)]'
                    strokeWidth={1.75}
                    aria-hidden='true'
                  />
                </div>
                <div>
                  <p className='text-sm font-semibold text-[oklch(0.3_0.02_55)]'>
                    {title}
                  </p>
                  <p className='mt-0.5 text-sm leading-snug text-[oklch(0.45_0.02_58)]'>
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 品牌理念标签（从上到下、左对齐） */}
          <div className='mt-9 flex max-w-md flex-col gap-2.5'>
            {creedPoints.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className='flex items-center gap-2 text-sm font-medium text-[oklch(0.42_0.02_58)]'
              >
                <Icon
                  className='size-4 shrink-0 text-[oklch(0.62_0.11_68)]'
                  strokeWidth={1.75}
                  aria-hidden='true'
                />
                {text}
              </span>
            ))}
          </div>

          <p className='mt-9 max-w-md border-t border-[oklch(0.72_0.1_72)]/25 pt-5 text-sm leading-relaxed text-[oklch(0.45_0.02_58)]'>
            {t(
              'A creed of clarity — light in weight, vast in reach. One protocol, every model within reach.'
            )}
          </p>
        </aside>

        {/* 右 40%：悬浮表单卡片（沉浸式背景之上） */}
        <main className='relative flex min-w-0 flex-1 items-center justify-center overflow-y-auto px-4 py-6 sm:px-8'>
          {/* 窄屏导航头（导航头整体在全宽 header，这里仅表单） */}
          <div className='w-full'>
            <div className='tenet-auth-card mx-auto w-full max-w-md'>
              <div className='mx-auto w-full space-y-6'>{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

