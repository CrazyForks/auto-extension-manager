import React, { memo, useCallback, useState } from "react"

import { styled } from "styled-components"

import { usePopupExtensions } from "../../utils/usePopupExtensions"
import SortableGirdItemList from "../common/SortableGirdItemList"
import ExtensionGridItem from "./ExtensionGridItem"

const ExtensionGrid = memo(({ extensions, options, isShowBottomDivider }) => {
  const [moved, setMoved] = useState("") // 没有业务意义，就是一个依赖值，值发生变化，则重新执行 usePopupExtensions

  const [items] = usePopupExtensions(extensions, options, moved)

  const items0 = items.top
  const items1 = items.enabled
  const items2 = items.disabled

  const onItemMove = useCallback((item) => {
    setMoved(Date.now().toString())
  }, [])

  // 置顶分区下方的分割线是否显示
  const dividerShow0 = items0.length > 0 && (items1.length > 0 || items2.length > 0)

  return (
    <GridViewSpaceStyle>
      <ul>
        {items0.map((item) => {
          return (
            <li key={item.id}>
              <ExtensionGridItem item={item} options={options}></ExtensionGridItem>
            </li>
          )
        })}
        {new Array(10).fill("").map((_, index) => (
          <i key={index}></i>
        ))}
      </ul>

      {dividerShow0 && <div className="divider"></div>}

      <SortableGirdItemList
        extensions={items1}
        renderItem={(item, index) => {
          return (
            <ExtensionGridItem
              item={item}
              options={options}
              onItemMove={onItemMove}></ExtensionGridItem>
          )
        }}></SortableGirdItemList>

      {items1.length > 0 && items2.length > 0 && <div className="divider"></div>}

      <SortableGirdItemList
        extensions={items2}
        renderItem={(item, index) => {
          return (
            <ExtensionGridItem
              item={item}
              options={options}
              onItemMove={onItemMove}></ExtensionGridItem>
          )
        }}></SortableGirdItemList>

      {isShowBottomDivider && <div className="divider"></div>}
    </GridViewSpaceStyle>
  )
})

export default ExtensionGrid

const imgSize = "46px"
const imgMargin = "16px"

export const GridViewSpaceStyle = styled.div`
  ul {
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 0px;

    li {
      width: ${imgSize};
      margin: 16px ${imgMargin};
    }

    i {
      width: ${imgSize};
      margin: 0px ${imgMargin};
    }
  }

  .divider {
    height: 1px;
    background-color: ${(props) => props.theme.input_border};
    margin: 0px 10px 0px 10px;
  }
`
