import express, {Request, Response} from 'express';
require ('dotenv').config();
import { resolveVanityURL, getProfile } from '../services/steam';
const app = express();
const port = process.env.EXPRESS_PORT || 3080; // express port

app.use(express.json());

app.all('/api/all', (req: Request, res: Response) => {
  return res.sendStatus(200);
})

app.get('/api/steamid64/:id', async (req: Request, res: Response) => {
  const response = await resolveVanityURL(req.params.id);
  if(response) {
    return res.status(200).send(response.data);
  } else {
    return res.status(404).send({});
  }
});

app.get('/api/profile/playersummary/:id', async (req: Request, res: Response): Promise<Response> => {
  const response = await getProfile(req.params.id);
  if(response) {
    return res.status(200).send(response);
  } else {
    return res.status(404).send();
  }
});

app.listen(port, () => {
  console.log(`Application is listening at http:localhost:${port}`);
});
