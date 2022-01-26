import React from 'react';
import { View } from 'react-native';

export const Bird = ({ birdBottom, birdLeft }) => {
  const birdWidth = 50;
  const birdHeight = 60;
  return (
    <View style={{
      position: 'absolute',
      height: birdHeight,
      width: birdWidth,
      backgroundColor: 'blue',
      bottom: birdBottom - (birdHeight / 2),
      left: birdLeft - (birdWidth / 2)
    }}/>

  )
}

