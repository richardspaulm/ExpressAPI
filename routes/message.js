import { Router } from 'express';
import uuidv4 from 'uuid/v4';

const router = Router();

router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.messages));
})
router.get("/:messageId", (req, res) => {
    return res.send(req.context.models.message[req.params.messageId])
})
router.post("/", (req, res) => {
    const id = uuidv4()
})


export default router;