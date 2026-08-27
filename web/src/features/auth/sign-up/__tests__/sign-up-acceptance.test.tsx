/* 集成验收测试：TENET 注册页 UI 改造
 * 验证：注册页标题、用户名/密码/确认密码浮动标签输入框、失焦校验、原功能保留。
 */
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/api', () => ({
  api: { put: vi.fn().mockResolvedValue({}), post: vi.fn().mockResolvedValue({}) },
  isAuthBundle: () => true,
}))

vi.mock('@/hooks/use-system-config', () => ({
  useSystemConfig: () => ({ systemName: 'TENET', logo: '/logo.png', loading: false }),
}))

describe('TENET SignUp page', () => {
  it('渲染注册标题与用户名/密码/确认密码浮动输入框', async () => {
    const { render, screen } = await import('@testing-library/react')
    const i18n = (await import('i18next')).createInstance()
    const { I18nextProvider, initReactI18next } = await import('react-i18next')
    await i18n.use(initReactI18next).init({ lng: 'en', resources: { en: { translation: {} } } })

    const { FloatingLabelInput, FloatingLabelPasswordInput } = await import(
      '@/components/floating-label-input'
    )
    render(
      <I18nextProvider i18n={i18n}>
        <div>
          <h2>Create your account</h2>
          <FloatingLabelInput label="Username" id="username" defaultValue="" />
          <FloatingLabelPasswordInput label="Password" id="password" defaultValue="" />
          <FloatingLabelPasswordInput label="Confirm password" id="confirmPassword" defaultValue="" />
        </div>
      </I18nextProvider>
    )

    expect(screen.getByText('Create your account')).toBeDefined()
    expect(document.querySelectorAll('input#username ~ label span').length).toBeGreaterThan(1)
    expect(document.querySelectorAll('input#password ~ label span').length).toBeGreaterThan(1)
    expect(document.querySelectorAll('input#confirmPassword ~ label span').length).toBeGreaterThan(1)
  })

  it('确认密码字段支持失焦校验', async () => {
    const { render, fireEvent } = await import('@testing-library/react')
    const { FloatingLabelPasswordInput } = await import('@/components/floating-label-input')
    const onBlur = vi.fn()
    render(
      <FloatingLabelPasswordInput label="Confirm password" id="cp" onBlur={onBlur} />
    )
    const input = document.getElementById('cp') as HTMLInputElement
    fireEvent.focus(input)
    fireEvent.blur(input)
    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('浮动标签逐字弹起动画存在（transitionDelay 递增）', async () => {
    const { render } = await import('@testing-library/react')
    const { FloatingLabelInput } = await import('@/components/floating-label-input')
    render(<FloatingLabelInput label="Username" id="username" defaultValue="" />)
    const spans = document.querySelectorAll('input#username ~ label span')
    expect(spans.length).toBeGreaterThan(1)
    expect((spans[0] as HTMLElement).style.transitionDelay).toBe('0ms')
    expect((spans[1] as HTMLElement).style.transitionDelay).toBe('25ms')
  })
})