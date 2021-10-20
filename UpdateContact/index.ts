import {AzureFunction, Context, HttpRequest} from '@azure/functions';
import {contactRecord} from '../models/contact-Record';
import {phoneValidator} from '../Common/Utils';
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  todo
): Promise<void> {
  req.body = {name: 'promi', surname: 'kelly', phonenumber: '0672345993'};
  const updateContact = req.body as contactRecord;
  const completed = req.body.completed;
  let numStatus = await phoneValidator(
    req.body.phonenumber,
    context.bindings.inputDocument[0].userId
  );
  if (context.bindings.inputDocument) {
    const contRecord = {
      id: context.bindings.inputDocument[0].id,
      userId: context.bindings.inputDocument[0].userId,
      name: updateContact.name,
      surname: updateContact.surname,
      phonenumber: updateContact.phonenumber,
    } as contactRecord;
    if (numStatus) {
      context.bindings.outputDocument = context.bindings.inputDocument[0];
      context.bindings.outputDocument.name = contRecord.name;
      context.bindings.outputDocument.surname = contRecord.surname;
      context.bindings.outputDocument.phonenumber = contRecord.phonenumber;

      context.res = {
        status: 200,
        body: context.bindings.outputDocument,
      };
    } else {
      context.res = {
        status: 404,
        body: 'invalid phone number',
      };
    }
  } else {
    context.res = {
      status: 404,
    };
  }
};

export default httpTrigger;
