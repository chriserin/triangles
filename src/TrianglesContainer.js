import React, { useState, useEffect } from 'react';
import './TrianglesContainer.css';
import Triangle from './Triangle.js';
import styled from 'styled-components';
import { Select, InputNumber, Checkbox } from 'antd';

const Colors = ['#FF2600', '#8FBF00', '#66FF99', '#F00069', '#FFE600'];

const TriNumber = styled(InputNumber)`
  margin: 6px;
  width: 100px;
`;

const TriSelect = styled(Select)`
  margin: 6px;
  width: 100px;
`;

const TriForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 132px;
  flex-wrap: wrap;
`;

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

  label:not(.ant-checkbox-wrapper) {
    align-text: right;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: baseline;
  }
`;

const Color = styled.span`
  background-color: ${props => props.color};
  padding: 2px;
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
    color: '#8FBF00',
    size: 100,
  });
  const [scenes, setScenes] = useState([]);
  const [currentScene, setCurrentScene] = useState(null);
  const [color, setColor] = useState('#8FBF00');

  const shift = () => {
    setScene({
      triHeight,
      duration,
      every,
      color,
      rotate,
      size,
    });
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
        <TriForm>
          <label>
            Duration
            <TriNumber
              type="number"
              name="duration"
              step="100"
              value={duration}
              onChange={value => setDuration(value)}
            />
          </label>
          <label>
            Top Point Center
            <TriNumber
              type="number"
              name="triHeight"
              step="10"
              value={triHeight}
              onChange={value => setTriHeight(value)}
            />
          </label>
          <label>
            Size
            <TriNumber
              type="number"
              name="size"
              step="10"
              value={size}
              onChange={value => setSize(value)}
            />
          </label>
          <label>
            Every
            <TriNumber
              type="number"
              name="every"
              step="1"
              value={every}
              onChange={value => setEvery(value)}
            />
          </label>
          <label>
            Color
            <TriSelect
              name="color"
              step="1"
              value={color}
              onChange={value => setColor(value)}
            >
              {Colors.map((color, i) => (
                <Select.Option value={color} key={i}>
                  <Color color={color}>{color}</Color>
                </Select.Option>
              ))}
            </TriSelect>
          </label>
          <Checkbox
            type="checkbox"
            name="color"
            step="1"
            value={rotate}
            onChange={value => setRotate(value)}
          >
            Rotate
          </Checkbox>
        </TriForm>
        <ShiftButton onClick={pushScene}>Add Scene</ShiftButton>
        <PlayButton onClick={play}>Play</PlayButton>
      </Actions>
      {triangles}
    </div>
  );
};

export default TrianglesContainer;
