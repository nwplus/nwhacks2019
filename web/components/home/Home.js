import React from 'react';
import { SECTION } from './Sections';
import { EXTERNAL } from './External';
import { TextInput } from '../input/text';
import { PrimaryButton } from '../input/buttons';

import sun from '../../assets/sun.svg';

import skyline from '../../assets/skyline.svg';

import panelBear from '../../assets/panel-bear.svg';
import panelTrain from '../../assets/panel-train.svg';

import bearCircle from '../../assets/bear-circle.svg';

// stories assets import
import spencerBg from '../../assets/stories/spencer-bg.svg';
import spencer from '../../assets/stories/spencer.png';
import oliviaBg from '../../assets/stories/olivia-bg.svg';
import olivia from '../../assets/stories/olivia.png';
import avinashBg from '../../assets/stories/avinash-bg.svg';
import avinash from '../../assets/stories/avinash.png';

const getImage = (alt, src, className = '') => (
  <img
    className={className}
    alt={alt}
    src={src} />
);

const ROW_STYLE = 'pad-sides-peta pad-bottom-giga scale-pad-sides-tablet container-width';

const userToText = {
  spencer: (
    <div>
      <h5>Spencer, <a href="https://devpost.com/software/maplemesh" target="_blank" rel="noopener noreferrer">MapleMesh</a></h5>
      <p>
        I was able to come to nwHacks by myself and
         leave with many friends I am still connected with.
        It was such a fun experience because of the great
         energy that the nwHacks organizers put into it.
      </p>
    </div>
  ),
  olivia: (
    <div>
      <h5>Olivia, <a href="https://devpost.com/software/rapid-response-sa4pi1" target="_blank" rel="noopener noreferrer">Rapid Response</a></h5>
      <p>
        nwHacks was one of the most welcoming and inspiring hackathons I’ve ever attended.
         I showed up without a team nor an idea,
          and I left with close new friends and an app that solved a real problem.
           The community at nwHacks was like no other,
           and I feel so fortunate to have been a small part of it.
      </p>
    </div>
  ),
  avinash: (
    <div>
      <h5>Avinash, <a href="https://devpost.com/software/talky" target="_blank" rel="noopener noreferrer">Talky</a></h5>
      <p>
      Attending nwHacks 2018 was one of the best decisions I made.
      The coolest things I saw was the use of NFC chips
      in our check-in tags that were used to access food and more.
      It felt like something out of movie
      and it was an innovative idea that I&apos;ve never seen at another hackathon.
      Building Talky was an absolute blast and I can&apos;t wait to attend next year!
      </p>
    </div>
  ),
};

const userToBg = {
  spencer: spencerBg,
  olivia: oliviaBg,
  avinash: avinashBg,
};

const userToImg = {
  spencer,
  olivia,
  avinash,
};

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
        this.storiesDiv.scrollIntoView({ behavior: 'smooth' });
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
      <div className="homepage overflow-hidden flex jc-center ai-center dir-col">
        <div
          className="flex jc-between ai-center pad-top-peta pad-sides-peta scale-pad-sides-tablet homepage-scale-top container-width">
          <div>
            <h1 className="scale-h1-tablet">nwHacks 2019</h1>
            <p className="primary">
              Western Canada&apos;s largest hackathon<br />
              January 26-27, 2019 @ the University of British Columbia
            </p>
            <p className="secondary">
              Get notified when registration opens!
            </p>
            <form
              className="homepage-email-registration flex ai-end"
              action={EXTERNAL.MAILCHIMP_FORM}
              method="post">
              <TextInput
                name="EMAIL"
                placeholder="hacker@email.com"
                onChange={() => { }} />
              <PrimaryButton
                text="Submit"
                type="submit" />
            </form>
            <p className="secondary">
              <a href={EXTERNAL.SPONSORSHIP_PACKAGE}>
                Interested in sponsoring?
              </a>
            </p>
          </div>
          <div className="pad-sides-xxl scale-hide-laptop">
            {getImage('sun', sun)}
          </div>
        </div>

        <div className="homepage-skyline fill-width">
          {getImage('skyline', skyline)}
        </div>

        <div
          ref={node => this.aboutDiv = node}
          className={`${ROW_STYLE} flex jc-between ai-center dir-row split scale-row-desktop`}>
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
              {getImage('bear', panelBear, 'scale-width-phablet')}
            </div>
          </div>
        </div>

        <div className={`${ROW_STYLE} flex jc-between ai-center dir-row split scale-row-desktop-rev`}>
          <div className="scale-width-desktop flex jc-center">
            <div className="pad-right-giga pad-ends-l scale-pad-sides-desktop-none">
              {getImage('train', panelTrain, 'scale-width-phablet')}
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

        <div
          ref={node => this.storiesDiv = node}
          className={`${ROW_STYLE}`}
          >
          <h2 className="fill-width margin-bottom-xxl">Hacker stories</h2>
          <div className="flex jc-between row-stories scale-row-tablet">
            {
              ['spencer', 'olivia', 'avinash'].map(person => (
                <div className="scale-width-tablet fill-height" key={`${person}`}>
                  <div className="relative overflow-hidden">
                    {getImage(`${person}-bg`, userToBg[person], 'fill-width pad-right-s')}
                    {getImage(`${person}`, userToImg[person], 'fill-width overlay')}
                    <div className="overlay scale-hide-full-screen scale-hover-disable-full-screen hover-show fill-width fill-height">
                      <div className="pad-top-l pad-bottom-xxl pad-sides-m hover-description flex dir-col jc-center fill-height">{userToText[person]}</div>
                    </div>
                  </div>
                  <div className="scale-show-full-screen pad-top-m pad-bottom-xxl flex dir-col jc-center fill-height">{userToText[person]}</div>
                </div>
              ))
            }
          </div>
        </div>

        <div className="flex jc-center dir-col pad-ends-tera">
          {getImage('cute-bear', bearCircle)}
          <p className="primary flex jc-center text-center">
            Stay tuned for sponsor updates!
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
