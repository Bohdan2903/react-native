import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Obstacles = ({ color, obstaclesLeft, obstaclesWidth, obstaclesHeight, gap, randomBottom }) => {

  const styles = StyleSheet.create({
    obstacles1: {
      position: 'absolute',
      height: obstaclesHeight,
      width: obstaclesWidth,
      backgroundColor: color,
      bottom: randomBottom + obstaclesHeight + gap,
      left: obstaclesLeft
    },
    obstacles2: {
      position: 'absolute',
      height: obstaclesHeight,
      width: obstaclesWidth,
      backgroundColor: color,
      bottom: randomBottom,
      left: obstaclesLeft
    }
  });

  return (
    <>
      <View style={styles.obstacles1}>
      </View>
      <View style={styles.obstacles2}>
      </View>
    </>

  )
}

