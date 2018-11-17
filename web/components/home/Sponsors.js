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
// in-kind
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
    {getSponsor('Microsoft', microsoft, 'https://www.microsoft.com/', 'tetra')}
    {getSponsor('Standard Library', stdlib, 'https://stdlib.com/', 'tetra')}<br />
    {getSponsor('CSE (Communications Security Establishment)', cse, 'https://www.cse-cst.gc.ca/', 'mega')}
    {getSponsor('Hootsuite', hootsuite, 'https://hootsuite.com/', 'mega')}<br />
    {getSponsor('SAP Concur', sap, 'https://www.concur.ca/sap/', 'mega')}
    {getSponsor('Google', google, 'https://www.google.com', 'kilo')}<br />
    {getSponsor('DAVIDsTEA', davidsTea, 'https://www.davidstea.com/', 'in-kind')}
    {getSponsor('Grounds For Coffee', grounds, 'https://groundsforcoffee.ca/locations/', 'in-kind')}
    {getSponsor('Sparkling Ice', sparkingIce, 'https://www.sparklingice.ca/', 'in-kind')}
    {getSponsor('Zoho', zoho, 'https://www.zoho.com/', 'in-kind')}
  </div>
);

export { Sponsors };
