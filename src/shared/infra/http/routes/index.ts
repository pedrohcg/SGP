import {Router} from 'express'

import usersRouter from '../../../../modules/users/infra/http/routes/user.routes';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';
import budgetRouter from '../../../../modules/users/infra/http/routes/budget.routes';

import pavementsRouter from '../../../../modules/pavements/infra/http/routes/pavements.routes';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/login', sessionsRouter);
routes.use('/budget', budgetRouter);

routes.use('/pavements', pavementsRouter);

export default routes;