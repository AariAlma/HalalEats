import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to HalalEats!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
