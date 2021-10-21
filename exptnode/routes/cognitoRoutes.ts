import { Router } from 'express'
import {
    registerCognito,
    confirmRegisterCognito,
    signInCognito
} from '../controllers/cognitoController'

const router: Router = Router();

router.route('/register').post(registerCognito);
router.route('/signin').post(signInCognito);
router.route('/confirmregister').post(confirmRegisterCognito);

export default router;