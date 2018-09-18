import { auth } from '../firebase';

/*
 This test suite needs refactoring if we do decide to pursue this further
 Refer to robert's comment https://github.com/nwhacks/nwhacks2019/pull/3
 for refactoring.
 */


test('basic test', async (done) => {
  let user;
  try {
    user = await auth.createUserWithEmailAndPassword('user@example.com', '12345678');
  } catch (e) {
    done.fail(e);
    return;
  }

  expect(user.email).toBe('user@example.com');

  try {
    await user.delete();
  } catch (e) {
    done.fail(e);
  }
});
