import React from 'react'
import styled from 'styled-components'
import theme from '../theme'


const LinkElement = styled.a`
    /* background-color: ${theme.colors.lightGreen}; */
    color:  ${theme.colors.black};
    border-bottom: 1px solid ${theme.colors.black};
    font-size: 1.2rem;
    cursor: pointer;
`;

export default function Link(props) {
    return (
        <LinkElement {...props} />
    )
}