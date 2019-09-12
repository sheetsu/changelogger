import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {

    // Get client and context
    const client: github.GitHub = new github.GitHub(
      core.getInput('repo-token', {required: true})
    );
    const context = github.context;
    const payload = context.payload;

    core.debug('${payload}');

    if (payload.action !== 'closed') {
      core.debug('No PR was closed, skipping');
      return;
    }

    const ref = context.payload.ref

    const branch = ref.replace(/^refs\/heads\//, '')
    core.debug('branch: ${branch}');

    if (branch !== 'master') {
      core.debug('No master branch, skipping');
      return;
    }

    if (!payload.pull_request) {
      core.debug(
        'The event that triggered this action was not a pull request, skipping.'
      );
      return;
    }

    if (!payload.sender) {
      throw new Error('Internal error, no sender provided by GitHub');
    }

    const issue: {owner: string; repo: string; number: number} = context.issue;

    const body: string | undefined = payload.pull_request.body




  } catch (error) {
    core.setFailed(error.message);
    return;
  }
}

function evalTemplate(template, params) {
  return Function(...Object.keys(params), `return \`${template}\``)(...Object.values(params));
}

run();
