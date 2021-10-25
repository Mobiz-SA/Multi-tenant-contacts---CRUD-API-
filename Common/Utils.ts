import {PhoneNumberUtil} from 'google-libphonenumber';
import {Guid} from 'guid-typescript';
import {findByPhone} from '../DataAccess/contactList';

export function generateGuid() {
  let id = Guid.create().toString();
  return id;
}
export async function isPhoneValid(
  phonenumber: string,
  userTemp: string
): Promise<boolean> {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const number = phoneUtil.parseAndKeepRawInput(phonenumber, 'ZA');
  if (!phoneUtil.isValidNumber(number)) {
    return false;
  } else {
    const count = await findByPhone(phonenumber, userTemp);
    if (count) {
      return false;
    } else {
      return true;
    }
  }
}
