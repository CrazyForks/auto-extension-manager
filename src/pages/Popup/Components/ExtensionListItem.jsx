import React, { useEffect, useState } from "react"

import {
  BlockOutlined,
  DeleteOutlined,
  DownOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  SettingOutlined
} from "@ant-design/icons"
import {
  Button,
  Dropdown,
  Popconfirm,
  Space,
  Switch,
  Tooltip,
  message
} from "antd"
import classNames from "classnames"

import "./ExtensionListItem.css"

import { getIcon } from "../../../utils/extensionHelper.js"
import { isStringEmpty } from "../../../utils/utils.js"

/**
 * 打开扩展设置页面
 */
const handleSettingButtonClick = (e, item) => {
  chrome.tabs.create({ url: item.optionsUrl })
}

/**
 * 打开扩展主页
 */
const handleHomeButtonClick = (e, item) => {
  chrome.tabs.create({ url: item.homepageUrl })
}

/**
 * 扩展列表项
 */
function ExtensionListItem({ item }) {
  const getI18N = chrome.i18n.getMessage
  const langEnable = getI18N("extEnable")
  const langDisable = getI18N("extDisable")

  const [isHover, setIsHover] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)

  const [itemEnable, setItemEnable] = useState(item.enabled)
  const [existOptionPage] = useState(!isStringEmpty(item.optionsUrl))
  const [existHomePage] = useState(!isStringEmpty(item.homepageUrl))

  const onSwitchChange = (checked, item) => {
    chrome.management.setEnabled(item.id, checked)
    setItemEnable(checked)
  }

  const onItemMouseOver = (e) => {
    if (e.type === "mouseenter") {
      setIsHover(true)
    } else if (e.type === "mouseleave" && !isInteractive) {
      setIsHover(false)
    }
  }

  const confirmDeleteExtension = (e, item) => {
    chrome.management.uninstall(item.id)
    setIsInteractive(false)
    setIsHover(false)
  }

  const cancelDeleteExtension = (e, item) => {
    setIsInteractive(false)
    setIsHover(false)
  }

  return (
    <div
      onMouseEnter={(e) => onItemMouseOver(e)}
      onMouseLeave={(e) => onItemMouseOver(e)}
      className={classNames([
        "list-item-container",
        { "is-enable": itemEnable, "not-enable": !itemEnable }
      ])}>
      <img src={getIcon(item, 24)} alt="" />
      <span className="ext-name">{item.name}</span>
      {buildOperationButton(isHover)}
    </div>
  )

  function buildOperationButton(isHover) {
    if (!isHover) {
      return null
    } else {
      return (
        <div className="li-operation">
          <Switch
            className="switch"
            size="small"
            checked={itemEnable}
            onChange={(e) => onSwitchChange(e, item)}></Switch>

          <Button
            disabled={!existOptionPage}
            type="text"
            icon={<SettingOutlined />}
            onClick={(e) => handleSettingButtonClick(e, item)}
          />

          <Popconfirm
            title="移除插件"
            description={`确认要从浏览器中移除 ${item.shortName}`}
            onConfirm={(e) => confirmDeleteExtension(e, item)}
            onCancel={(e) => cancelDeleteExtension(e, item)}
            onClick={(e) => setIsInteractive(true)}
            okText="Yes"
            cancelText="Cancel">
            <Button type="text" icon={<DeleteOutlined />} />
          </Popconfirm>

          <Button
            disabled={!existHomePage}
            type="text"
            icon={<HomeOutlined />}
            onClick={(e) => handleHomeButtonClick(e, item)}
          />
        </div>
      )
    }
  }
}

export default ExtensionListItem
