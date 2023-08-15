import { type EventHandlerRequest, type H3Event, defineEventHandler, getQuery, readBody } from 'h3';
import { users } from '../../db';

export default defineEventHandler((event) => {
  switch (event.method) {
    case 'GET':
      return getUsers(event);
    case 'POST':
      return addUser(event);
    default:
      return null;
  }
});

function getUsers(event: H3Event<EventHandlerRequest>) {
  const { page, query, per_page }: Record<string, string> = getQuery(event);
  const filtered = users
    .filter(({ first_name, last_name }) => `${first_name} ${last_name}`.toLowerCase().includes(query?.toString()?.toLowerCase() || ''));

  return {
    total_pages: Math.ceil(filtered.length / +per_page),
    data: filtered.slice(
      (+page - 1) * +per_page,
      +page * +per_page,
    ),
  };
}

async function addUser(event: H3Event<EventHandlerRequest>) {
  const requestBody = JSON.parse(await readBody(event));
  const id = Math.max(...users.map(({ id }) => id)) + 1;
  users.push({
    id,
    ...requestBody,
  });

  return {
    id,
  };
}
