import React from 'react'
import styled from 'styled-components'
import {space} from 'styled-system'

const Wrapper = styled.div`
    padding: 25px 40px;
    background-color: white;
    display: inline-block;
    box-shadow: 0 0 40px rgba(0,0,0, 0.1);
    border-radius: 10px;
    ${space};

`

export default function Card(props) {
    return (
        <Wrapper {...props}>
            {props.children}
        </Wrapper>
    )
}
