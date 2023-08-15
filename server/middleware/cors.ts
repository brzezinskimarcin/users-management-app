import { defineEventHandler, setHeader } from 'h3';

export default defineEventHandler((event) => {
  setHeader(event, 'Access-Control-Allow-Origin', '*');
  setHeader(event, 'Access-Control-Allow-Headers', 'Origin, Content-Type');
  setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
});
