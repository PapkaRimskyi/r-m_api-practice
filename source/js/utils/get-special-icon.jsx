import React from 'react';

import { Male, Female } from '../blocks/svg/gender-icon';
import { Alien, Human } from '../blocks/svg/life-form-types';
import { Alive, Dead } from '../blocks/svg/status-icon';
import UnknownIcon from '../blocks/svg/unknown-icon';

// Позволяет получить подходящую иконку.

export default function getSpecialIcon(type) {
  switch (type.toLowerCase()) {
    case 'male':
      return <Male />;
    case 'female':
      return <Female />;
    case 'alien':
      return <Alien />;
    case 'human':
      return <Human />;
    case 'alive':
      return <Alive />;
    case 'dead':
      return <Dead />;
    default:
      return <UnknownIcon />;
  }
}

//
