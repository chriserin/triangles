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
  height: 140px;
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

const Color = styled.option`
  background-color: ${props => props.color};
`;

const ScenesCount = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const TrianglesContainer = () => {
  const [triHeight, setTriHeight] = useState(60);
  const [duration, setDuration] = useState(1000);
  const [every, setEvery] = useState(1);
  const [size, setSize] = useState(100);
  const [rotate, setRotate] = useState(false);
  const [scene, setScene] = useState({
    duration: 1000,
    triHeight: 60,
    every: 3,
    color: 'black',
    size: 100,
  });
  const [scenes, setScenes] = useState([]);
  const [currentScene, setCurrentScene] = useState(null);
  const [color, setColor] = useState('#888');

  const shift = () => {
    setScene({ triHeight, duration, every, color, rotate, size });
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
        rotate,
        size,
      },
    ]);
  };

  const triangles = Array(50)
    .fill('')
    .map((_, i) => <Triangle key={i} triIndex={i} scene={scene} />);

  return (
    <div className="TrianglesContainer">
      <Actions>
        <ScenesCount>{scenes.length} Scenes</ScenesCount>
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
            Size
            <input
              type="number"
              name="size"
              step="1"
              value={size}
              onChange={e => setSize(e.currentTarget.value)}
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
              name="color"
              step="1"
              value={color}
              onChange={e => setColor(e.currentTarget.value)}
            >
              {Colors.map((color, i) => (
                <Color value={color} color={color} key={i}>
                  {color}
                </Color>
              ))}
            </select>
          </label>
          <label>
            Rotate
            <input
              type="checkbox"
              name="color"
              step="1"
              value={rotate}
              onChange={e => setRotate(e.currentTarget.checked)}
            />
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
