import { Router } from 'express';
import feeRoutes from './fee.routes';

const router = Router();

router.get('/', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', code: 200, message: 'Welcome to Lannister Pay API!' });
});

router.use('/fee', feeRoutes);

export default router;
