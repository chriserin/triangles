import React, { useState, useEffect } from 'react';
import './TrianglesContainer.css';
import Triangle from './Triangle.js';
import styled from 'styled-components';

const Colors = ['#FF2600', '#8FBF00', '#66FF99', '#F00069', '#FFE600'];

const Button = styled.button`
  padding: 20px;
  margin-top: 20px;
  border: none;
  font-size: 24px;
`;

const ShiftButton = styled(Button)`
  background-color: red;
`;

const PlayButton = styled(Button)`
  background-color: green;
`;

const Actions = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  > * {
    margin-right: 20px;
  }

  > *:last-child {
    margin-right: 0;
  }

  label {
    display: block;
  }
`;

const Scene = ({ scene: { triHeight, duration, every, color } }) => {
  return (
    <div>
      <div>{triHeight}</div>
      <div>{duration}</div>
      <div>{every}</div>
      <div>{color}</div>
    </div>
  );
};

const Color = styled.option`
  background-color: ${props => props.color};
`;

const TrianglesContainer = () => {
  const [triHeight, setTriHeight] = useState(60);
  const [duration, setDuration] = useState(1000);
  const [every, setEvery] = useState(1);
  const [scene, setScene] = useState({
    duration: 1000,
    triHeight: 60,
    every: 3,
  });
  const [scenes, setScenes] = useState([]);
  const [currentScene, setCurrentScene] = useState(null);
  const [color, setColor] = useState('#888');

  const shift = () => {
    setScene({ triHeight, duration, every, color });
  };

  useEffect(() => {
    if (currentScene !== null) {
      setTimeout(() => {
        const nextSceneNumber = currentScene + 1;
        const nextScene = scenes[nextSceneNumber];
        setScene(scenes[currentScene]);
        setCurrentScene(nextScene ? nextSceneNumber : null);
      }, scenes[currentScene].duration - 50);
    }
  }, [currentScene]);

  const play = () => {
    setCurrentScene(0);
    setScene(scenes[0]);
  };

  const pushScene = () => {
    setScenes([
      ...scenes,
      {
        triHeight,
        duration,
        every,
        color,
      },
    ]);
  };

  const triangles = Array(200)
    .fill('')
    .map((_, i) => (
      <Triangle
        key={i}
        triIndex={i}
        triHeight={scene.triHeight}
        duration={scene.duration}
        color={scene.color}
        every={scene.every}
      />
    ));

  return (
    <div className="TrianglesContainer">
      <Actions>
        {scenes.map((scene, i) => (
          <Scene scene={scene} key={i} />
        ))}
        <ShiftButton onClick={shift}>Shift</ShiftButton>
        <div>to</div>
        <div>
          <label>
            duration
            <input
              type="number"
              name="duration"
              step="100"
              value={duration}
              onChange={e => setDuration(e.currentTarget.value)}
            />
          </label>
          <label>
            triHeight
            <input
              type="number"
              name="triHeight"
              step="10"
              value={triHeight}
              onChange={e => setTriHeight(e.currentTarget.value)}
            />
          </label>
          <label>
            Every
            <input
              type="number"
              name="every"
              step="1"
              value={every}
              onChange={e => setEvery(e.currentTarget.value)}
            />
          </label>
          <label>
            Color
            <select
              type="se"
              name="color"
              step="1"
              value={color}
              onChange={e => setColor(e.currentTarget.value)}
            >
              {Colors.map((color, i) => (
                <Color value={color} color={color}>
                  {color}
                </Color>
              ))}
            </select>
          </label>
        </div>
        <ShiftButton onClick={pushScene}>Add Scene</ShiftButton>
        <PlayButton onClick={play}>Play</PlayButton>
      </Actions>
      {triangles}
    </div>
  );
};

export default TrianglesContainer;
