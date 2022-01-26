import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import { Bird } from "./src/components/Bird";
import { Obstacles } from "./src/components/Obstacles";

export default function App() {
    const width = Dimensions.get('screen').width;
    const height = Dimensions.get('screen').height;
    const birdLeft = width / 2;
    const [birdBottom, setBirdBottom] = useState(height / 2);
    const [obstaclesLeft, setObstaclesLeft] = useState(width);
    const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(width + birdLeft + 15);
    const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0);
    const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const gravity = 3;
    let gameTimeId;
    let obstaclesLeftTimerId;
    let obstaclesLeftTwoTimerId;
    const gap = 150;
    const obstaclesHeight = 300;
    const obstaclesWidth = 60;
    console.log(birdBottom, 'birdBottom')
    console.log(birdLeft, 'birdLeft')
    console.log(obstaclesLeft, 'obstaclesLeft')
    console.log(obstaclesLeftTwo, 'obstaclesLeftTwo')

    const jump = () => {
        if (!isGameOver && (birdBottom < height)) {
            setBirdBottom(prev => prev + 50)
        }
    }
    const gameOver = () => {
        clearInterval(gameTimeId)
        clearInterval(obstaclesLeftTimerId)
        clearInterval(obstaclesLeftTwoTimerId)
        setIsGameOver(true)
    }

    //start falling
    useEffect(() => {
        if (birdBottom > 0) {
            gameTimeId = setInterval(() => setBirdBottom(prev => prev - gravity), 30)
            return () => clearInterval(gameTimeId)
        }
    }, [birdBottom]);

    //first obstacles
    useEffect(() => {
        if (obstaclesLeft > -obstaclesWidth) {
            obstaclesLeftTimerId = setInterval(() => setObstaclesLeft(prev => prev - 5), 30)
            return () => clearInterval(obstaclesLeftTimerId)
        } else {
            setObstaclesLeft(width)
            setScore(prev=>prev+1);
            setObstaclesNegHeight(-Math.random() * 100)
        }

    }, [obstaclesLeft]);
    //second obstacles
    useEffect(() => {
        if (obstaclesLeftTwo > -obstaclesWidth) {
            obstaclesLeftTwoTimerId = setInterval(() => setObstaclesLeftTwo(prev => prev - 5), 30)
            return () => clearInterval(obstaclesLeftTwoTimerId)
        } else {
            setObstaclesLeftTwo(width)
            setScore(prev=>prev+1);
            setObstaclesNegHeightTwo(-Math.random() * 100)
        }

    }, [obstaclesLeftTwo]);

    //check for collision
    useEffect(() => {
        if (
            ((birdBottom < (obstaclesNegHeight + obstaclesHeight + 30) ||
                    birdBottom > (obstaclesNegHeight + obstaclesHeight + gap - 30)) &&
                (obstaclesLeft > width / 2 - 30 && obstaclesLeft < width / 2 + 30)
            )
            ||
            ((birdBottom < (obstaclesNegHeightTwo + obstaclesHeight + 30) ||
                    birdBottom > (obstaclesNegHeightTwo + obstaclesHeight + gap - 30)) &&
                (obstaclesLeftTwo > width / 2 - 30 && obstaclesLeftTwo < width / 2 + 30)
            )) {
            gameOver();
        }
    });


    return (
        <TouchableWithoutFeedback onPress={jump}>
            <View style={styles.container}>
                {isGameOver && <Text style={styles.score}>Your score: {score}</Text>}

                <Bird birdBottom={birdBottom} birdLeft={birdLeft}/>
                <Obstacles color={'green'} obstaclesLeft={obstaclesLeft} gap={gap} obstaclesHeight={obstaclesHeight}
                           obstaclesWidth={obstaclesWidth} randomBottom={obstaclesNegHeight}/>
                <Obstacles color={'yellow'} obstaclesLeft={obstaclesLeftTwo} gap={gap} obstaclesHeight={obstaclesHeight}
                           obstaclesWidth={obstaclesWidth} randomBottom={obstaclesNegHeightTwo}/>
            </View>
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        color: '#ffffff',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 14,
    },
    score: {
        backgroundColor: 'yellow',
        padding: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        color: 'black',
        fontSize: '20px'
    }
});
