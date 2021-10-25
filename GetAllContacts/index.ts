import {AzureFunction, Context, HttpRequest} from '@azure/functions';
import {getAllContacts} from '../DataAccess/contactList';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const contacts = await getAllContacts(req.query.userId);
  if (contacts.length) {
    context.res = {
      status: 200,
      body: contacts,
    };
  } else {
    context.res = {
      status: 404,
    };
  }

  context.log.info('Get all conatacts completed.');
};

export default httpTrigger;
