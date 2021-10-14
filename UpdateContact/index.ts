import {AzureFunction, Context, HttpRequest} from '@azure/functions';
import {contactRecord} from '../models/contact-Record';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  todo
): Promise<void> {
  const id = '';

  const userId = '';
  req.body = {name: 'sthe', surname: 'Darling10', phonenumber: '0413674543'};
  const updateContact = req.body as contactRecord;
  const completed = req.body.completed;
  if (context.bindings.inputDocument) {
    const contRecord = {
      id: context.bindings.inputDocument[0].id,
      userId: context.bindings.inputDocument[0].userId,
      name: updateContact.name,
      surname: updateContact.surname,
      phonenumber: updateContact.phonenumber,
    } as contactRecord;
    context.bindings.outputDocument = context.bindings.inputDocument[0];
    context.bindings.outputDocument.name = contRecord.name;

    context.res = {
      status: 200,
      body: context.bindings.outputDocument.name + 'success',
    };
  } else {
    context.res = {
      status: 404,
    };
  }
};

export default httpTrigger;
