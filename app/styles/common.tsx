import styled from "styled-components"
import { Heading, Hero, Level, Notification } from "react-bulma-components"
import { AiOutlineCode, AiFillBell } from "react-icons/ai"
import { IoIosSend } from "react-icons/io"
import { FiSun } from "react-icons/fi"
import { AiFillCode } from "react-icons/ai"
import { Box } from "react-bulma-components"

export const Code = styled(AiOutlineCode)`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`

export const Title = styled(Heading)`
  color: white;
  margin-bottom: 0 !important;
  margin-right: 10px;
`

export const Send = styled(IoIosSend)`
  margin-right: 5px;
`

export const Bell = styled(AiFillBell)`
  margin-right: 5px;
`

export const Sun = styled(FiSun)`
  color: hsl(48, 100%, 67%);
  vertical-align: middle;
`

export const FillCode = styled(AiFillCode)`
  vertical-align: middle;
`

export const HeroBody = styled(Hero.Body)`
  background-image: url(${process.env.NEXT_PUBLIC_BACKGROUND_URL});
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.2);
  background-blend-mode: color;
  @media screen and (min-width: 768px) {
    margintop: -41px;
  }
`

export const ContentBox = styled(Box)`
  font-size: 0.8rem;
  br {
    display: none;
  }
  @media screen and (min-width: 768px) {
    overflow-y: scroll;
    max-height: calc(100vh - 250px);
  }
`

export const A = styled.a`
  color: #333;
`

export const IconSlot = styled.span`
  margin-left: 10px;
  cursor: pointer;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  height: 1.5rem;
  width: 1.5rem;
`

export const MobileActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`

export const LevelItem = styled(Level.Item)`
  @media screen and (max-width: 768px) {
    text-align: center;
    display: flex !important;
  }
`

export const Post = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
`

export const Logo = styled.img`
  max-height: 30px;
  filter: brightness(0) invert(1);
`

export const IconWrapper = styled.div`
  margin-right: 10px;
  svg {
    vertical-align: middle;
  }
`

export const JobBox = styled(Box)`
  cursor: pointer;
  border: 2px solid transparent;
  :hover {
    border: 2px solid gray;
    opacity: 1;
  }
  ${(props) => (props.old ? "opacity: 0.6;" : "")}
  ${(props) => (props.featured ? "background: rgba(32, 156, 238,0.2);" : "")}
  a {
    color: black;
  }
`

export const ShareBubble = styled(Notification)`
  position: absolute;
  z-index: 99;
  top: 10px;
  right: 10px;
  background-color: #fff;
  color: black;
  border: 1px solid rgba(10, 10, 10, 0.2);
  padding: 0.25rem 2rem 0.5rem 0.25rem;
  width: 210px;
  > a {
    > svg {
      height: 30px;
      width: 30px;
    }
    > div {
      border-radius: 100%;
      padding: 0.75em 0.75em;
    }
  }
`
