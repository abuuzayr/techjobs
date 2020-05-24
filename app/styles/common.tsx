import styled from "styled-components"
import { Heading, Hero, Level } from "react-bulma-components"
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
  background-image: url(/bg.jpg);
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
