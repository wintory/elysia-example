import { swagger } from '@elysiajs/swagger';
import { Elysia, t } from 'elysia';

const app = new Elysia()
  .use(swagger())
  .group('/user', app =>
    app.get('/', () => 'user list')
      .get('/:id', ({ params: { id } }) => `user id: ${id}`, {
        params: t.Object({
          id: t.Numeric()
        })
      })
  )
  .listen(8080);


    
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
