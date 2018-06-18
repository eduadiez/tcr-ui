import React, { Component } from 'react'
import styled from 'styled-components'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import Text from 'components/Text'
import Button from 'components/Button'
import NavBar from 'components/NavBar'
import Identicon from './Identicon'

const Wrapper = styled.div`
  flex-shrink: 0;
`
const GridContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0.2em 1em;
`

const GridItem = styled.div`
  font-weight: bold;
`
const GridItemF = styled(GridItem)`
  display: flex;
`

export default class Header extends Component {
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { error, openSidePanel, network, tcr, contracts } = this.props
    const { anchorEl } = this.state

    return (
      <Wrapper>
        <GridContainer>
          {error ? (
            <GridItem gc={1}>
              <div>{''}</div>
            </GridItem>
          ) : (
            <GridItem gc={1}>
              <Button methodName="apply" onClick={openSidePanel}>
                {'Start an application'}
              </Button>
            </GridItem>
          )}

          <GridItemF gc={2} onClick={this.handleClick}>
            <a
              target="_blank"
              href={`https://${
                network !== 'mainnet' ? network + '.' : ''
              }etherscan.io/address/${tcr.get('registryAddress')}`}
            >
              <Identicon address={tcr.get('registryAddress')} diameter={20} />
            </a>
            <Text size="xxlarge" weight="bold">
              {tcr.get('registryName')}
            </Text>
          </GridItemF>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>{`Registry: ${
              contracts.get('registry').address
            }`}</MenuItem>
            <MenuItem onClick={this.handleClose}>{`Token: ${
              contracts.get('token').address
            }`}</MenuItem>
            <MenuItem onClick={this.handleClose}>test</MenuItem>
          </Menu>

          <GridItem gc={3}>
            <NavBar />
          </GridItem>
        </GridContainer>
      </Wrapper>
    )
  }
}
