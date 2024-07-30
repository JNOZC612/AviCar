import styled from "styled-components";
import visibilityOn from "../assets/images/visibility_white_24dp.svg";
import visibilityOff from "../assets/images/visibility_off_white_24dp.svg";
export const ButtonPassword = styled.button`
   width: 26px;
   height: 25px;
   background: ${(props) => (props.visible ? `url(${visibilityOn})` : `url(${visibilityOff})`)};
   background-size: contain;
   border-radius: 5px;
   cursor: pointer;
   border: 1px;
`;