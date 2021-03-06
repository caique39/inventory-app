import React, { ReactNode } from 'react'

import { TabBarContainer, TabBarIconContainer } from './styled'

interface Props {
  navigation: {
    state: {
      routes: any[]
      index: number
    }
  }
  activeTintColor: string
  inactiveTintColor: string
  getLabelText: ({ route }) => string
  onTabPress: ({ route }) => void
  renderIcon?: ({ route, focused, tintColor }) => ReactNode
}

const TabBar: React.SFC<Props> = ({
  renderIcon,
  navigation,
  activeTintColor,
  inactiveTintColor,
  onTabPress
}) => {
  const { routes, index } = navigation.state

  const tabIsFocused = tabIndex => tabIndex === index
  const currentTintColor = tabIndex =>
    tabIsFocused(tabIndex) ? activeTintColor : inactiveTintColor

  return (
    <TabBarContainer>
      {routes.map((route, index) => (
        <TabBarIconContainer key={index} onPress={() => onTabPress({ route })}>
          {renderIcon({
            route,
            focused: tabIsFocused(index),
            tintColor: currentTintColor(index)
          })}
        </TabBarIconContainer>
      ))}
    </TabBarContainer>
  )
}

export default TabBar
