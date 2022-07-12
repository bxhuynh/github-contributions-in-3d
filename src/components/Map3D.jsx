import React from 'react';
import PropTypes from 'prop-types';
import { Engine, Scene } from 'react-babylonjs';
import { Vector3, Color3 } from '@babylonjs/core';

Map3D.propTypes = {
  data: PropTypes.object,
};

const genBlocks = (data) => {
  const blocks = [];
  const weeks = data?.contributionsCollection?.contributionCalendar?.weeks;
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

function Map3D(props) {
  const { data } = props;
  if (!data) return <></>;

  const numberOfWeeks =
    data.contributionsCollection.contributionCalendar.weeks.length;

  const contributionBlocks = genBlocks(data);
  return (
    <div style={{ display: 'flex', flex: 1, background: 'black' }}>
      <Engine antialias adaptToDeviceRatio canvasId='babylonJS'>
        <Scene clearColor={Color3.Black()}>
          <arcRotateCamera
            name='camera'
            alpha={-Math.PI / 2}
            beta={Math.PI / 2.5}
            radius={50}
            target={new Vector3(numberOfWeeks / 2.0 - 0.5, 5, 0)}
            upperBetaLimit={Math.PI / 2.2}
          />
          <hemisphericLight
            name='light'
            intensity={0.8}
            direction={new Vector3(0, 5, 0)}
          />
          {contributionBlocks}
          <ground
            name='ground'
            width={numberOfWeeks}
            height={7}
            subdivisions={1}
            position={new Vector3(numberOfWeeks / 2.0 - 0.5, 0, -3)}
          >
            <standardMaterial name='groundMat' diffuseColor={Color3.Black()} />
          </ground>
        </Scene>
      </Engine>
    </div>
  );
}

export default Map3D;
