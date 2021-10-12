import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getAllTodoItems } from "../DataAccess/contactList";
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log.info('Get all todo items started');
    
    const cont = await getAllTodoItems();
    context.log.info(cont);
    if(cont && cont.length > 0) {
        context.res = {
            status: 200,
            body: cont
        };
    } else {
        context.res = {
            status: 204
        };
    }

    context.log.info('Get all todo items completed.');

};

export default httpTrigger;