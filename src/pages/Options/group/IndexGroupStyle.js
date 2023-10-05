import styled from "styled-components"

export const GroupStyle = styled.div`
  position: relative;
  height: 100%;

  .group-edit-box {
    display: flex;
  }

  .left-box {
    width: 200px;
    flex-shrink: 0;

    /* background: linear-gradient(to right, #fff, #337ab788); */
  }

  .right-box {
    flex-grow: 1;
    margin-left: 10px;
  }

  .view-hidden {
    display: none;
  }

  .scene-edit-panel {
    position: absolute;
    margin-top: 60px;
    top: 0px;
    left: 0px;
    right: 0px;
    height: calc(100% - 60px);
  }
`
