import styled from "styled-components";
    

const Title = styled.h2`
font-size: 60px;
color: ${props => props.color || 'red'};
@media screen and ( max-width:  1200px ) {
    font-size: 55px;
}
@media screen and ( max-width:  992px ) {
    font-size: 50px;
}
@media screen and ( max-width:  768px ) {
    font-size: 40px;
}
@media screen and ( max-width:  420px ) {
    font-size: 30px;
}
`
    
    
    
export const MainTitle = ({children, cls, ...props}) => {
    
    return (
        <>
            <Title className={`main-title ${cls}`}  {...props}>
                { children }
            </Title>
        </>
    );
}
