import {AzureFunction, Context, HttpRequest} from '@azure/functions';
import {contactRecord} from '../models/contact-Record';
import {newContact} from '../models/new-Contact';
import {getUserId, GuidClass, isPhoneValid} from '../Common/Utils';
import {PhoneNumberUtil} from 'google-libphonenumber';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  let idValue = new GuidClass();
  let idTemp = JSON.stringify(idValue.id);

  const userTemp = getUserId();
  const newContat_ = req.body as newContact;
  let numberStatus = await isPhoneValid(req.body.phonenumber, userTemp);
  if (numberStatus) {
    if (newContat_ && newContat_.surname && newContat_.name) {
      context.bindings.outputDocument = {
        // create a random ID
        id: idTemp.slice(10, idTemp.length - 2),
        userId: userTemp,
        name: newContat_.name,
        surname: newContat_.surname,
        phonenumber: newContat_.phonenumber,
      } as contactRecord;
      context.res = {
        status: 200,
        body: newContat_,
      };
    } else {
      context.res = {
        status: 400,
      };
      context.log.error(
        'Create new contact failed, invalid input.',
        context.invocationId,
        JSON.stringify(newContat_)
      );
    }
  } else {
    context.log('phonenumber invalid or already exist');
    context.res = {
      status: 400,
    };
  }
};

export default httpTrigger;
