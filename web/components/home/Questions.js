import React from 'react';

import thinking from '../../assets/emoji/thinking.svg';
import eyes from '../../assets/emoji/eyes.svg';
import backpack from '../../assets/emoji/backpack.svg';

export const QUESTIONS = Object.freeze({
  general: {
    title: (
      <div>
        <img className="vertical-align-top emoji" alt="🤔" src={thinking} /> General
      </div>
    ),
    questions: [{
      'What is a hackathon?': (
        <div>
          <p className="margin-top-none">
            A hackathon is an event where teams collaborate on a project or &quot;hack&quot; within
            a tight time limit. At nwHacks, teams of 2-4 collaborate over 24 hours to
            challenge the status quo, fulfill prize challenges, and create meaningful impact.
            Industry professionals from the local community mentor at hackathons to share their
            experiences, support projects from a technical perspective, and meet the younger
            generation of hackers. The winners will be chosen by a panel of judges comprised
            of top industry professionals.
          </p>
        </div>
      ),
    },
    {
      'How can I officially sign up?': (
        <p className="margin-top-none">Registration on our website will open in November.&nbsp;
          <a href="http://eepurl.com/dF3b7n">
            Let us know your email and we&apos;ll tell you once it does!
          </a>
        </p>
      ),
    },
    {
      'How much does it cost?': (
        <p className="margin-top-none">
          nwHacks is <b>100% free</b> for all participants. However, registration is
          strictly limited to high school and university students, and recent graduates only.
          A bus will be sent to the University of Washington for attendees from Seattle and
          the surrounding area. For other hackers, we will be offering a limited number
          of travel reimbursements of up to $200 per person (economy flights only).
        </p>
      ),
    },
    {
      'Is there a theme for nwHacks?': (
        <p className="margin-top-none">
          At nwHacks, we love seeing the variety of projects inspired by the countless areas of
          tech that teams want to explore. We do not have a specific theme but there may be
          sponsored prizes with specific qualifying criteria.
        </p>
      ),
    },
    {
      "What if I don't have any experience?": (
        <div>
          <p className="margin-top-none">
            {/* Marked as "to be edited" on Notion" */}
            Have no fear! Hackathons are really a place for learning and one of the best ways
            to do so. We&apos;ll have series of workshops to bootstrap you for hacking. And when
            you run into any problems or questions, mentors will be happy to help you out.
            By the time you walk out, you will have new skills, friends, and a project
            under your belt!
          </p>
          <p>
            On the first day of nwHacks, we will also facilitate team building so no one gets
            left out! There will be opportunities to connect with people and form teams before
            the event in-person and online.
          </p>
        </div>
      ),
    },
    {
      "I'm a designer/graduate/rad human! Can I attend?": (
        <p className="margin-top-none">
          We are excited to invite 650 people to nwHacks including high school and
          university students from all faculties! Great projects are more than just
          their code. New graduates are welcome as long as your graduation date is
          within one year of January 2019.
        </p>
      ),
    },
      // {
      //   "What's it like being a volunteer at nwHacks?": (
      //     <p className="margin-top-none">
      //       {/* Missing on Notion */}
      //     </p>
      //   ),
      // },
    ],
  },
  teams_and_projects: {
    title: (
      <div>
        <img className="vertical-align-top emoji" alt="👀" src={eyes} /> Teams & projects
      </div>
    ),
    questions: [
      {
        'How big can my team be?': (
          <p className="margin-top-none">
            {/* Marked as "check wording" on Notion" */}
            Teams are usually 2-4 people in size.
            Teams bigger than 4 people are usually split up into smaller ones,
            as we&apos;ve found large teams aren&apos;t the best solution for
            a 24h event. Don&apos;t worry if you can&apos;t find your team
            beforehand, staff at the event will help you find other
            teammates and provide you with many opportunities to find others!
          </p>
        ),
      },
      {
        "What happens if I don't have a team?": (
          <p className="margin-top-none">
            Don&apos;t worry!
            A lot of hackers just like you are in the same position.
            On the first day of the event, we will make sure to pair everyone up with a team
            of hackers so no one gets left out! There will also be an opportunity to connect
            with people and form teams before the event (after you have been chosen to attend).
          </p>
        ),
      },
      {
        'Can I work on my previous projects?': (
          <p className="margin-top-none">
            No, all projects must be built from scratch. However, you are welcome to brainstorm
            ideas beforehand. This rule is strictly adhered to at nwHacks and any team found
            working on previous projects will be automatically disqualified in the event. If
            you are using libraries or tools that you have made in the past, don&apos;t worry, this
            does not apply.
          </p>
        ),
      },
    ],
  },
  logistics: {
    title: (
      <div>
        <img className="vertical-align-top emoji" alt="🎒" src={backpack} /> Logistics
      </div>
    ),
    questions: [
      {
        'What should I bring?': (
          <p className="margin-top-none">
            nwHacks is a 24h event, which means that hackers should be prepared
            to sleep overnight at the venue. Be sure to bring everything you need
            to stay the night, including a sleeping bag! All food will be provided
            at event so don&apos;t worry about that!
          </p>
        ),
      },
      // {
      //   'Can I come late?': (
      //     <p className="margin-top-none">
      //       {/* Not finalized on Notion */}
      //     </p>
      //   ),
      // },
      {
        'How do I get to nwHacks?': (
          <div>
            <p className="margin-top-none">
              If you are coming from afar, we will be offering a limited number of
              travel reimbursements up to $200 per person. We also recommend
              applying for travel subsidies with your university or local government.
            </p>
            <p>
              For attendees from Seattle and the surrounding area, we will have
              buses to and from the University of Washington.
            </p>
          </div>
        ),
      },
    ],
  },
});
