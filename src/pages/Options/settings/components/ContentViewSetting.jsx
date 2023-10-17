import React, { memo, useEffect, useState } from "react"

import { QuestionCircleOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Radio, Segmented, Slider, Switch, Tooltip, message } from "antd"

import { getLang } from ".../utils/utils"
import { MAX_COLUMN_COUNT, MIN_COLUMN_COUNT } from "../SettingConst.js"

const ContentViewSetting = memo(({ setting, onSettingChange }) => {
  // 是否显示 APP
  const [isShowApp, setIsShowApp] = useState(false)

  // 是否在 Popup 中，展示固定分组中的扩展
  const [isShowFixedExtension, setIsShowFixedExtension] = useState(true)
  // 是否显示固定分组扩展上面的小圆点
  const [isShowDotOfFixedExtension, setIsShowDotOfFixedExtension] = useState(true)

  // 是否按分组显示
  const [isDisplayByGroup, setIsDisplayByGroup] = useState(false)
  // 置顶显示最近更新的扩展
  const [isTopRecentlyUpdate, setIsTopRecentlyUpdate] = useState(false)
  // 最近更新或者最近安装
  const [topRecentlyMode, setTopRecentlyMode] = useState("install")
  // 最近更新的计算天数
  const [topRecentlyDays, setTopRecentlyDays] = useState(7)

  // 列表视图下，是否总是显示扩展操作按钮
  const [isShowItemOperationAlways, setIsShowItemOperationAlways] = useState(false)
  // 网格视图下，显示 APP 名称
  const [isShowAppNameInGirdView, setIsShowAppNameInGirdView] = useState(false)
  // 网格视图下，每行显示的扩展个数
  const [columnCountInGirdView, setColumnCountInGirdView] = useState(6)
  // 网格视图下，禁用扩展使用灰色样式
  const [isGaryStyleOfDisableInGridView, setIsGaryStyleOfDisableInGridView] = useState(false)
  // 网格视图下，使用鼠标右键弹出菜单（而不是 hover）
  const [isMenuDisplayByRightClick, setIsMenuDisplayByRightClick] = useState(false)

  useEffect(() => {
    const showApp = setting.isShowApp ?? false
    setIsShowApp(showApp)

    const displayByGroup = setting.isDisplayByGroup ?? false
    setIsDisplayByGroup(displayByGroup)
    const topRecentlyUpdate = setting.isTopRecentlyUpdate ?? false
    setIsTopRecentlyUpdate(topRecentlyUpdate)
    const recentlyMode = setting.topRecentlyMode ?? "install"
    setTopRecentlyMode(recentlyMode)
    const recentlyDays = setting.topRecentlyDays ?? 7
    setTopRecentlyDays(recentlyDays)

    const showItemOperationAlways = setting.isShowItemOperationAlways ?? false
    setIsShowItemOperationAlways(showItemOperationAlways)

    const showFixedExtension = setting.isShowFixedExtension ?? true
    setIsShowFixedExtension(showFixedExtension)

    const showAppNameInGridView = setting.isShowAppNameInGirdView ?? false
    setIsShowAppNameInGirdView(showAppNameInGridView)

    // 网格视图下的列数
    let tempColumnInGirdView = Number(setting.columnCountInGirdView)
    if (
      Number.isNaN(tempColumnInGirdView) ||
      tempColumnInGirdView < MIN_COLUMN_COUNT ||
      tempColumnInGirdView > MAX_COLUMN_COUNT
    ) {
      tempColumnInGirdView = MIN_COLUMN_COUNT
    }
    setColumnCountInGirdView(tempColumnInGirdView)

    // 禁用扩展使用灰色样式
    const grayWhenDisable = setting.isGaryStyleOfDisableInGridView ?? false
    setIsGaryStyleOfDisableInGridView(grayWhenDisable)

    // 固定分组扩展的小圆点
    const dotOfFixedExtension = setting.isShowDotOfFixedExtension ?? true
    setIsShowDotOfFixedExtension(dotOfFixedExtension)

    // 网格视图下，使用鼠标右键弹出菜单
    const menuDisplayByRightClick = setting.isMenuDisplayByRightClick ?? false
    setIsMenuDisplayByRightClick(menuDisplayByRightClick)
  }, [setting])

  return (
    <div>
      {/* 显示 APP 类型的扩展 */}
      <div className="setting-item">
        <span>
          {getLang("setting_ui_show_app")}
          <Tooltip placement="top" title={getLang("setting_ui_show_app_tip")}>
            <QuestionCircleOutlined />
          </Tooltip>{" "}
        </span>
        <Switch
          size="small"
          checked={isShowApp}
          onChange={(value) => onSettingChange(value, setIsShowApp, "isShowApp")}></Switch>
      </div>

      {/* 显示固定分组中的扩展 */}
      <div className="setting-item">
        <span>
          {getLang("setting_ui_show_fixed_extension")}
          <Tooltip placement="top" title={getLang("setting_ui_show_fixed_extension_tip")}>
            <QuestionCircleOutlined />
          </Tooltip>{" "}
        </span>
        <Switch
          size="small"
          checked={isShowFixedExtension}
          onChange={(value) =>
            onSettingChange(value, setIsShowFixedExtension, "isShowFixedExtension")
          }></Switch>
      </div>

      {/* 显示固定分组扩展右上角的小圆点 */}
      <div className="setting-item">
        <span>{getLang("setting_ui_show_fixed_dot")}</span>
        <Switch
          size="small"
          checked={isShowDotOfFixedExtension}
          onChange={(value) =>
            onSettingChange(value, setIsShowDotOfFixedExtension, "isShowDotOfFixedExtension")
          }></Switch>
      </div>

      {/* 是否按分组来展示扩展 */}
      <div className="setting-item">
        <span>{getLang("setting_ui_show_by_group")}</span>
        <Switch
          size="small"
          checked={isDisplayByGroup}
          onChange={(value) =>
            onSettingChange(value, setIsDisplayByGroup, "isDisplayByGroup")
          }></Switch>
      </div>

      {/* 是否置顶显示最近更新的扩展 */}
      <div className="setting-item">
        <span>{getLang("setting_ui_top_recently_update")}</span>
        <Switch
          size="small"
          checked={isTopRecentlyUpdate}
          onChange={(value) =>
            onSettingChange(value, setIsTopRecentlyUpdate, "isTopRecentlyUpdate")
          }></Switch>
      </div>

      {/* 最近更新或者最近安装 */}
      {isTopRecentlyUpdate && (
        <div className="setting-item">
          <span>
            ↑ {getLang("setting_ui_top_recently_install_or_update")}
            <Tooltip
              placement="top"
              title={getLang("setting_ui_top_recently_install_or_update_tip")}>
              <QuestionCircleOutlined />
            </Tooltip>
          </span>

          <Radio.Group
            size="small"
            value={topRecentlyMode}
            onChange={(e) =>
              onSettingChange(e.target.value, setTopRecentlyMode, "topRecentlyMode")
            }>
            <Radio value="install">{getLang("setting_ui_top_recently_install_select")}</Radio>
            <Radio value="update">{getLang("setting_ui_top_recently_update_select")}</Radio>
          </Radio.Group>
        </div>
      )}

      {/* 最近更新的计算天数 */}
      {isTopRecentlyUpdate && (
        <div className="setting-item">
          <span>↑ {getLang("setting_ui_top_recently_days")}</span>
          <Radio.Group
            size="small"
            value={topRecentlyDays}
            onChange={(e) =>
              onSettingChange(e.target.value, setTopRecentlyDays, "topRecentlyDays")
            }>
            <Radio value={7}>7 Days</Radio>
            <Radio value={15}>15 Days</Radio>
            <Radio value={30}>30 Days</Radio>
          </Radio.Group>
        </div>
      )}

      {/* 列表视图下，始终显示快捷操作按钮（默认 hover 显示） */}
      <div className="setting-item">
        <span>{getLang("setting_list_view_show_button")}</span>
        <Switch
          size="small"
          checked={isShowItemOperationAlways}
          onChange={(value) =>
            onSettingChange(value, setIsShowItemOperationAlways, "isShowItemOperationAlways")
          }></Switch>
      </div>

      {/* 网格视图下，显示扩展名称 */}
      <div className="setting-item">
        <span>
          {getLang("setting_list_gird_show_name")}
          <Tooltip placement="top" title={getLang("setting_list_gird_show_name_tip")}>
            <QuestionCircleOutlined />
          </Tooltip>{" "}
        </span>
        <Switch
          size="small"
          checked={isShowAppNameInGirdView}
          onChange={(value) =>
            onSettingChange(value, setIsShowAppNameInGirdView, "isShowAppNameInGirdView")
          }></Switch>
      </div>

      {/* 网格视图下，扩展显示的列数 */}
      <div className="setting-item">
        <span>
          {getLang("setting_list_gird_show_column_number")} ({columnCountInGirdView})
        </span>
        <Slider
          style={{ width: 100, margin: "0 10px 0 0" }}
          defaultValue={30}
          value={columnCountInGirdView}
          onChange={(value) =>
            onSettingChange(value, setColumnCountInGirdView, "columnCountInGirdView")
          }
          min={MIN_COLUMN_COUNT}
          max={MAX_COLUMN_COUNT}
          step={1}
        />
      </div>

      {/* 网格视图下，使用灰色样式显示被禁用的扩展 */}
      <div className="setting-item">
        <span>{getLang("setting_list_gird_show_disable_gray")}</span>
        <Switch
          size="small"
          checked={isGaryStyleOfDisableInGridView}
          onChange={(value) =>
            onSettingChange(
              value,
              setIsGaryStyleOfDisableInGridView,
              "isGaryStyleOfDisableInGridView"
            )
          }></Switch>
      </div>

      {/* 网格视图下，使用鼠标右键弹出菜单（而不是 hover）*/}
      <div className="setting-item">
        <span>{getLang("setting_list_gird_show_menu_right_click")}</span>
        <Switch
          size="small"
          checked={isMenuDisplayByRightClick}
          onChange={(value) =>
            onSettingChange(value, setIsMenuDisplayByRightClick, "isMenuDisplayByRightClick")
          }></Switch>
      </div>
    </div>
  )
})

export default ContentViewSetting
