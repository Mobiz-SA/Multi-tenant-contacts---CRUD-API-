import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { contactRecord } from "../models/contact-Record";
import { newContact } from "../models/new-Contact";
import { getId} from "../Common/Utils";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    context.log('HTTP trigger function processed a request.');
    req.body={name:"Tommy",surname:"Lee",phonenumber:"0413674543"};

       const newProf=req.body as newContact;

        const responseMessage = req.body;

        if (newProf && newProf.surname&& newProf.phonenumber&&newProf.name) {
            context.bindings.outputDocument = JSON.stringify({
                // create a random ID
                id: getId(),
                name: newProf.name,
                surname: newProf.surname,
                phonenumber:newProf.phonenumber
            } as contactRecord);
            context.res = {
                status:201,
                body: newProf
            };
        }else{
            context.res = {
                status: 400
            };
            context.log.error('Create todo item invalid input.', context.invocationId, JSON.stringify(newProf));
        }


};

export default httpTrigger;
