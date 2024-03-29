import classNames from "clsx"

import type { ApplicationProps } from ".."

export type DirectionSidebar = "left" | "right"

export interface SidebarProps {
  direction: DirectionSidebar
  visible: boolean
  path?: ApplicationProps
  isMobile: boolean
}

export const Sidebar: React.FC<React.PropsWithChildren<SidebarProps>> = (
  props,
) => {
  const { direction, visible, children, path, isMobile } = props

  return (
    <nav
      className={classNames(
        "h-full-without-header visible z-50 flex bg-gray-200 drop-shadow-2xl transition-all dark:bg-gray-800",
        {
          "scrollbar-firefox-support right-0 top-0 flex-col space-y-1 overflow-y-auto":
            direction === "right",
          "w-72": direction === "right" && visible,
          "invisible w-0 opacity-0": !visible,
          "w-80": direction === "left" && visible,
          "max-w-max": typeof path !== "string" && direction === "left",
          "right-0 top-0": direction === "right" && isMobile,
          absolute: isMobile,
        },
      )}
    >
      {children}
    </nav>
  )
}
