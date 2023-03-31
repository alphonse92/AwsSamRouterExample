import HealthController from './health';
import AwsSamRouter from 'simple-lambda-api-router/dist/classes/AwsSamRouter';

const router = new AwsSamRouter();
router.use('/health/', HealthController);
router.use('/health/{type}/', HealthController);

const handler = router.expose();

export default handler;
