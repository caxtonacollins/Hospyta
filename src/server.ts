import { app } from '../src/app';
import { logger } from '../src/config/wistonLogger';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Listening to port ${PORT}😎`);
});
