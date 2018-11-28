import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { SECTION } from './Sections';
import { QUESTIONS } from './Questions';
import { EXTERNAL } from './External';
import { TextInput } from '../input/text';
// SecondaryButton lint error so had to put it here
import { PrimaryButton, SecondaryButton } from '../input/buttons';
import { ShowHideTextView } from '../view';
import { Sponsors } from './Sponsors';
import { Footer } from '../footer';

import { getFromFirestore } from '../../services/firestore';

// MLH ribbon
import mlhblueribbon from '../../assets/mlh-blue-ribbon.svg';


import sun from '../../assets/sun.svg';

import skyline from '../../assets/skyline.svg';

import panelBear from '../../assets/panel-bear.svg';
import panelTrain from '../../assets/panel-train.svg';

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

const getFaqSection = section => (
  <div>
    <h3>{QUESTIONS[section].title}</h3>
    {
      QUESTIONS[section].questions.map((question) => {
        const labelText = Object.keys(question)[0];
        const dropDownText = question[labelText];
        return (
          <ShowHideTextView
            label={`${labelText}`}
            dropDownText={dropDownText}
            key={labelText}
            className="margin-ends-s fill-width" />
        );
      })
    }
  </div>
);

const ROW_STYLE = 'pad-sides-tera pad-bottom-section scale-pad-sides-laptop container-width';

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
    let { location: { hash } = {} } = window;
    hash = hash.split('/').pop();
    switch (hash) {
      case SECTION.ABOUT:
        this.aboutDiv.scrollIntoView({ behavior: 'smooth' });
        break;
      case SECTION.STORIES:
        this.storiesDiv.scrollIntoView({ behavior: 'smooth' });
        break;
      case SECTION.FAQ:
        this.faqDiv.scrollIntoView({ behavior: 'smooth' });
        break;
      case SECTION.SPONSORS:
        this.sponsorsDiv.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
    }
  }

  render() {
    const {
      featureFlags: {
        isLoaded: isFeatureFlagsLoaded,
        data: featureFlagsData,
      },
    } = this.props;

    if (!isFeatureFlagsLoaded) return null;

    const {
      application: {
        enabled: isApplicationEnabled,
      },
      volunteer_application: {
        enabled: isVolunteerApplicationEnabled,
      },
      mentor_application: {
        enabled: isMentorApplicationEnabled,
      },
    } = featureFlagsData;

    return (
      <div className="homepage overflow-hidden flex jc-center ai-center dir-col">
        <a className="mlh-trust-badge scale-hide-phablet" href={EXTERNAL.MLH_UPCOMINGHACKATHON_LINK} target="_blank" rel="noopener noreferrer">
          <img className="fill-width" src={mlhblueribbon} alt="Major League Hacking 2019 Hackathon Season" />
        </a>
        <div
          className="homepage-main-panel flex jc-between ai-center pad-top-peta pad-sides-peta pad-bottom-l scale-pad-sides-tablet homepage-scale-top container-width">
          <div>
            <h1 className="scale-h1-tablet pad-bottom-s">nwHacks 2019</h1>
            <p className="primary">
              Western Canada&apos;s largest hackathon<br />
              January 26-27, 2019 @ the University of British Columbia
            </p>
            {
              isApplicationEnabled || isVolunteerApplicationEnabled || isMentorApplicationEnabled
                ? (
                  <div className="flex ai-end pad-bottom-s scale-row-phablet">
                    {
                      isApplicationEnabled ? (
                        <Link to="/application/hacker" className="scale-width-phablet margin-right-s scale-margin-sides-phablet-none scale-margin-bottom-phablet-s">
                          <PrimaryButton
                            text="Apply now"
                            className="scale-width-phablet"
                          />
                        </Link>
                      ) : null
                    }
                    {
                      isVolunteerApplicationEnabled ? (
                        <Link to="/application/volunteer" className="scale-width-phablet margin-right-s scale-margin-sides-phablet-none scale-margin-bottom-phablet-s">
                          <SecondaryButton
                            text="Become a volunteer"
                            className="scale-width-phablet"
                          />
                        </Link>
                      ) : null
                    }
                    {
                      isMentorApplicationEnabled ? (
                        <a
                          target="_blank"
                          href="https://goo.gl/forms/qHweO1xJxF1wua4G3"
                          rel="noopener noreferrer"
                          className="scale-width-phablet margin-right-s scale-margin-sides-phablet-none scale-margin-bottom-phablet-s"
                        >
                          <SecondaryButton
                            text="Become a mentor"
                            className="scale-width-phablet"
                          />
                        </a>
                      ) : null
                    }
                  </div>
                )
                : (
                  <div>
                    <p className="secondary">
                    Get notified when registration opens!
                    </p>
                    <form
                      className="homepage-email-registration flex ai-end pad-bottom-s"
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
                  </div>
                )
            }
            <p className="secondary">
              <a href={EXTERNAL.SPONSORSHIP_PACKAGE}>
                Interested in sponsoring?
              </a>
            </p>
          </div>
          <div className="margin-left-mega margin-bottom-l pad-right-l scale-hide-laptop">
            {getImage('sun', sun)}
          </div>
        </div>

        <div className="homepage-skyline fill-width">
          {getImage('skyline', skyline)}
        </div>

        <div className="row-intro">
          <div
            ref={node => this.aboutDiv = node}
            className={`${ROW_STYLE} row-image-and-desc flex jc-between scale-jc-tablet ai-center dir-row split scale-row-tablet`}>
            <div className="scale-width-tablet">
              <h2>This is nwHacks 2019</h2>
              <p>
                Come make things and break things, and then make them cooler. You&apos;ll
                never be short on inspiration when you’re surrounded by 650 of the
                brightest minds in the Pacific Northwest. All you need to bring is an
                open mind and an insatiable desire to learn; we’ll take care of the
                rest. After all, we&apos;re western Canada’s largest hackathon — we make
                the west coast the best coast.
              </p>
            </div>
            <div className="scale-width-tablet flex jc-center">
              <div className="large-svg pad-left-giga pad-ends-l scale-pad-sides-tablet-none">
                {getImage('bear', panelBear, 'scale-width-phablet')}
              </div>
            </div>
          </div>

          <div className={`${ROW_STYLE} row-image-and-desc flex jc-between scale-jc-tablet ai-center dir-row split scale-row-tablet-rev`}>
            <div className="scale-width-tablet flex jc-center">
              <div className="large-svg pad-right-giga pad-ends-l scale-pad-sides-tablet-none">
                {getImage('train', panelTrain, 'scale-width-phablet')}
              </div>
            </div>
            <div className="scale-width-tablet">
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
                    <div className="overlay scale-hide-stories scale-hover-disable-stories hover-show fill-width fill-height">
                      <div className="pad-top-l pad-bottom-s pad-sides-m hover-description flex dir-col jc-center fill-height">{userToText[person]}</div>
                    </div>
                  </div>
                  <div className="scale-show-stories pad-top-m pad-bottom-xxl flex dir-col jc-center">{userToText[person]}</div>
                </div>
              ))
            }
          </div>
        </div>

        <div ref={node => this.faqDiv = node} className={`${ROW_STYLE}`}>
          <h2 className="fill-width margin-bottom-s">Frequently asked questions</h2>
          <div className="flex jc-start faq scale-row-desktop">
            <div className="flex jc-between dir-row margin-right-s">
              <div className="scale-width-desktop fill-width" key={`${'general'}`}>
                <div className="relative overflow-hidden">
                  {getFaqSection('general')}
                </div>
              </div>
            </div>
            <div className="flex jc-start dir-col margin-left-s">
              {
                ['teams_and_projects', 'logistics'].map(section => (
                  <div className="scale-width-desktop jc-start fill-width" key={`${section}`}>
                    <div className="relative overflow-hidden">
                      {getFaqSection(section)}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <p className="fill-min-width margin-top-s">Still have questions? Feel free to email us at <a href="mailto:hello@nwplus.io">hello@nwplus.io</a> or shoot us a message on <a href="https://facebook.com/nwhacks">Facebook</a>.</p>
        </div>

        {/* <div className="sponsors flex jc-center dir-col pad-top-tera">
          {getImage('cute-bear', bearCircle)}
          <p className="primary flex jc-center text-center">
            Stay tuned for sponsor updates!
          </p>
        </div> */}

        <div ref={node => this.sponsorsDiv = node}>
          <Sponsors />
        </div>

        <Footer />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    firestore,
  } = state;

  const featureFlags = getFromFirestore(firestore, 'feature_flags');

  return {
    featureFlags,
  };
};

Home.propTypes = {
  featureFlags: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Home);
