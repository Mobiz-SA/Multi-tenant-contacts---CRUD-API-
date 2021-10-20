import {PhoneNumberUtil} from 'google-libphonenumber';
import {Guid} from 'guid-typescript';
import {isNumberInDatabase} from '../DataAccess/contactList';

export function getUserId() {
  let id = Guid.create();
  return id;
}
export async function isPhoneValid(
  phonenumber: string,
  userTemp: string
): Promise<boolean> {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const number = phoneUtil.parseAndKeepRawInput(phonenumber, 'ZA');

  if (phoneUtil.isValidNumber(number)) {
    const count = await isNumberInDatabase(phonenumber, userTemp);
    if (count.length > 0) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
