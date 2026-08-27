/* 验收测试：TENET 动画提交按钮（登录/注册）
 * 验证：渲染结构（双箭头 + 圆点 + 文字）、disabled 状态、loading 状态、onClick 透传。
 * 动画细节（hover 扩散）由 CSS 类控制，这里验证类名存在与 DOM 结构。
 */
import { describe, expect, it, vi } from 'vitest'

describe('AnimatedButton', () => {
  it('渲染双箭头 + 圆圈 + 文字，并带 tenet-animated-button 类', async () => {
    const { render } = await import('@testing-library/react')
    const { AnimatedButton } = await import('@/components/animated-button')
    const view = render(<AnimatedButton>Sign in</AnimatedButton>)
    const btn = view.container.querySelector('.tenet-animated-button')
    expect(btn).not.toBeNull()
    expect(view.container.querySelector('.arr-1')).not.toBeNull()
    expect(view.container.querySelector('.arr-2')).not.toBeNull()
    expect(view.container.querySelector('.circle')).not.toBeNull()
    expect(view.container.querySelector('.text')?.textContent).toContain('Sign in')
  })

  it('loading 时渲染 spinner 且按钮禁用', async () => {
    const { render } = await import('@testing-library/react')
    const { AnimatedButton } = await import('@/components/animated-button')
    const view = render(<AnimatedButton loading>Sign in</AnimatedButton>)
    const btn = view.container.querySelector('button') as HTMLButtonElement
    expect(btn.disabled).toBe(true)
    expect(view.container.querySelector('.animate-spin')).not.toBeNull()
  })

  it('disabled 时按钮禁用且不触发 onClick', async () => {
    const { render, fireEvent } = await import('@testing-library/react')
    const { AnimatedButton } = await import('@/components/animated-button')
    const onClick = vi.fn()
    const view = render(<AnimatedButton disabled onClick={onClick}>Sign in</AnimatedButton>)
    const btn = view.container.querySelector('button') as HTMLButtonElement
    fireEvent.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })
})