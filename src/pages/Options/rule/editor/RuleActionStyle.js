import { styled } from "styled-components"

const Style = styled.div`
  .action-label {
    font-size: 14px;
  }

  .advance-options {
    display: flex;
    & > span {
      margin-right: 5px;
    }
  }

  .hidden-action-mode {
    display: none;
  }

  .advance-option-tips {
    margin-left: 10px;
    font-size: 8px;
    color: #777;
  }

  .action-tip-url-match {
    margin: 12px 0;
  }

  .action-tip-match-type {
    margin: 2px 0 12px 0;
  }

  .action-refresh-options {
    display: flex;
    margin: 20px 0;
  }
`

export default Style
