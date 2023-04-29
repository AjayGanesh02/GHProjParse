import { Octokit } from "octokit";

class GHProjectParse {
  octokit;

  constructor(auth: string) {
    this.octokit = new Octokit({ auth: auth });
  }

  async listProjects() {
    const repos = await this.octokit.paginate("GET /user/repos");
    const filtered = repos.filter((elt) => elt.topics?.includes("project"));
    console.log(filtered)
    const readme_promises = filtered.map((elt) => {
      return this.octokit.rest.repos.getReadme({
        owner: elt.owner.login ?? "",
        repo: elt.name,
      });
    });
    const readmes = await Promise.all(readme_promises);
    console.log(readmes);
    return readmes;
  }
}

export default GHProjectParse;
