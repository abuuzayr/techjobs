import styled from "styled-components"
import { Heading, Hero } from "react-bulma-components"
import { AiOutlineCode, AiFillBell } from "react-icons/ai"
import { IoIosSend } from "react-icons/io"
import { FiSun } from "react-icons/fi"
import { AiFillCode } from "react-icons/ai"

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
`
