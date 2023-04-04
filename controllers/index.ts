import HealthController from './health';
import AwsSamRouter from 'simple-lambda-api-router/dist/classes/AwsSamRouter';
import userController from './user';
import clientController from './client';

const router = new AwsSamRouter();

// using createController approach
router.use('/health/', HealthController);
router.use('/health/{type}/', HealthController);

// using decorators approach

router.use(userController.getUser);
router.use(userController.getUsers);
router.use(userController.createUser);
router.use(userController.deleteUser);

router.use(clientController.getClient);
router.use(clientController.getClients);
router.use(clientController.createClient);
router.use(clientController.deleteClient);

const handler = router.expose();

export default handler;
