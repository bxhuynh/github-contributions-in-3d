import React from 'react';
import PropTypes from 'prop-types';
import { Engine, Scene } from 'react-babylonjs';
import { Vector3, Color3 } from '@babylonjs/core';
import { BlocksWithRisingAnimation } from './BlocksWithRisingAnimation';

Map3D.propTypes = {
  data: PropTypes.object,
};

function Map3D(props) {
  const { data } = props;
  if (!data) return <></>;

  const weeks = data.contributionsCollection.contributionCalendar.weeks;
  const numberOfWeeks = weeks.length;

  return (
    <div style={{ display: 'flex', flex: 1, background: 'black' }}>
      <Engine antialias adaptToDeviceRatio canvasId='babylonJS'>
        <Scene>
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
          <BlocksWithRisingAnimation weeks={weeks} />
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
