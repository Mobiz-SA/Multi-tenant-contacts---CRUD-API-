import {AzureFunction, Context, HttpRequest} from '@azure/functions';
import {contactRecord} from '../models/contact-Record';
import {newContact} from '../models/new-Contact';
import {getId, getUserId} from '../Common/Utils';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  req.body = {name: 'Sthembi', surname: 'Mkize', phonenumber: '0723272358'};
  const newContat_ = req.body as newContact;

  if (
    newContat_ &&
    newContat_.surname &&
    newContat_.phonenumber &&
    newContat_.name
  ) {
    context.bindings.outputDocument = {
      // create a random ID
      id: getId(),
      userId: getUserId(),
      name: newContat_.name,
      surname: newContat_.surname,
      phonenumber: newContat_.phonenumber,
    } as contactRecord;
    context.res = {
      status: 201,
      body: newContat_,
    };
  } else {
    context.res = {
      status: 400,
    };
    context.log.error(
      'Create todo item invalid input.',
      context.invocationId,
      JSON.stringify(newContat_)
    );
  }
};

export default httpTrigger;
