import {AzureFunction, Context, HttpRequest} from '@azure/functions';
import {getAllContact} from '../DataAccess/contactList';
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const contact = await getAllContact(req.query.userId);
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

  context.log.info('Get all contacts completed.');
};

export default httpTrigger;
