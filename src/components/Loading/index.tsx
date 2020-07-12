import React from 'react';
import ReactLoading from 'react-loading';

interface LoadingProps {
  type:
    | 'blank'
    | 'balls'
    | 'bars'
    | 'bubbles'
    | 'cubes'
    | 'cylon'
    | 'spin'
    | 'spinningBubbles'
    | 'spokes'
    | undefined;
  color: string;
  width: number;
  height: number;
}

const Loading: React.FC<LoadingProps> = props => <ReactLoading {...props} />;

export default Loading;
