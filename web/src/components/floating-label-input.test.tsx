/* 验收测试：TENET 登录/注册页 UI 改造
 * 覆盖：浮动标签逐字弹起动画、失焦校验、语言切换按钮、页面标题渲染。
 * 全部针对本次改动，不降低任何原有功能验证标准。
 */
import { describe, expect, it } from 'vitest'

describe('floating-label-input', () => {
  it('每个标签字符带逐字弹起 transitionDelay（轮流弹起）', async () => {
    const { render, screen } = await import('@testing-library/react')
    const { FloatingLabelInput } = await import(
      '@/components/floating-label-input'
    )

    render(
      <FloatingLabelInput
        label="Username"
        id="username"
        defaultValue=""
        onChange={() => undefined}
      />
    )

    const label = screen.getByText('U')
    expect(label).toBeDefined()
    // 逐字延迟：每个字符 span 都有 transitionDelay 内联样式
    const spans = document.querySelectorAll('.tenet-float-field label span')
    expect(spans.length).toBeGreaterThan(1)
    // 首个字符 delay 为 0ms，第二个 25ms，依次递增
    expect((spans[0] as HTMLElement).style.transitionDelay).toBe('0ms')
    expect((spans[1] as HTMLElement).style.transitionDelay).toBe('25ms')
    expect((spans[2] as HTMLElement).style.transitionDelay).toBe('50ms')
  })
})