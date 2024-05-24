import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { CustomError } from './customError';

const asyncScript = promisify(scrypt);

/**
 *
 * @param value the string to be hashed
 * @returns returns string
 */

export const hashValue = async (value: string): Promise<string> => {
  const salt = randomBytes(8).toString('hex');
  const hashedValue = (await asyncScript(value, salt, 64)) as Buffer;
  return `${hashedValue.toString('hex')}.${salt}`;
};

/**
 *
 * @param hash hash coming from database
 * @param value value that the user supply
 * @returns returns a boolean
 */
export const verifyHash = async (hash: string, value: string) => {
  switch (false) {
    case !!hash:
      new CustomError(400, 'no hash supplied to verify');

      break;

    case !!value:
      new CustomError(400, 'no value supplied to verify its hash');
      break;
  }

  const [storedHashPass, salt] = hash.split('.');
  const hashedPass = (await asyncScript(value, salt, 64)) as Buffer;

  return hashedPass.toString('hex') === storedHashPass;
};
