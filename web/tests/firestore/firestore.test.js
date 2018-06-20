import { auth } from '../../firebase';

let user;

beforeAll(() =>
  auth.createUserWithEmailAndPassword('user@example.com', '12345678').then((userCredential) => {
    console.log('user successfully created!');
    ({ user } = userCredential);
  }).catch((error) => {
    console.err('failed to create user: ', error);
  }));

test('basic test', () => {
  expect(user.email).toBe('user@example.com');
});

afterAll(() =>
  user.delete().then(() => {
    console.log('user successfully deleted!');
  }).catch((error) => {
    console.err('failed to delete user: ', error);
  }));
