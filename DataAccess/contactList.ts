import {CosmosClient, SqlParameter} from '@azure/cosmos';
import {generateGuid} from '../Common/Utils';
import {contactRecord} from '../models/contact-Record';

function getCosmosDbContainer() {
  const cosmosDbConnectionString = process.env['CosmosDbConnectionStr'];
  const client = new CosmosClient(cosmosDbConnectionString);
  const database = client.database('my-database');
  const container = database.container('my-container1');

  return container;
}

export async function getContact(id = '', userId = ''): Promise<contactRecord> {
  const container = getCosmosDbContainer();
  const queryParams: SqlParameter[] = [
    {name: '@userId', value: userId},
    {name: '@id', value: id},
  ];

  const sqlQuery = {
    query: 'SELECT * FROM c WHERE c.userId = @userId AND c.id = @id ',
    parameters: queryParams,
  };

  const {resources: contactRecord} = await container.items
    .query(sqlQuery)
    .fetchAll();

  return contactRecord as unknown as contactRecord;
}
export async function getAllContact(userId: string): Promise<contactRecord[]> {
  const container = getCosmosDbContainer();
  const queryParams: SqlParameter[] = [{name: '@userId', value: userId}];

  const sqlQuery = {
    query: 'SELECT * FROM c WHERE c.userId = @userId',
    parameters: queryParams,
  };

  const {resources: contactRec} = await container.items
    .query(sqlQuery)
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
export async function findByPhone(
  phone: string,
  userId: string
): Promise<number> {
  const container = getCosmosDbContainer();
  const queryParams: SqlParameter[] = [
    {name: '@userId', value: userId},
    {name: '@phone', value: phone},
  ];

  const sqlQuery = {
    query: 'SELECT * FROM c WHERE c.userId = @userId AND c.phonenumber=@phone ',
    parameters: queryParams,
  };

  const {resources: contactRecord} = await container.items
    .query(sqlQuery)
    .fetchAll();

  return contactRecord.length;
}
