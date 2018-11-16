import React from 'react';

// tetra
import microsoft from '../../assets/sponsors/tetra/microsoft.svg';
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

const sponsors = {
  tetra: [
    {
      alt: 'Microsoft',
      src: microsoft,
      href: 'https://www.microsoft.com/',
    },
    {
      alt: 'Standard Library',
      src: stdlib,
      href: 'https://stdlib.com/',
    },
  ],
  mega: [
    {
      alt: 'CSE (Communications Security Establishment)',
      src: cse,
      href: 'https://www.cse-cst.gc.ca/',
    },
    {
      alt: 'Hootsuite',
      src: hootsuite,
      href: 'https://hootsuite.com/',
    },
    {
      alt: 'SAP Concur',
      src: sap,
      href: 'https://www.concur.ca/sap',
    },
  ],
  kilo: [
    {
      alt: 'Google',
      src: google,
      href: 'https://www.google.ca/',
    },
  ],
  'in-kind': [
    {
      alt: 'DAVIDsTEA',
      src: davidsTea,
      href: 'https://www.davidstea.com/',
    },
    {
      alt: 'Grounds for Coffee',
      src: grounds,
      href: 'https://groundsforcoffee.ca/locations/',
    },
    {
      alt: 'Sparkling Ice',
      src: sparkingIce,
      href: 'https://www.sparklingice.ca/',
    },
    {
      alt: 'Zoho',
      src: zoho,
      href: 'https://www.zoho.com/',
    },
  ],
};

const getSponsor = (sponsor, className) => (
  <a href={sponsor.href}>
    <img
      className={className}
      alt={sponsor.alt}
      src={sponsor.src}
    />
  </a>
);

const getSponsors = (tier, className) => (
  <div className={className}>
    {sponsors[tier].map(sponsor => getSponsor(sponsor, tier))}
  </div>
);

const Sponsors = () => (
  <div className="sponsors flex wrap dir-row jc-center">
    {getSponsors('tetra', 'tetra flex wrap dir-row ai-center fill-width')}
    {getSponsors('mega', 'mega flex wrap dir-row ai-center')}
    {getSponsors('kilo', 'kilo flex wrap dir-row ai-center')}
    {getSponsors('in-kind', 'in-kind flex wrap dir-row ai-center')}
  </div>
);

export { Sponsors };
