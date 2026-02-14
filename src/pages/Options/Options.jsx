import React, { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import { ConfigProvider, theme } from "antd"
import { ThemeProvider } from "styled-components"

import "./Options.css"
import "./index.css"

import storage from ".../storage/sync"
import About from "./about/About.jsx"
import GroupManagement from "./group/IndexGroup.jsx"
import ExtensionHistoryIndex from "./history/ExtensionHistoryIndex"
import ExtensionManageIndex from "./management/ExtensionManageIndex.jsx"
import ExtensionManageTable from "./management/ExtensionManageTable"
import ExtensionImport from "./management/import/ExtensionImport"
import ExtensionShare from "./management/share/ExtensionShare"
import Navigation from "./navigation/Navigation.jsx"
import RuleSetting from "./rule/RuleSetting.jsx"
import Scene from "./scene/IndexScene.jsx"
import Settings from "./settings/Settings.jsx"

const styled_light_theme = {
  bg: "#FFF",
  fg: "#222",
  fg2: "#333",
  fg3: "#555",
  fg4: "#666",
  fg5: "#777",
  fg6: "#888",
  border: "#eee",
  border2: "#ddd",
  border3: "#ccc",
  nav_hover_bg: "#eee",
  nav_link: "#337ab7",
  nav_link_hover: "#23527c",
  setting_gradient: "linear-gradient(to right, #337ab7aa, #fff)",
  setting_border_bottom: "#eee6",
  scene_edit_bg: "#eee",
  scene_edit_shadow: "#ddd",
  scene_new_hover_bg: "#f5f5f5",
  group_other_bg: "#ddd",
  group_other_color: "#666",
  sortable_item_bg: "#fff",
  sortable_item_color: "#333",
  sortable_shadow:
    "0 0 0 calc(1px / var(--scale-x, 1)) rgba(63, 63, 68, 0.05), 0 1px calc(3px / var(--scale-x, 1)) 0 rgba(34, 33, 81, 0.15)",
  card_shadow: "1px 1px 4px 0px #337ab788",
  drag_handle_hover_bg: "rgba(0, 0, 0, 0.05)",
  drag_handle_fill: "#919eab"
}

const styled_dark_theme = {
  bg: "#242529",
  fg: "#C9CACF",
  fg2: "#C9CACF",
  fg3: "#aaa",
  fg4: "#999",
  fg5: "#888",
  fg6: "#777",
  border: "#3a3a3a",
  border2: "#444",
  border3: "#555",
  nav_hover_bg: "#333",
  nav_link: "#5b9bd5",
  nav_link_hover: "#7ab5e8",
  setting_gradient: "linear-gradient(to right, #337ab744, #242529)",
  setting_border_bottom: "#3a3a3a",
  scene_edit_bg: "#3a3a3a",
  scene_edit_shadow: "#222",
  scene_new_hover_bg: "#333",
  group_other_bg: "#444",
  group_other_color: "#aaa",
  sortable_item_bg: "#2c2d31",
  sortable_item_color: "#ccc",
  sortable_shadow:
    "0 0 0 calc(1px / var(--scale-x, 1)) rgba(200, 200, 200, 0.1), 0 1px calc(3px / var(--scale-x, 1)) 0 rgba(0, 0, 0, 0.3)",
  card_shadow: "1px 1px 4px 0px #00000088",
  drag_handle_hover_bg: "rgba(255, 255, 255, 0.1)",
  drag_handle_fill: "#666"
}

function Options() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [themeReady, setThemeReady] = useState(false)

  useEffect(() => {
    storage.options.getAll().then((options) => {
      const settingMode = options?.setting?.darkMode ?? "system"
      let dark = settingMode === "dark"
      if (settingMode === "system") {
        dark = window.matchMedia("(prefers-color-scheme: dark)").matches
      }
      setIsDarkMode(dark)
      setThemeReady(true)

      const t = dark ? styled_dark_theme : styled_light_theme
      if (dark) {
        document.body.style.backgroundColor = t.bg
        document.body.style.color = t.fg
      }

      // 设置 CSS 变量供纯 CSS 文件使用
      const root = document.documentElement
      root.style.setProperty("--sortable-item-bg", t.sortable_item_bg)
      root.style.setProperty("--sortable-item-color", t.sortable_item_color)
      root.style.setProperty("--sortable-shadow", t.sortable_shadow)
      root.style.setProperty("--drag-handle-hover-bg", t.drag_handle_hover_bg)
      root.style.setProperty("--drag-handle-fill", t.drag_handle_fill)
    })
  }, [])

  if (!themeReady) {
    return null
  }

  const currentTheme = isDarkMode ? styled_dark_theme : styled_light_theme

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#337ab7"
        }
      }}>
      <ThemeProvider theme={currentTheme}>
        <div className="option-container">
          <div className="option-nav">
            <Navigation></Navigation>
          </div>

          <div className="option-content">
            <Routes>
              <Route path="/" element={<Navigate to="/about" replace />}></Route>
              <Route path="/about" element={<About />} />
              <Route path="/setting" element={<Settings />} />
              <Route path="/scene" element={<Scene />} />
              <Route path="/group" element={<GroupManagement />} />
              <Route path="/management" element={<ExtensionManageIndex />}>
                <Route index element={<ExtensionManageTable />} />
                <Route path="share" element={<ExtensionShare />} />
                <Route path="import" element={<ExtensionImport />} />
              </Route>
              <Route path="/rule" element={<RuleSetting />} />
              <Route path="/history" element={<ExtensionHistoryIndex />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </ConfigProvider>
  )
}

export default Options
