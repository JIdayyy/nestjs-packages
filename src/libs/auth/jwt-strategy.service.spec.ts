import { JwtStrategy } from './jwt-strategy.service';
describe('JwtStrategy', () => {
  it('validate with payload', () => {
    // GIVEN
    const jwtStrategy = new JwtStrategy();
    const payload = {
      name: 'a_name',
      companies: ['a_company'],
      email: 'an_email',
    };
    // WHEN
    expect(() => jwtStrategy.validate(payload, () => {})).not.toThrow();
  });

  it('validate without payload', () => {
    // GIVEN
    const jwtStrategy = new JwtStrategy();
    const payload = null as never;
    // WHEN
    expect(() => jwtStrategy.validate(payload, () => {})).toThrow();
  });
});
