import {AzureFunction, Context, HttpRequest} from '@azure/functions';
import {getContact} from '../DataAccess/contactList';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const contact = await getContact(req.query.id, req.query.userId);
  if (contact) {
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
