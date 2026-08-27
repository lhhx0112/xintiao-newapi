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
import { useRouterState } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import LoadingBar, { type LoadingBarRef } from 'react-top-loading-bar'

import { cn } from '@/lib/utils'

export function NavigationProgress() {
  const ref = useRef<LoadingBarRef>(null)
  const state = useRouterState()
  const isPending = state.status === 'pending'

  useEffect(() => {
    if (isPending) {
      ref.current?.continuousStart()
    } else {
      ref.current?.complete()
    }
  }, [isPending])

  return (
    <>
      <LoadingBar
        color='var(--tenet-gold, #cda047)'
        ref={ref}
        shadow={true}
        height={2}
      />
      <div
        aria-hidden='true'
        className={cn(
          'tenet-progress-sheen',
          isPending ? 'opacity-100' : 'opacity-0'
        )}
      />
    </>
  )
}
