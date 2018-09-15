import React from 'react';

import thinking from '../../assets/emoji/thinking.svg';
import eyes from '../../assets/emoji/eyes.svg';
import backpack from '../../assets/emoji/backpack.svg';

export const QUESTIONS = Object.freeze({
  "general": {
    "title": (
      <div>
        <img className="vertical-align-top emoji" src={thinking} /> General
      </div >
    ),
    "questions": [{
      "What is a \"hackathon?\"": (
        <div>
          <p className="margin-top-none" >
            A hackathon is an event where teams collaborate on a project or "hack" within a tight time limit.
            Prizes vary in every hackathon but, for example, can be awarded to hacks that challenge the status quo, fulfill specific challenges, and create meaningful impact.
            Industry professionals from the local community mentor at hackathons to share their experiences, support projects from a technical perspective, and meet the younger generation of hackers.
            2 - 5 people collaborate on an application within the specified time limit (nwHacks is 24 hours long).
            The winners will be chosen by a panel of judges comprised of top industry professionals.
          </p>
        </div>
      )
    },
    {
      "How can I officially sign up?": (
        <p className="margin-top-none">Registration on our website will open in November. <a href="http://eepurl.com/dF3b7n">Click here to sign up for an email reminder</a>.</p>
      )
    },
    {
      "How much does it cost?": (
        <p className="margin-top-none">
          nwHacks is <b>100% free</b> for all participants.
          However, registration is strictly limited to high school and university students, and recent graduates only.
          A bus will be sent to the University of Washington for attendees from Seattle and the surrounding area.
          For other hackers, we will be offering a limited number of travel reimbursements of up to $200 per person (economy flights only).
      </p>
      )
    },
    {
      "Is there a theme for nwHacks?": (
        <p className="margin-top-none">
          At nwHacks, we love seeing the variety of projects that are inspired by the countless areas of tech that teams want to explore.
          We do not have a specific theme but there may be sponsored prizes that will have specific criteria to qualify.
          If you are looking for ideas, sponsored prizes may help your team choose a particular direction.
        </p>
      )
    },
    {
      "What if I don't have any experience?": (
        <p className="margin-top-none">
          {/* Marked as "to be edited" on Notion" */}
          No worries!
          Hackathons are really a place for learning.
          We'll have series of workshops to bootstrap you for hacking so you'll be ready in no time.
          Mentors will be walking around to help you with any problems you'll face.
          By the time you walk out, you'll have a new skill under your belt!
      </p>
      )
    },
    {
      "I'm a designer, can I attend?": (
        <p className="margin-top-none">
          {/* Missing on Notion */}
        </p>
      )
    },
    {
      "I'm a new graduate, can I attend?": (
        <p className="margin-top-none">
          {/* Marked as "to be revisited" on Notion" */}
          Yes, as long as on the day of the event you're within a year of your graduation date.
      </p>
      )
    },
    {
      "What's it like being a volunteer at nwHacks?": (
        <p className="margin-top-none">
          {/* Missing on Notion */}
        </p>
      )
    },
    ],
  },
  "teams_and_projects": {
    "title": (
      <div>
        <img className="vertical-align-top emoji" src={eyes} /> Teams & projects
      </div>
    ),
    "questions": [
      {
        "How big can my team be?": (
          <p className="margin-top-none">
            {/* Marked as "check wording" on Notion" */}
            Teams are usually 2-4 people in size.
            Teams bigger than 4 people are usually split up into smaller ones, as we've found large teams aren't the best solution for a 24h event.
            Don't worry if you can't find your team beforehand, staff at the event will help you find other teammates and provide you with many opportunities to find others!
          </p>
        )
      },
      {
        "What happens if I don't have a team?": (
          <p className="margin-top-none">
            Don't worry!
            A lot of hackers just like you are in the same position.
            On the first day of the event, we will make sure to pair everyone up with a team of hackers so no one gets left out!
            There will also be an opportunity to connect with people and form teams before the event (after you have been chosen to attend).
          </p>
        )
      },
      {
        "Can I work on my previous projects?": (
          <p className="margin-top-none">
            No, all "hacks" must be built from scratch, although it is ok if you came up with the idea before hand.
            This rule is strictly adhered to at nwHacks and any team found working on a project that they already started will be automatically disqualified in the event.
            However this does not apply to any open source libraries or tools that you have made, so feel free to use libraries and any other code!
          </p>
        )
      },
    ],
  },
  "logistics": {
    "title": (
      <div>
        <img className="vertical-align-top emoji" src={backpack} /> Logistics
      </div>
    ),
    "questions": [
      {
        "What should I pack?": (
          <p className="margin-top-none">
          nwHacks is a 24h event, which means that hackers should be prepared to sleep overnight at the venue. 
          Be sure to bring everything you need to stay the night, including a sleeping bag! 
          All food will be provided at event so don't worry about that!
          </p>
        )
      },
      {
        "What documentation do I have to bring?": (
          <p className="margin-top-none">
            {/* Not finalized on Notion */}
          </p>
        )
      },
      {
        "Can I come late?": (
          <p className="margin-top-none">
            {/* Not finalized on Notion */}
          </p>
        )
      },
      {
        "How do I get to the event?": (
          <p className="margin-top-none">
            {/* Not finalized on Notion */}
          </p>
        )
      },
    ]
  }
});
