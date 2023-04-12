import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import IGoalLoader from "./utilities/interfaces/IGoalLoader";
import CrossmintChallengeGoalLoader from "./utilities/CrossmintChallengeGoalLoader";
import IMapBuilder from "./utilities/interfaces/IMapBuilder";
import CrossmintChallengeMapBuilder from "./utilities/CrossmintChallengeMapBuilder";
import CrossmintChallengeMapCleaner from "./utilities/CrossmintChallengeMapCleaner";
import IMapCleaner from "./utilities/interfaces/IMapCleaner";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const goalLoader: IGoalLoader = new CrossmintChallengeGoalLoader();
const mapBuilder: IMapBuilder = new CrossmintChallengeMapBuilder();
const mapCleaner: IMapCleaner = new CrossmintChallengeMapCleaner();

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.get('/load-goal', async (req: Request, res: Response) => {
    const goal = await goalLoader.load();
    res.send(goal);
});

app.post('/build-map', async (req: Request, res: Response) => {
    await mapBuilder.build(req.body.positions);
    res.send('Map built');
});
app.delete('/delete-map', async (req: Request, res: Response) => {
    await mapCleaner.clean();
    res.send('Map deleted');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});