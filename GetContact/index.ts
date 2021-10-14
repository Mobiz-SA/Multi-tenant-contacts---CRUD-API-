import {AzureFunction, Context, HttpRequest} from '@azure/functions';
import {getContact} from '../DataAccess/contactList';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log.info('Get contact started');
  // const id = '2021-10-08T11:08:04.340Z45308239';
  // const userId = '0001Ref1';
  const contact = await getContact(req.body.id, req.body.userId);
  if (contact && contact.length > 0) {
    context.res = {
      status: 200,
      body: contact,
    };
  } else {
    context.res = {
      status: 404,
    };
  }

  context.log.info('Get contact completed.');
};

export default httpTrigger;
