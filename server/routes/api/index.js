import { Router } from 'express';
import userRouter  from './user-routes.js';
import reviewRoutes from './review-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/reviews', reviewRoutes);

export default router;
