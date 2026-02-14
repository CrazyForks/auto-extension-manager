import styled from "styled-components"

export const MoreOperationDropdownSnapshotStyle = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: space-between; /* 使子元素在容器中两端对齐 */
  align-items: center; /* 垂直居中对齐 */

  .snapshot-label {
    flex-grow: 1; /* 使 snapshot-label 占据剩余空间 */
    text-align: left;
  }

  .snapshot-action-btn {
    margin-left: 6px;
  }

  .snapshot-rename-btn {
    &:hover {
      color: #1890ff;
    }
  }

  .snapshot-close-btn {
    &:hover {
      color: red;
    }
  }
`
