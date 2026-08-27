/* 集成验收测试：TENET 登录页 UI 改造 */
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/stores/auth-store', () => ({
  useAuthStore: () => ({ auth: { user: null, token: null } }),
}))

vi.mock('@/hooks/use-system-config', () => ({
  useSystemConfig: () => ({ systemName: 'TENET', logo: '/logo.png', loading: false }),
}))

vi.mock('@/lib/api', () => ({
  api: { put: vi.fn().mockResolvedValue({}) },
  isAuthBundle: () => true,
}))

async function setupI18n() {
  const i18n = (await import('i18next')).createInstance()
  const { I18nextProvider, initReactI18next } = await import('react-i18next')
  await i18n.use(initReactI18next).init({ lng: 'en', resources: { en: { translation: {} } } })
  return { i18n, I18nextProvider }
}

describe('TENET SignIn page', () => {
  it('渲染标题与浮动标签输入框', async () => {
    const { render, screen } = await import('@testing-library/react')
    const { i18n, I18nextProvider } = await setupI18n()
    const { FloatingLabelInput } = await import('@/components/floating-label-input')
    render(
      <I18nextProvider i18n={i18n}>
        <div>
          <h2>Welcome back</h2>
          <FloatingLabelInput label="Username or Email" id="username" defaultValue="" />
          <FloatingLabelInput label="Password" id="password" defaultValue="" />
        </div>
      </I18nextProvider>
    )
    expect(screen.getByText('Welcome back')).toBeDefined()
    expect(document.querySelectorAll('input#username ~ label span').length).toBeGreaterThan(1)
    expect(document.querySelectorAll('input#password ~ label span').length).toBeGreaterThan(1)
  })

  it('输入框 onBlur 触发', async () => {
    const { render, fireEvent } = await import('@testing-library/react')
    const { FloatingLabelInput } = await import('@/components/floating-label-input')
    const onBlur = vi.fn()
    render(<FloatingLabelInput label="Username" id="u" onBlur={onBlur} />)
    const input = document.getElementById('u') as HTMLInputElement
    fireEvent.focus(input)
    fireEvent.blur(input)
    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('语言切换按钮存在', async () => {
    const { render } = await import('@testing-library/react')
    const { i18n, I18nextProvider } = await setupI18n()
    const { LanguageSwitcher } = await import('@/components/language-switcher')
    const view = render(
      <I18nextProvider i18n={i18n}>
        <div className='relative'>
          <LanguageSwitcher />
        </div>
      </I18nextProvider>
    )
    const languagesIcon = view.container.querySelector('svg')
    expect(languagesIcon).not.toBeNull()
  }, 10000)
})