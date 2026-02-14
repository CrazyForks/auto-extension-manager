import styled from "styled-components"

export const NavigationStyle = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  width: 260px;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.nav_link};
  }

  h1 {
    color: ${(props) => props.theme.nav_link};
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: 700;

    &:hover {
      color: ${(props) => props.theme.nav_link_hover};
      text-decoration: underline;
    }
  }

  .nav-item {
    display: block;
    height: 36px;

    margin-bottom: 6px;
    padding-left: 10px;

    font-size: 14px;
    line-height: 36px;
    color: ${(props) => props.theme.nav_link};

    border-radius: 4px;

    &:hover {
      background-color: ${(props) => props.theme.nav_hover_bg};
    }

    &.active {
      background-color: #337ab7;
      color: #fff;
    }

    & > .anticon {
      position: relative;
      top: 1px;
    }

    & > .text {
      margin-left: 5px;
    }
  }
`
