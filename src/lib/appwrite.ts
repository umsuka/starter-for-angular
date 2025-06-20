import { Client, Account} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6636a3c4002afc8d7b4f'); // Replace with your project ID

export const account = new Account(client);
export { ID } from 'appwrite';
export { Query } from 'appwrite';
export { Permission, Role } from 'appwrite';
