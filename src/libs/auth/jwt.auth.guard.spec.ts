import { JwtAuthGuard } from './jwt.auth.guard';

describe('JwtAuthGuard', () => {
  it('should reject if error', () => {
    // GIVEN
    const jwtAuthGuard = new JwtAuthGuard();
    const err = new Error('error') as never;
    const user = 'a_user' as never;

    // WHEN - THEN
    expect(() => jwtAuthGuard.handleRequest(err, user)).toThrow(err);
  });

  it('should reject if no user', () => {
    // GIVEN
    const jwtAuthGuard = new JwtAuthGuard();
    const err = null as never;
    const user = null as never;

    // WHEN - THEN
    expect(() => jwtAuthGuard.handleRequest(err, user)).toThrow();
  });

  it('should return if no error and user provided', () => {
    // GIVEN
    const jwtAuthGuard = new JwtAuthGuard();
    const err = null as never;
    const user = 'a_user' as never;

    // WHEN
    const userResponse = jwtAuthGuard.handleRequest(err, user);

    // THEN
    expect(userResponse).toEqual(user);
  });
});
