import {AzureFunction, Context, HttpRequest} from '@azure/functions';
import {contactRecord} from '../models/contact-Record';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  todo
): Promise<void> {
  req.body = {name: 'sthembi', surname: 'Mkhi', phonenumber: '0912345991'};
  const updateContact = req.body as contactRecord;
  const completed = req.body.completed;
  context.log(context.bindings.inputDocument);
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
    context.bindings.outputDocument.surname = contRecord.surname;

    context.res = {
      status: 200,
      body: context.bindings.outputDocument,
    };
  } else {
    context.res = {
      status: 404,
    };
  }
};

export default httpTrigger;
