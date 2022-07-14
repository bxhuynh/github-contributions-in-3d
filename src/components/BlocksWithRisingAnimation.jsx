import React, { useRef, useEffect } from 'react';
import { useScene } from 'react-babylonjs';
import { Vector3, Color3, Animation } from '@babylonjs/core';

export function getRisingAnimation() {
  const keys = [
    {
      frame: 0,
      value: 0,
    },
    { frame: 60, value: 1 },
  ];

  const animation = new Animation('animation', 'scaling.y', 60, 0, 1);
  animation.setKeys(keys);
  return [animation];
}

export const genBlocks = (weeks) => {
  const blocks = [];
  for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
    const week = weeks[weekIndex];
    for (
      let dayIndex = 0;
      dayIndex < week.contributionDays.length;
      dayIndex++
    ) {
      const day = week.contributionDays[dayIndex];

      if (day.contributionCount) {
        blocks.push(
          <box
            key={'day' + weekIndex + dayIndex}
            name={'day' + weekIndex + dayIndex}
            height={day.contributionCount}
            position={
              new Vector3(weekIndex, day.contributionCount / 2.0, -dayIndex)
            }
          >
            <standardMaterial
              name={'box' + weekIndex + dayIndex + 'Mat'}
              diffuseColor={Color3.FromHexString(day.color)}
            ></standardMaterial>
          </box>
        );
      }
    }
  }
  return blocks;
};

export function BlocksWithRisingAnimation({ weeks }) {
  const groupRef = useRef();
  const scene = useScene();

  useEffect(() => {
    const playAnimation = () => {
      if (groupRef.current) {
        const group = groupRef.current;
        const animations = getRisingAnimation();
        scene.beginDirectAnimation(group, animations, 0, 60, false);
      }
    };
    playAnimation();
  }, [scene]);

  const blocks = genBlocks(weeks);

  return (
    <transformNode name='group' ref={groupRef}>
      {blocks}
    </transformNode>
  );
}
