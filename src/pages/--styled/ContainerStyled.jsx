import styled from "styled-components";

const maxwidth = '1440'
const padding = '160'
const mediapadding = '60'
const container = maxwidth - padding*2
export const ContainerStyled = styled.div`
    margin: 0 auto;
    max-width: ${container}px;
    @media screen and ( max-width:  ${container - mediapadding}px ) {
        max-width: ${1070 - mediapadding}px;
    } 
    @media screen and ( max-width:  1070px ) {
        max-width: ${992 - mediapadding}px;
    }
    @media screen and ( max-width:  992px ) {
        max-width: ${768 - mediapadding}px;
    }
    @media screen and ( max-width:  768px ) {
        max-width: ${576 - mediapadding}px;
    }
`
    
    
    

