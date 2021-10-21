import {AzureFunction, Context, HttpRequest} from '@azure/functions';
import {contactRecord} from '../models/contact-Record';
import {isPhoneValid} from '../Common/Utils';
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  todo
): Promise<void> {
  const updateContact = req.body as contactRecord;
  let numberStatus = await isPhoneValid(
    req.body.phonenumber,
    context.bindings.inputDocument[0].userId
  );
  if (!context.bindings.inputDocument) {
    context.res = {
      status: 422,
    };
  } else {
    const contactRecord = {
      id: context.bindings.inputDocument[0].id,
      userId: context.bindings.inputDocument[0].userId,
      name: updateContact.name,
      surname: updateContact.surname,
      phonenumber: updateContact.phonenumber,
    } as contactRecord;
    if (!numberStatus) {
      context.res = {
        status: 422,
        body: 'invalid phone number or it already exist',
      };
    } else {
      context.bindings.outputDocument = contactRecord;
      context.res = {
        status: 200,
        body: context.bindings.outputDocument,
      };
    }
  }
};

export default httpTrigger;
