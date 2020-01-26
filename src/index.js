import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import uuidv4 from 'uuid/v4';
import models, { sequelize } from '../models';
import routes from '../routes';

const app = express();

console.log(models)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => { 
  req.context = {
      models,
      me: await models.User.findByLogin('rwieruch'),
  };
  console.log(req.context)
  next();
})
// app.use('/messages', routes.message);
app.use('/users', routes.user);
app.use('/session', routes.session);



app.get("/", (req, res) => { 
  return res.send(models);
});


const port = process.env.PORT || 3001;

const reseed_db = false;
sequelize.sync({ force: reseed_db }).then(() => {
    if(reseed_db){
      createUsersWithMessages();
    }
    app.listen(port, () => {
        console.log(`We listenin' on ${port}`);
    })
})

const createUsersWithMessages = async () => {
    await models.User.create(
      {
        username: 'rwieruch',
        messages: [
          {
            text: 'Published the Road to learn React',
          },
        ],
      },
      {
        include: [models.Message],
      },
    );
    await models.User.create(
      {
        username: 'ddavids',
        messages: [
          {
            text: 'Happy to release ...',
          },
          {
            text: 'Published a complete ...',
          },
        ],
      },
      {
        include: [models.Message],
      },
    );
  };