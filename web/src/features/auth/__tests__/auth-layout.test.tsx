/* 验收测试：TENET 认证页左右分栏布局
 * 覆盖：大屏左 60% 品牌展示区 + 右 40% 表单区；语言切换按钮；
 * 品牌文案键（隐私/安全/易用）；en 模式下标题为英文（回归 bug：英文显示中文）。
 * 直接 import 具体文件，避免经过 barrel 引入 zod 等重依赖。
 */
import { describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ to, className, children }: { to: string; className?: string; children?: React.ReactNode }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}))

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

async function renderLayout(lng = 'en') {
  const { render } = await import('@testing-library/react')
  const i18n = (await import('i18next')).createInstance()
  const { I18nextProvider, initReactI18next } = await import('react-i18next')
  const en = {
    'Back to Home': 'Back to Home',
    'TENET CREED': 'TENET CREED',
    'One creed, every model within reach': 'One creed, every model within reach',
    'Privacy first': 'Privacy first',
    'Secure by design': 'Secure by design',
    'Instant access': 'Instant access',
    Console: 'Console',
    'Model Square': 'Model Square',
    Rankings: 'Rankings',
    Docs: 'Docs',
    About: 'About',
    'Change language': 'Change language',
    Logo: 'Logo',
    'One unified API, all models': 'One unified API, all models',
    'One key, one control panel': 'One key, one control panel',
    'Private by default, yours forever': 'Private by default, yours forever',
    'A creed of clarity — light in weight, vast in reach. One protocol, every model within reach.': 'A creed of clarity — light in weight, vast in reach. One protocol, every model within reach.',
    'Access a vast selection of models through one unified protocol — manage keys in one place, see usage in real time.': 'Access a vast selection of models through one unified protocol — manage keys in one place, see usage in real time.',
    'We never store request bodies or train on your data — it stays yours.': 'We never store request bodies or train on your data — it stays yours.',
    'Full-chain TLS encryption, with key operations auditable end to end.': 'Full-chain TLS encryption, with key operations auditable end to end.',
    'Register and go — a single API key unlocks every model on the platform.': 'Register and go — a single API key unlocks every model on the platform.',
  }
  const zh = {
    'Back to Home': '返回首页',
    'TENET CREED': '信条',
    'One creed, every model within reach': '一念之轻，接万模之响',
    'Privacy first': '隐私优先',
    'Secure by design': '安全内建',
    'Instant access': '即开即用',
    Console: '控制台',
    'Model Square': '模型广场',
    Rankings: '排行榜',
    Docs: '文档',
    About: '关于',
    'Change language': '更改语言',
    Logo: 'Logo',
    'One unified API, all models': '一个统一 API，全量模型',
    'One key, one control panel': '一把密钥，一处掌控',
    'Private by default, yours forever': '默认私密，数据永归你所有',
    'A creed of clarity — light in weight, vast in reach. One protocol, every model within reach.': '一念之轻，接万模之响——一个协议，触达万物模型。',
    'Access a vast selection of models through one unified protocol — manage keys in one place, see usage in real time.': '通过一个统一协议接入海量模型——一处管理密钥，实时查看用量。',
    'We never store request bodies or train on your data — it stays yours.': '不存请求体、不参与训练，数据始终属于你。',
    'Full-chain TLS encryption, with key operations auditable end to end.': '全链路 TLS 加密，关键操作全程可审计。',
    'Register and go — a single API key unlocks every model on the platform.': '注册即开，一个密钥解锁平台上的全部模型。',
  }
  await i18n.use(initReactI18next).init({
    lng,
    fallbackLng: 'en',
    resources: { en: { translation: en }, zhCN: { translation: zh } },
  })
  const { AuthLayout } = await import('@/features/auth/auth-layout')
  const view = render(
    <I18nextProvider i18n={i18n}>
      <AuthLayout>
        <form aria-label="auth-form">
          <input aria-label="username" />
        </form>
      </AuthLayout>
    </I18nextProvider>
  )
  return { view, i18n }
}

describe('TENET AuthLayout 左右分栏', () => {
  it('沉浸式品牌背景 + 左 60% 品牌区 + 右悬浮卡片表单', async () => {
    const { view } = await renderLayout('zhCN')
    // 整页为沉浸式品牌背景容器
    const page = view.container.querySelector('.tenet-auth-page')
    expect(page).not.toBeNull()
    // 左栏品牌展示区（60%）
    const brand = view.container.querySelector('aside.w-\\[60\\%\\]')
    expect(brand).not.toBeNull()
    // 全宽导航头存在且在最上方
    const nav = view.container.querySelector('header.tenet-auth-nav')
    expect(nav).not.toBeNull()
    const navLink = nav?.querySelector('a[href="/"]')
    expect(navLink).not.toBeNull()

    const form = view.container.querySelector('form[aria-label="auth-form"]')
    expect(form).not.toBeNull()
    // 表单外层是悬浮卡片
    const card = form?.closest('.tenet-auth-card')
    expect(card).not.toBeNull()
  })

  it('导航头 + 特性点 + 纵向品牌理念，无底部文字按钮', async () => {
    const { view } = await renderLayout('zhCN')
    const page = view.container.querySelector('.tenet-auth-page')
    const nav = view.container.querySelector('header.tenet-auth-nav')
    expect(nav).not.toBeNull()
    // 导航头包含返回首页 + 语言切换
    expect(nav?.textContent).toContain('返回首页')
    const aside = view.container.querySelector('aside')
    expect(aside).not.toBeNull()
    expect(aside?.textContent).toContain('隐私优先')
    expect(aside?.textContent).toContain('安全内建')
    expect(aside?.textContent).toContain('即开即用')
    // 品牌理念为纵向排列（flex-col）
    const creed = aside?.querySelector('.flex.flex-col')
    expect(creed).not.toBeNull()
    expect(aside?.textContent).toContain('一个统一 API')
    // 不再有 控制台/模型广场 等文字入口按钮
    expect(page?.textContent).not.toContain('模型广场')
    expect(aside?.querySelectorAll('svg').length).toBeGreaterThan(0)
    // 语言切换按钮存在（sr-only 文案可匹配）
    const langText = view.container.querySelector('button .sr-only')
    expect(langText).not.toBeNull()
  })

  it('切换语言时品牌文案随之更新', async () => {
    const { view, i18n } = await renderLayout('zhCN')
    expect(view.container.textContent).toContain('一念之轻')
    await i18n.changeLanguage('en')
    expect(view.container.textContent).toContain('One creed, every model within reach')
    expect(view.container.textContent).toContain('Privacy first')
  })

  it('en 模式下登录标题为英文（回归：修复 en.json 误写中文）', async () => {
    const { view } = await renderLayout('en')
    // 品牌区不包含中文标语
    expect(view.container.textContent).not.toContain('一念之轻')
    expect(view.container.textContent).toContain('One creed, every model within reach')
  })
})




