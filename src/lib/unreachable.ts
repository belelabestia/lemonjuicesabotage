export class Unreachable extends Error { }
export const unreachable = () => { throw new Unreachable('Unreachable code.') };
