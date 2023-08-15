import { type EventHandlerRequest, type H3Event, defineEventHandler, readBody } from 'h3';
import { users } from '../../db';

export default defineEventHandler((event) => {
  switch (event.method) {
    case 'PATCH':
      return editUser(event);
    case 'DELETE':
      return deleteUser(event);
    default:
      return null;
  }
});

async function editUser(event: H3Event<EventHandlerRequest>) {
  const { id } = event.context.params!;
  const requestBody = JSON.parse(await readBody(event));
  const user = users.find(user => user.id === +id);
  if (user) {
    Object.entries(requestBody).forEach(([key, value]) => {
      (user as any)[key] = value;
    });
  }

  return null;
}

function deleteUser(event: H3Event<EventHandlerRequest>) {
  const { id } = event.context.params!;
  const userIndex = users.findIndex(user => user.id === +id);
  users.splice(userIndex, 1);

  return null;
}
