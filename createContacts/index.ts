import {AzureFunction, Context, HttpRequest} from '@azure/functions';
import {contactRecord} from '../models/contact-Record';
import {generateGuid, isPhoneValid} from '../Common/Utils';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const userId = req.query.userId;
  const newContact = req.body as contactRecord;
  let numberStatus = await isPhoneValid(req.body.phonenumber, userId);
  if (!numberStatus) {
    context.log('phonenumber invalid or already exist');
    context.res = {
      status: 422,
    };
    return;
  }

  if (!(newContact && newContact.surname && newContact.name && userId)) {
    context.res = {
      status: 422,
    };
    context.log.error(
      'Create new contact failed, invalid input.',
      context.invocationId,
      JSON.stringify(newContact)
    );
    return;
  }

  context.bindings.outputDocument = {
    // create a random ID
    id: generateGuid(),
    userId: userId,
    name: newContact.name,
    surname: newContact.surname,
    phonenumber: newContact.phonenumber,
  } as contactRecord;
  context.res = {
    status: 200,
    body: 'contact created',
  };
};

export default httpTrigger;
