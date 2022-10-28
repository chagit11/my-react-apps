import styled from "styled-components";


const Btn = styled.button`
    border: 0;
    background: gold;
    width: 100px;
    height: 40px;
    font-size: 22px;
    cursor: pointer;
`
    
    
export const Button = ({...props}) => {
    
    return (
        <>
            <Btn {...props}>
                Save
            </Btn>
        </>
    );
}
