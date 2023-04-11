import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import IGoalLoader from "./utilities/interfaces/IGoalLoader";
import CrossmintChallengeGoalLoader from "./utilities/CrossmintChallengeGoalLoader";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const goalLoader: IGoalLoader = new CrossmintChallengeGoalLoader();

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.get('/load-goal', async (req: Request, res: Response) => {
    const goal = await goalLoader.load();
    res.send(goal);
});

app.post('/build-map', (req: Request, res: Response) => {
    res.send('Crossmint Challenge - Map Built');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});