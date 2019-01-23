import React from 'react';

// tetra
import microsoft from '../../assets/sponsors/tetra/microsoft.png';
import stdlib from '../../assets/sponsors/tetra/stdlib.svg';
// mega
import cse from '../../assets/sponsors/mega/cse.png';
import hootsuite from '../../assets/sponsors/mega/hootsuite.png';
import sap from '../../assets/sponsors/mega/sap.png';
import telus from '../../assets/sponsors/mega/telus.svg';
import rbc from '../../assets/sponsors/mega/rbc.svg';
// kilo
import google from '../../assets/sponsors/kilo/google.svg';
import clearly from '../../assets/sponsors/kilo/clearly.svg';
import realtor from '../../assets/sponsors/kilo/realtor.png';
import sauder from '../../assets/sponsors/kilo/sauder.png';
import deloitte from '../../assets/sponsors/kilo/deloitte.png';
import jumpstart from '../../assets/sponsors/kilo/jumpstart.png';
// micro
import copperleaf from '../../assets/sponsors/micro/copperleaf.png';
import bestbuy from '../../assets/sponsors/micro/bestbuy.svg';
// in-kind
import industrialpixel from '../../assets/sponsors/in-kind/industrialpixel.png';
import wolfram from '../../assets/sponsors/in-kind/wolfram.png';
import stickermule from '../../assets/sponsors/in-kind/stickermule.png';
import stickeryou from '../../assets/sponsors/in-kind/stickeryou.png';
import davidstea from '../../assets/sponsors/in-kind/davidstea.svg';
import grounds from '../../assets/sponsors/in-kind/grounds.png';
import sparkingice from '../../assets/sponsors/in-kind/sparklingice.svg';
import zoho from '../../assets/sponsors/in-kind/zoho.svg';
import dottech from '../../assets/sponsors/in-kind/dottech.png';
import teslaamazing from '../../assets/sponsors/in-kind/teslaamazing.png';
import github from '../../assets/sponsors/in-kind/github.svg';
import lebeau from '../../assets/sponsors/in-kind/lebeau.png';
import nextbillion from '../../assets/sponsors/in-kind/nextbillion.png';
// partners
import nwplus from '../../assets/partners/nwplus.png';
import mlh from '../../assets/partners/mlh.svg';
import bctech from '../../assets/partners/bctech.png';
import leagueofinnovators from '../../assets/partners/leagueofinnovators.png';


const getSponsor = (alt, src, href, className) => (
  <a href={href}>
    <img
      alt={alt}
      src={src}
      className={`scale-on-hover ${className}`}
    />
  </a>
);

const Sponsors = () => (
  <div className="sponsors">
    <h2 className="margin-bottom-m">Sponsors</h2>
    {/* tetra */}
    {getSponsor('Microsoft', microsoft, 'https://www.microsoft.com/', 'tetra')}
    {getSponsor('Standard Library', stdlib, 'https://stdlib.com/', 'tetra')}
    <br />
    {/* mega */}
    {getSponsor('CSE (Communications Security Establishment)', cse, 'https://www.cse-cst.gc.ca/', 'mega')}
    {getSponsor('Hootsuite', hootsuite, 'https://hootsuite.com/', 'mega')}
    <br />
    {getSponsor('SAP Concur', sap, 'https://www.concur.ca/sap/', 'mega')}
    {/* <br /> */}
    {getSponsor('Royal Bank of Canada', rbc, 'https://www.rbcroyalbank.com/', 'mega')}
    {/* <br /> */}
    {getSponsor('Telus', telus, 'http://www.telus.com/gtlp', 'mega')}
    <br />
    {/* kilo */}
    {getSponsor('Deloitte', deloitte, 'https://www2.deloitte.com/ca/en.html', 'kilo')}
    {getSponsor('Google', google, 'https://www.google.com', 'kilo')}
    {getSponsor('Clearly', clearly, 'https://www.clearly.ca/ ', 'kilo')}
    <br />
    {getSponsor('Realtor', realtor, 'https://www.realtor.com/about/', 'kilo')}
    {getSponsor('Sauder School of Business - Master of Business Analytics Program', sauder, 'https://www.sauder.ubc.ca/Programs/Master_of_Business_Analytics', 'kilo')}
    {getSponsor('Jumpstart', jumpstart, 'https://www.jumpstart.me', 'kilo')}
    <br />
    {/* micro */}
    {getSponsor('Copperleaf', copperleaf, 'https://www.copperleaf.com/', 'micro')}
    {getSponsor('Best Buy', bestbuy, 'https://www.bestbuy.ca/', 'micro')}
    {/* in-kind */}
    {getSponsor('GitHub', github, 'https://github.com/', 'in-kind')}
    {getSponsor('Wolfram Research', wolfram, 'https://www.wolfram.com/', 'in-kind')}
    {getSponsor('Sticker Mule', stickermule, 'https://hackp.ac/mlh-stickermule-hackathons', 'in-kind')}
    <br />
    {getSponsor('StickerYou.com', stickeryou, 'https://www.stickeryou.com/products/custom-stickers/335?utm_source=nwhacks&utm_medium=Sponsorship&utm_campaign=SPONSORSHIP2019', 'in-kind')}
    {getSponsor('.TECH', dottech, 'https://get.tech/', 'in-kind')}
    {getSponsor('DAVIDsTEA', davidstea, 'https://www.davidstea.com/', 'in-kind')}
    {getSponsor('tesla amazing', teslaamazing, 'https://teslaamazing.com/', 'in-kind')}
    {getSponsor('Industrial Pixel VFX', industrialpixel, 'https://industrialpixelvfx.com/', 'in-kind')}
    <br />
    {getSponsor('Grounds For Coffee', grounds, 'https://groundsforcoffee.ca/locations/', 'in-kind')}
    {getSponsor('Zoho', zoho, 'https://www.zoho.com/', 'in-kind')}
    {getSponsor('Sparkling Ice', sparkingice, 'https://www.sparklingice.ca/', 'in-kind')}
    {getSponsor('Patisserie Lebeau', lebeau, 'https://www.grababetterwaffle.com/', 'in-kind')}
    {getSponsor('Next Billion', nextbillion, 'https://www.nextbillion.org/', 'in-kind')}
  </div>
);

const Partners = () => (
  <div className="partners">
    <h2 className="margin-top-giga margin-bottom-m">Partners</h2>
    {getSponsor('nwPlus', nwplus, 'http://facebook.com/nwplusubc', 'partner')}
    {getSponsor('MLH', mlh, 'https://mlh.io/', 'partner')}
    {getSponsor('BC Tech', bctech, 'https://wearebctech.com/', 'partner')}
    {getSponsor('Leagues of Innovators', leagueofinnovators, 'https://www.theleagueofinnovators.com/', 'partner')}
  </div>
);

export { Sponsors, Partners };
