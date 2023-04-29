import GHProjectParse from '../index';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config()

test('Portfolio', async () =>  { 
    const ghpp = new GHProjectParse(process.env.GH_PAT ?? "")
    const repos = await ghpp.listProjects();
    expect(repos.length).toBe(1)
})