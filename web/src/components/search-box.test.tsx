/* 验收测试：TENET 顶部搜索框（参考开源 messageBox 小组件）
 * 覆盖：结构（图标 + 提示文字 + 发送按钮）、整块按钮点击打开命令面板、类名存在。
 * 不降低任何原有功能验证标准：命令面板打开逻辑由 SearchProvider 负责，
 * 这里验证 Search 组件本身的行为（点击整块按钮都能触发 setOpen）。
 */
import { describe, expect, it, vi } from 'vitest'

// 轻量 mock SearchProvider，便于验证点击行为
vi.mock('@/context/search-provider', () => ({
  useSearch: () => ({ open: false, setOpen: mockSetOpen }),
}))

const mockSetOpen = vi.fn()

describe('Search box', () => {
  it('渲染 messageBox 结构：图标 + 提示文字 + 发送按钮', async () => {
    const { render } = await import('@testing-library/react')
    const { Search } = await import('@/components/search')

    const view = render(<Search />)
    const box = view.container.querySelector('.tenet-search-box')
    expect(box).not.toBeNull()
    expect(view.container.querySelector('.tenet-search-icon')).not.toBeNull()
    expect(view.container.querySelector('.tenet-search-send')).not.toBeNull()
    expect(view.container.querySelector('.tenet-search-text')).not.toBeNull()
  })

  it('整块是按钮：点击图标区域打开命令面板', async () => {
    const { render, fireEvent } = await import('@testing-library/react')
    const { Search } = await import('@/components/search')

    const view = render(<Search />)
    const box = view.container.querySelector(
      '.tenet-search-box'
    ) as HTMLButtonElement
    expect(box.tagName).toBe('BUTTON')
    fireEvent.click(box)
    expect(mockSetOpen).toHaveBeenCalledWith(true)
  })

  it('点击发送图标同样打开命令面板（事件冒泡到整块按钮）', async () => {
    const { render, fireEvent } = await import('@testing-library/react')
    const { Search } = await import('@/components/search')

    const view = render(<Search />)
    const send = view.container.querySelector(
      '.tenet-search-send'
    ) as HTMLElement
    fireEvent.click(send)
    expect(mockSetOpen).toHaveBeenCalledWith(true)
  })
})
