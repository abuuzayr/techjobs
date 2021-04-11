import styled from "styled-components"

export const Credits = styled.div`
  position: absolute;
  top: 70px;
  right: 20px;
`

export const A = styled.a`
  color: white;
  padding: 4px 6px;
  font-size: 12px;
  line-height: 1.2;
  border-radius: 3px;
  opacity: 0.6;
  span {
    display: inline-block;
    padding: 2px 3px;
    svg {
      height: 12px;
      width: auto;
      position: relative;
      vertical-align: middle;
      top: -2px;
      fill: white;
    }
  }
`
