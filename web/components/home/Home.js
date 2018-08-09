import React from 'react';

import sun from '../../assets/sun.svg';
import skyline from '../../assets/skyline.svg';
import panelBear from '../../assets/panel-bear.svg';
import panelTrain from '../../assets/panel-train.svg';

const getImageDiv = (alt, src) => <div><img alt={alt} src={src} /></div>;

const Home = () => (
  <div className="homepage">
    <div>
      <div>
        <h1>nwHacks 2019</h1>
      </div>
      {getImageDiv('sun', sun)}
    </div>
    {getImageDiv('skyline', skyline)}
    {getImageDiv('bear', panelBear)}
    {getImageDiv('train', panelTrain)}
  </div>
);

export default Home;
