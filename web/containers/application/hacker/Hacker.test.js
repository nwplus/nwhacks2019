import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import HackerApplication from '../../../components/application/hacker/Hacker';
import { HackerApplicationContainer } from './Hacker';

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

describe('AfterLoginContainer', () => {
  let props;
  let wrapper;
  const getWrapper = () => shallow(<HackerApplicationContainer {...props} />);

  describe('with given props', () => {
    let componentProps;

    beforeEach(() => {
      props = {
        hackerApplication: {
          name: 'John Doe',
          school: 'UBC',
        },
        activeIndex: 99,
        lastValidIndex: 100,
        changePage: jest.fn(),
        changeLastActiveIndex: jest.fn(),
      };

      wrapper = getWrapper();
      componentProps = wrapper.find(HackerApplication).props();
    });

    it('passes hacker application to the component', () => {
      expect(componentProps).toHaveProperty('hackerApplication', {
        name: 'John Doe',
        school: 'UBC',
      });
    });

    it('passes active index to the component', () => {
      expect(componentProps).toHaveProperty('activeIndex', 99);
    });

    it('passes last valid index to the component', () => {
      expect(componentProps).toHaveProperty('lastValidIndex', 100);
    });
  });

  describe('when changing pages', () => {
    describe('when active page is smaller than last valid page', () => {
      beforeEach(() => {
        props = {
          hackerApplication: {
            name: 'John Doe',
            school: 'UBC',
          },
          activeIndex: 99,
          lastValidIndex: 100,
          changePage: jest.fn(),
          changeLastActiveIndex: jest.fn(),
        };

        wrapper = getWrapper();
      });

      describe('onPageNext', () => {
        beforeEach(() => {
          wrapper.instance().onPageNext();
        });

        it('changePage is called with the next page', () => {
          const { changePage } = props;
          expect(changePage).toHaveBeenCalledWith(100);
        });
      });

      describe('onPageBack', () => {
        beforeEach(() => {
          wrapper.instance().onPageBack();
        });

        it('changePage is called with the next page', () => {
          const { changePage } = props;
          expect(changePage).toHaveBeenCalledWith(98);
        });
      });
    });

    describe('when active page is greater or equal to last valid page', () => {
      beforeEach(() => {
        props = {
          hackerApplication: {
            name: 'John Doe',
            school: 'UBC',
          },
          activeIndex: 100,
          lastValidIndex: 100,
          changePage: jest.fn(),
          changeLastActiveIndex: jest.fn(),
        };

        wrapper = getWrapper();
      });

      describe('onPageNext', () => {
        beforeEach(() => {
          wrapper.instance().onPageNext();
        });

        it('changePage is called with the next page', () => {
          const { changePage } = props;
          expect(changePage).toHaveBeenCalledWith(101);
        });

        it('changeLastActiveIndex is called with the next page', () => {
          const { changeLastActiveIndex } = props;
          expect(changeLastActiveIndex).toHaveBeenCalledWith(101);
        });
      });

      describe('onPageBack', () => {
        beforeEach(() => {
          wrapper.instance().onPageBack();
        });

        it('changePage is called with the next page', () => {
          const { changePage } = props;
          expect(changePage).toHaveBeenCalledWith(99);
        });
      });
    });
  });
});
