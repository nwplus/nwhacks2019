import React from 'react';
import PropTypes from 'prop-types';
import { EXTERNAL } from '../home/External';

import farLeftEvergreen from '../../assets/footer/scenery/far-left-evergreen.svg';
import leftEvergreen from '../../assets/footer/scenery/left-evergreen.svg';
import leftDeciduous from '../../assets/footer/scenery/left-deciduous.svg';
import bear from '../../assets/footer/scenery/bear.svg';
import rightDeciduous from '../../assets/footer/scenery/right-deciduous.svg';
import rightEvergreen from '../../assets/footer/scenery/right-evergreen.svg';
import mobileRightTrees from '../../assets/footer/scenery/right-trees.svg';
import mobileLeftTrees from '../../assets/footer/scenery/left-trees.svg';

import facebookIcon from '../../assets/footer/icons/facebook.svg';
import instagramIcon from '../../assets/footer/icons/instagram.svg';
import mediumIcon from '../../assets/footer/icons/medium.svg';
import twitterIcon from '../../assets/footer/icons/twitter.svg';

const social = {
  facebook: {
    alt: 'facebook',
    src: facebookIcon,
    href: EXTERNAL.FACEBOOK,
  },
  instagram: {
    alt: 'instagram',
    src: instagramIcon,
    href: EXTERNAL.INSTAGRAM,
  },
  medium: {
    alt: 'medium',
    src: mediumIcon,
    href: EXTERNAL.MEDIUM,
  },
  twitter: {
    alt: 'twitter',
    src: twitterIcon,
    href: EXTERNAL.TWITTER,
  },
};

const getImage = (alt, src, className) => (
  <img
    className={className}
    alt={alt}
    src={src} />
);

const getIcon = obj => (
  <a href={obj.href}>
    {getImage(obj.alt, obj.src, obj.className)}
  </a>
);

const Footer = () => (
  <footer className="footer fill-width">
    {/* desktop scenery */}
    {getImage('tree', leftDeciduous, 'left-deciduous scale-hide-laptop')}
    {getImage('tree', leftEvergreen, 'left-evergreen scale-hide-tablet')}
    {getImage('tree', farLeftEvergreen, 'far-left-evergreen scale-hide-phablet')}
    {getImage('bear', bear, 'bear scale-hide-tablet')}
    {getImage('tree', rightDeciduous, 'right-deciduous scale-hide-laptop')}
    {getImage('tree', rightEvergreen, 'right-evergreen scale-hide-phablet')}

    {/* mobile scenery */}
    <div className="scale-show-phablet">
      {getImage('trees', mobileLeftTrees, 'mobile-left-trees')}
      {getImage('bear', bear, 'mobile-bear')}
      {getImage('trees', mobileRightTrees, 'mobile-right-trees')}
    </div>
    <div className="footer-content">
      <div className="social flex dir-row jc-between pad-top-l">
        {getIcon(social.facebook)}
        {getIcon(social.instagram)}
        {getIcon(social.medium)}
        {getIcon(social.twitter)}
      </div>
      <div className="links flex jc-between pad-ends-l">
        <a href={EXTERNAL.EMAIL_US}>E-mail Us</a>
        <a href={EXTERNAL.CODE_OF_CONDUCT}>Code of Conduct</a>
        <a href={EXTERNAL.SPONSORSHIP_PACKAGE}>Become a Sponsor</a>
      </div>
      <div className="footnote pad-bot-l">
        <p>Organized and held by nwPlus
          <br />Copyright © 2018 nwHacks
        </p>
      </div>
    </div>
  </footer>
);

Footer.propTypes = {};

export { Footer };
