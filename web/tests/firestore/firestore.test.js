import { auth } from '../firebase';

/*
 This test suite needs refactoring if we do decide to pursue this further
 Refer to robert's comment https://github.com/nwhacks/nwhacks2019/pull/3
 for refactoring.
 */

let user;

beforeAll(() => auth.createUserWithEmailAndPassword('user@example.com', '12345678').then((userCredential) => {
  console.log('user successfully created!');
  ({ user } = userCredential);
}).catch((error) => {
  console.err('failed to create user: ', error);
}));

test('basic test', () => {
  expect(user.email).toBe('user@example.com');
});

afterAll(() => user.delete().then(() => {
  console.log('user successfully deleted!');
}).catch((error) => {
  console.err('failed to delete user: ', error);
}));
