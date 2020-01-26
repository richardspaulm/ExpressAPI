import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import uuidv4 from 'uuid/v4';
import models from '../models';
import routes from '../routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/messages', routes.message);
app.use('/users', routes.user);
app.use('/session', routes.session);

app.use((req, res, next) => { 
    req.context = {
        models,
        me: models.users[1],
    };
    next();
})

app.get('/users', (req, res) => {
    return res.send(Object.values(users));
  });

  app.get('/users/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
  });
app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
        id,
        text: req.body.text,
        userId: req.context.me.id
    };

    req.context.models.messages[id] = message;

    return res.send(message);
});

app.get('/session', (req, res) => {
    return res.send(users[req.me.id]);
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`We Listenin on port ${port}!`);
})