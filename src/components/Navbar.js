import React from 'react'
import styled from 'styled-components'
import { space } from 'styled-system'
import Link from './Link'
import theme from '../theme'
import Flex from './Flex'

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
`


const Text = styled.p`
    font-weight: bold;
    font-size: 1.2rem;
    ${space};
`

const Circle = styled.div`
    width: 25px;
    height: 25px;
    background: ${theme.colors.red};
    border-radius: 15px;
`

export default function Navbar() {
    return (
        <Wrapper>
            <Flex align="center">
                <Circle/>
                <Text ml={2}>nCovid-19</Text>
            </Flex>

            <Link href="https://github.com/torgeadelin/covid19">Github</Link>
        </Wrapper>
    )
}