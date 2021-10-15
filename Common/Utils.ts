import {Guid} from 'guid-typescript';
import {checkNum} from '../DataAccess/contactList';
export class GuidClass {
  public id: Guid;
  constructor() {
    this.id = Guid.create(); // ==> b77d409a-10cd-4a47-8e94-b0cd0ab50aa1
  }
  idValue() {
    return this.id;
  }
}

export function getUserId(): string {
  const userid = ['0001Ref1', '0002Ref2', '0003Ref3', '0004Ref4'];
  let rand = Math.floor(Math.random() * 4);
  return userid[rand];
}
export async function phoneValidator(
  phone: string,
  userTemp: string
): Promise<boolean> {
  let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  let numTest = phone.replace(/[^0-9]/g, '');

  if (phone.match(phoneno)) {
    const count = await checkNum(numTest, userTemp);
    if (count.length > 0) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
