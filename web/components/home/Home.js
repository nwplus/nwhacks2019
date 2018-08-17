import React from 'react';
import { Link } from 'react-router-dom';

import { TextInput } from '../input/text';
import { PrimaryButton } from '../input/buttons';

import sun from '../../assets/sun.svg';

import skyline from '../../assets/skyline.svg';

import panelBear from '../../assets/panel-bear.svg';
import panelTrain from '../../assets/panel-train.svg';

import bearCircle from '../../assets/bear-circle.svg';

const getImageDiv = (alt, src) => <img alt={alt} src={src} />;

const rowStyle = `
  flex jc-between ai-center dir-row
  pad-sides-ultra pad-bottom-giga scale-pad-sides-tablet`;

const Home = () => (
  <div className="homepage overflow-hidden">
    <div className="flex jc-between ai-center pad-top-ultra pad-sides-ultra scale-pad-sides-tablet homepage-scale-top">
      <div>
        <h1 className="scale-h1-tablet">nwHacks 2019</h1>
        <p className="primary">
          Western Canada&apos;s largest hackathon<br />
          January 26-27, 2019 @ the University of British Columbia
        </p>
        <p className="secondary">
          Get notified when registration opens!
        </p>
        <div className="homepage-email-registration flex ai-end">
          <TextInput
            placeholder="hacker@email.com" />
          &nbsp;
          <PrimaryButton
            text="Submit" />
        </div>
        <p className="secondary">
          <Link to="/">
            Interested in sponsoring?
          </Link>
        </p>
      </div>
      <div className="pad-sides-xxl scale-hide-phablet">
        {getImageDiv('sun', sun)}
      </div>
    </div>

    <div className="homepage-skyline fill-width">
      {getImageDiv('skyline', skyline)}
    </div>

    <div className={`${rowStyle} scale-row-desktop`}>
      <div>
        <h2>This is nwHacks 2019</h2>
        <p>
          Come make things and break things, and then make them cooler. You&apos;ll
          never be short on inspiration when you’re surrounded by 600 of the
          brightest minds in the Pacific Northwest. All you need to bring is an
          open mind and an insatiable desire to learn; we’ll take care of the
          rest. After all, we&apos;re western Canada’s largest hackathon — we make
          the west coast the best coast.
        </p>
      </div>
      <div className="pad-left-giga pad-ends-l scale-pad-sides-desktop scale-jc-center">
        {getImageDiv('bear', panelBear)}
      </div>
    </div>

    <div className={`${rowStyle} scale-row-desktop-rev`}>
      <div className="pad-right-giga pad-ends-l scale-pad-sides-desktop scale-jc-center">
        {getImageDiv('train', panelTrain)}
      </div>
      <div>
        <h2>Why nwHacks?</h2>
        <p>
          Vancouver is more than its breathtaking scenery, coastal lifestyle,
          and diverse food options. It is also increasingly present in global
          conversations surrounding the critical impact of youth and industrial
          advancement. The home of nwHacks is a hub of learning opportunities,
          community support, and connections to the tech industry.
        </p>
        <p>
          We&apos;re growing and we invite you to be a part of our journey.
        </p>
        <p>
          nwHacks is dedicated to supporting the thriving community of technology
          lovers in the Pacific Northwest region by bringing together ambitious
          minds for an epic two day event.
        </p>
      </div>
    </div>

    <div className="flex jc-center dir-col pad-ends-super">
      {getImageDiv('cute-bear', bearCircle)}
      <p className="primary flex jc-center">
        Stay tuned for sponsor updates!
      </p>
    </div>
  </div>
);

export default Home;
