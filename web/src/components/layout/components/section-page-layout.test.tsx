/* 验收测试：TENET 板块页面布局
 * 覆盖：标题行与正文在同一个可滚动容器内（导航头由 AppHeader sticky 固定，
 * 标题行随内容滚动收回）；fixedContent 表格页内容区保持确定高度。
 */
import { describe, expect, it } from 'vitest'

describe('SectionPageLayout', () => {
  it('标题行与正文在同一个可滚动容器内', async () => {
    const { render } = await import('@testing-library/react')
    const { SectionPageLayout } = await import(
      '@/components/layout/components/section-page-layout'
    )

    const view = render(
      <SectionPageLayout>
        <SectionPageLayout.Title>Overview</SectionPageLayout.Title>
        <SectionPageLayout.Content>Body</SectionPageLayout.Content>
      </SectionPageLayout>
    )

    const scrollable = view.container.querySelector('.overflow-auto')
    expect(scrollable).not.toBeNull()
    // 标题和正文都在这个滚动容器内
    expect(scrollable?.textContent).toContain('Overview')
    expect(scrollable?.textContent).toContain('Body')
  })

  it('fixedContent 模式内容区有确定高度（表格内部滚动）', async () => {
    const { render } = await import('@testing-library/react')
    const { SectionPageLayout } = await import(
      '@/components/layout/components/section-page-layout'
    )

    const view = render(
      <SectionPageLayout fixedContent>
        <SectionPageLayout.Title>Keys</SectionPageLayout.Title>
        <SectionPageLayout.Content>
          <div>Table</div>
        </SectionPageLayout.Content>
      </SectionPageLayout>
    )

    const contentWrap = view.container.querySelector('.h-full.min-h-0')
    expect(contentWrap).not.toBeNull()
  })
})
