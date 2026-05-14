import app from './app.js';
import { env } from './config/env.js';

app.listen(env.port, () => {
  console.log(`The Team Guy backend listening on port ${env.port}`);
});
