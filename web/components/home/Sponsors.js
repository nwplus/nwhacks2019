import React from 'react';

// tetra
import microsoft from '../../assets/sponsors/tetra/microsoft.png';
import stdlib from '../../assets/sponsors/tetra/stdlib.svg';
// mega
import cse from '../../assets/sponsors/mega/cse.png';
import hootsuite from '../../assets/sponsors/mega/hootsuite.png';
import sap from '../../assets/sponsors/mega/sap.png';
// kilo
import google from '../../assets/sponsors/kilo/google.svg';
import realtor from '../../assets/sponsors/kilo/realtor.png';
import deloitte from '../../assets/sponsors/kilo/deloitte.png';
// in-kind
import wolfram from '../../assets/sponsors/in-kind/wolfram.png';
import stickermule from '../../assets/sponsors/in-kind/stickermule.png';
import davidsTea from '../../assets/sponsors/in-kind/davidstea.svg';
import grounds from '../../assets/sponsors/in-kind/grounds.png';
import sparkingIce from '../../assets/sponsors/in-kind/sparkling-ice.svg';
import zoho from '../../assets/sponsors/in-kind/zoho.svg';

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
    {getSponsor('SAP Concur', sap, 'https://www.concur.ca/sap/', 'mega')}
    <br />
    {/* kilo */}
    {getSponsor('Realtor', realtor, 'https://www.realtor.com/about/', 'kilo')}
    {getSponsor('Google', google, 'https://www.google.com', 'kilo')}
    {getSponsor('Deloitte', deloitte, 'https://www2.deloitte.com/ca/en.html', 'kilo')}
    <br />
    {/* in-kind */}
    {getSponsor('Grounds For Coffee', grounds, 'https://groundsforcoffee.ca/locations/', 'in-kind')}
    {getSponsor('DAVIDsTEA', davidsTea, 'https://www.davidstea.com/', 'in-kind')}
    {getSponsor('Sticker Mule', stickermule, 'https://hackp.ac/mlh-stickermule-hackathons', 'in-kind')}
    <br />
    {getSponsor('Wolfram Research', wolfram, 'https://www.wolfram.com/', 'in-kind')}
    {getSponsor('Zoho', zoho, 'https://www.zoho.com/', 'in-kind')}
    {getSponsor('Sparkling Ice', sparkingIce, 'https://www.sparklingice.ca/', 'in-kind')}
  </div>
);

export { Sponsors };
