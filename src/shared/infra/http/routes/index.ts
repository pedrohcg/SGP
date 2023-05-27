import {Router} from 'express'
import usersRouter from '../../../../modules/users/infra/http/routes/user.routes';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';
import budgetRouter from '../../../../modules/users/infra/http/routes/budget.routes';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/login', sessionsRouter);
routes.use('/budget', budgetRouter);

export default routes;