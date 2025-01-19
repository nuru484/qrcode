import { Router } from 'express';
const router = Router();

import refreshToken from '../authentication/refreshJwtToken.js';

router.post('/refreshToken', refreshToken);

export default router;
