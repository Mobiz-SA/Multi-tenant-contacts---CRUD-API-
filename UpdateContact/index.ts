import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { contactRecord } from "../models/contact-Record";
import { editTodoItem } from "../DataAccess/contactList";
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log.info('Edit todo item started.');
    
   const id = "2021-10-11B16:30:04.340Z45308239";
   const id2="2021-10-08T11:08:04.340Z45308239";
   req.body={name:"Bby",surname:"Darling",phonenumber:"0413674543"};
    const upCont = req.body as contactRecord;
    context.log(upCont);
    if(upCont&& upCont.name && upCont.surname&& upCont.phonenumber) {
        const contRecord = {
            id: id,
            name: upCont.name,
            surname: upCont.surname,
            phonenumber:upCont.phonenumber
        } as contactRecord;
        context.log(contRecord);
        try{
            await editTodoItem(id2,contRecord);
            context.res = {
                status: 200,
                body: contRecord
            };
        }catch(error){
            if(error.message.includes("Entity with the specified id does not exist in the system")){
                context.log.info('Edit todo item middle point.');
                context.res = {
                    status:404

                };
            } else {
                throw error;
            }
        }
    } else {
        context.res = {
            status: 400
        };
    }
    context.log.info('Edit todo item completed.');
    context.done();
};

export default httpTrigger;