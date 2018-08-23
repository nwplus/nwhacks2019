import React from 'react';
import { Link } from 'react-router-dom';
import { SECTION } from './Sections';
import { TextInput } from '../input/text';
import { PrimaryButton } from '../input/buttons';

import sun from '../../assets/sun.svg';

import skyline from '../../assets/skyline.svg';

import panelBear from '../../assets/panel-bear.svg';
import panelTrain from '../../assets/panel-train.svg';

import bearCircle from '../../assets/bear-circle.svg';

const getImageDiv = (alt, src, scale) => (
  <img
    className={scale ? 'scale-width-phablet' : ''}
    alt={alt}
    src={src} />
);

const ROW_STYLE = `
  split flex jc-between ai-center dir-row
  pad-sides-peta pad-bottom-giga scale-pad-sides-tablet`;

class Home extends React.Component {
  componentDidMount() {
    this.jumpToHash();
  }

  componentDidUpdate() {
    this.jumpToHash();
  }

  jumpToHash = () => {
    const { location: { hash } = {} } = window;
    switch (hash) {
      case SECTION.ABOUT:
        this.aboutDiv.scrollIntoView({ behavior: 'smooth' });
        break;
      case SECTION.STORIES:
        break;
      case SECTION.FAQ:
        break;
      case SECTION.SPONSORS:
        break;
      default:
    }
  }

  render() {
    return (
      <div className="homepage overflow-hidden">
        <div
          className="flex jc-between ai-center pad-top-peta pad-sides-peta scale-pad-sides-tablet homepage-scale-top">
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
                id="email-registration"
                label="email-registration"
                placeholder="hacker@email.com"
                onChange={() => {}} />
              <PrimaryButton
                text="Submit" />
            </div>
            <p className="secondary">
              <Link to="/">
                Interested in sponsoring?
              </Link>
            </p>
          </div>
          <div className="pad-sides-xxl scale-hide-laptop">
            {getImageDiv('sun', sun)}
          </div>
        </div>

        <div className="homepage-skyline fill-width">
          {getImageDiv('skyline', skyline)}
        </div>

        <div
          ref={node => this.aboutDiv = node}
          className={`${ROW_STYLE} scale-row-desktop`}>
          <div className="scale-width-desktop">
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
          <div className="scale-width-desktop flex jc-center">
            <div className="pad-left-giga pad-ends-l scale-pad-sides-desktop-none">
              {getImageDiv('bear', panelBear, true)}
            </div>
          </div>
        </div>

        <div className={`${ROW_STYLE} scale-row-desktop-rev`}>
          <div className="scale-width-desktop flex jc-center">
            <div className="pad-right-giga pad-ends-l scale-pad-sides-desktop-none">
              {getImageDiv('train', panelTrain, true)}
            </div>
          </div>
          <div className="scale-width-desktop">
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

        <div className="flex jc-center dir-col pad-ends-tera">
          {getImageDiv('cute-bear', bearCircle)}
          <p className="primary flex jc-center text-center">
            Stay tuned for sponsor updates!
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
