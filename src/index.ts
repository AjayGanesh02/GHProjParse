import { Octokit } from "octokit";

class GHProjectParse {
  octokit;

  constructor(auth: string) {
    this.octokit = new Octokit({ auth: auth });
  }

  async listProjects() {
    const repos = await this.octokit.paginate("GET /user/repos");
    const filtered = repos.filter((elt) => elt.topics?.includes("portfolio"));
    return filtered;
  }
}

export default GHProjectParse;
