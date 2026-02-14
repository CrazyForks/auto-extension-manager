import React from "react"

import styled from "styled-components"

const TitleStyle = styled.div`
  color: ${(props) => props.theme.fg2};

  h1 {
    font-size: 30px;
    line-height: 60px;
  }

  .box {
    border-bottom: 1px solid ${(props) => props.theme.border};
    margin-bottom: 10px;
  }
`

function Title({ title }) {
  return (
    <TitleStyle>
      <div className="box">
        <h1>{title}</h1>
      </div>
    </TitleStyle>
  )
}

export default Title
