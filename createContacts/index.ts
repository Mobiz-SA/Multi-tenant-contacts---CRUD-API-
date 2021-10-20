import {AzureFunction, Context, HttpRequest} from '@azure/functions';
import {contactRecord} from '../models/contact-Record';
import {getUserId, isPhoneValid} from '../Common/Utils';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const userId = req.params.userId;
  const newContat_ = req.body as contactRecord;
  let numberStatus = await isPhoneValid(req.body.phonenumber, userId);
  if (numberStatus) {
    if (newContat_ && newContat_.surname && newContat_.name) {
      context.bindings.outputDocument = {
        // create a random ID
        id: getUserId(),
        userId: userId,
        name: newContat_.name,
        surname: newContat_.surname,
        phonenumber: newContat_.phonenumber,
      } as contactRecord;
      context.res = {
        status: 200,
        body: newContat_,
      };
    } else {
      context.res = {
        status: 422,
      };
      context.log.error(
        'Create new contact failed, invalid input.',
        context.invocationId,
        JSON.stringify(newContat_)
      );
    }
  } else {
    context.log('phonenumber invalid or already exist');
    context.res = {
      status: 422,
    };
  }
};

export default httpTrigger;
