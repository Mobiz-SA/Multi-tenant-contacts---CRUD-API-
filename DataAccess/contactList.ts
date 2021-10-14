import {CosmosClient} from '@azure/cosmos';
import {getUserId} from '../Common/Utils';
import {contactRecord} from '../models/contact-Record';

function getCosmosDbContainer() {
  const cosmosDbConnectionString = process.env['CosmosDbConnectionStr'];
  const client = new CosmosClient(cosmosDbConnectionString);
  const database = client.database('my-database');
  const container = database.container('my-container1');

  return container;
}

export async function getContact(
  id = '',
  userId = ''
): Promise<contactRecord[]> {
  const querySpec = {
    query: `SELECT * from c WHERE c.id = '${id}' AND c.userId='${userId}'`,
  };

  const container = getCosmosDbContainer();
  const {resources: contRec} = await container.items
    .query(querySpec)
    .fetchAll();

  return contRec.map((item) => {
    return {
      id: item.id,
      userId: item.userId,
      name: item.name,
      surname: item.surname,
      phonenumber: item.phonenumber,
    } as contactRecord;
  });
}

export async function getAllContact(): Promise<contactRecord[]> {
  const querySpec = {
    query: `SELECT * from c `,
  };

  const container = getCosmosDbContainer();
  const {resources: contactRec} = await container.items
    .query(querySpec)
    .fetchAll();

  return contactRec.map((item) => {
    return {
      id: item.id,
      userId: item.userId,
      name: item.name,
      surname: item.surname,
      phonenumber: item.phonenumber,
    } as contactRecord;
  });
}