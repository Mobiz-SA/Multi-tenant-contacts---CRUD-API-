import { CosmosClient } from "@azure/cosmos";
import { contactRecord } from "../models/contact-Record";

function getCosmosDbContainer() {
    const cosmosDbConnectionString = process.env["CosmosDbConnectionStr"];
    const client = new CosmosClient(cosmosDbConnectionString);
    const database = client.database("my-database");
    const container = database.container("my-container");

    return container;
}

export async function getAllTodoItems(id=""): Promise<contactRecord[]> {
    let querySpec = {
        query: `` 
      };
    if(id){
       querySpec = {
            query: `SELECT * from c WHERE c.id = '${id}'` 
          };
}else{
   querySpec = {
        query: `SELECT * from c ` 
      };
}


      
      
    const container = getCosmosDbContainer();
    const { resources: contRec } = await container.items
        .query(querySpec)
        .fetchAll();

    return contRec.map(item => {
        return {
            id: item.id,
            name: item.name,
            surname: item.surname,
            phonenumber: item.phonenumber
        } as contactRecord;
    });
}



export async function editTodoItem(id: string,contact: contactRecord): Promise<contactRecord> {
    
    const container = getCosmosDbContainer();
    const { resource: updatedItem } = await container
                                        .item(id)
                                        .replace(contact);
    return updatedItem;
}

