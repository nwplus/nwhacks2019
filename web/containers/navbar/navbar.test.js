import React from 'react';
import { shallow, configure } from 'enzyme';
import Navbar from '.';
import Adapter from 'enzyme-adapter-react-16';

beforeAll(() => {
  configure({ adapter: new Adapter() });
})

test('some test man', () => {
  const location = {
    pathname: "/"
  };

  const signedIn = false;

  const navbar = shallow(<Navbar location={location} signedIn={signedIn} />);
  expect(0).toBe(0);
});
