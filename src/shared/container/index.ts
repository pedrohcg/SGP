import {container} from 'tsyringe';

import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/repositories/UsersRepository';

import IPavementsRepository from '../../modules/pavements/repositories/IPavementsRepository';
import PavementsRepository from '../../modules/pavements/infra/repositories/PavementsRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IPavementsRepository>('PavementsRepository', PavementsRepository);