import { Octokit } from "octokit";

class GHProjectParse {
  octokit;

  constructor(auth: string) {
    this.octokit = new Octokit({ auth: auth });
  }

  async parseProjects() {
    const repos = await this.octokit.paginate("GET /user/repos");
    const project_repos = repos.filter((elt) => elt.topics?.includes("project"));
    const readme_promises = project_repos.map((elt) => {
      return this.octokit.rest.repos.getReadme({
        owner: elt.owner.login ?? "",
        repo: elt.name,
      });
    });
    const readmes = await Promise.all(readme_promises);
    const descriptions = readmes.map((readme) => {
      return atob(readme.data.content);
    });

    const full_projects = project_repos.map((proj, idx) => { 
      return {
        "name": proj.name,
        "mdDesc": descriptions[idx],
        "gh_link": proj.html_url
      }
    })

    return full_projects;
  }
}

export default GHProjectParse;
