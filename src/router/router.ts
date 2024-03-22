import { EmailController } from 'src/api/controller/email.controller';
import { Router } from 'express';

const router: Router = Router();

router.use('/send', EmailController.send);

export const routerControl: Router = router;
