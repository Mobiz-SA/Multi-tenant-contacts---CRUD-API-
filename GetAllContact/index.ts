import {AzureFunction, Context, HttpRequest} from '@azure/functions';
import {getAllContact} from '../DataAccess/contactList';
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log.info('Get all contacts started');
  context.log.info('Get all contacts sthe');
  const cont = await getAllContact();
  if (cont && cont.length > 0) {
    context.res = {
      status: 200,
      body: cont,
    };
  } else {
    context.res = {
      status: 404,
    };
  }

  context.log.info('Get all contacts completed.');
};

export default httpTrigger;
