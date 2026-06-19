---
name: gh-cli-runner
description: Execute GitHub work through the `gh` CLI — issues, pull requests, releases, GitHub Actions workflow runs, and repo administration (settings, secrets, branch protection, collaborators). Use this whenever the user wants to create, list, view, edit, comment on, label, close, or merge a GitHub issue or PR; check CI/workflow run status, watch a run, or view its logs; cut, edit, or delete a release; or manage repo settings, secrets, or rulesets via the command line. Trigger even on vague or mixed-language phrasing like "이슈 만들어줘", "PR 상태 어때", "이거 머지해줘", "릴리즈 올려줘", a pasted github.com URL, or a bare mention of "gh"/"깃헙"/"깃허브" — the user rarely names the exact subcommand or flags themselves.
---

# gh CLI Runner

Operate GitHub by running the `gh` CLI directly, instead of guessing at REST/GraphQL endpoints or asking the user to do it by hand. `gh` already understands auth, repo context, and pagination, so it is almost always the right tool when the user's request touches issues, PRs, releases, Actions, or repo settings.

## Before running anything

1. **Confirm auth and repo context once per session**, not before every command: `gh auth status` tells you which account is active; `gh repo view` (run inside the repo, or with `-R owner/repo`) confirms which repository you're pointed at. If the user names a different repo than the current directory's, always pass `-R owner/repo` explicitly rather than `cd`-ing around — `gh` resolves the repo from flags first, so this avoids ambiguity.
2. **Figure out if the request is read-only or mutating before you act.** This single distinction drives almost every judgment call below.

## Read vs. mutate — the rule that matters most

`gh` commands split cleanly into two buckets, and they deserve very different levels of caution:

- **Read-only** (`list`, `view`, `status`, `diff`, `log`, `checks`): safe to run freely and chain together to answer a question. No one is affected but you.
- **Mutating or externally visible** (`create`, `comment`, `edit`, `close`, `merge`, `delete`, `reopen`, anything under `secret`/`variable`/`ruleset`/`api -X POST|PATCH|DELETE`): these change shared state or notify other people (a comment emails watchers; a merge ships code). Treat these exactly like the destructive/shared-state actions described in your standing operating instructions — explain what you're about to run and get a go-ahead first, unless the user's own request already explicitly authorized that specific action (e.g. "create an issue titled X with body Y" is itself the authorization for that one `gh issue create` call — you don't need to ask again before running the command they just asked for).

A useful self-check: if the action would surprise the user to see show up in a GitHub notification email, confirm first.

## Command cookbook

These cover the bulk of real requests. For anything not listed here, `gh <noun> --help` is authoritative and faster than guessing — run it rather than inventing flags. `references/cheatsheet.md` has the longer tail (secrets, variables, rulesets, gists, raw `gh api`).

### Issues

```bash
gh issue list --state open --label bug --limit 20
gh issue view 123 --comments
gh issue create --title "Title" --body "$(cat <<'EOF'
Multi-line body goes here.
EOF
)"
gh issue comment 123 --body "..."
gh issue close 123 --comment "Fixed in #124"
gh issue edit 123 --add-label "needs-repro" --add-assignee @me
```

Use a heredoc for any multi-paragraph `--body`/`--title` so quoting and newlines survive — this matters more on Windows shells where naive quoting breaks easily.

### Pull requests

```bash
gh pr list --state open --search "review:required"
gh pr view 123 --json number,title,state,reviewDecision,statusCheckRollup
gh pr diff 123                      # full diff
gh pr checks 123                    # CI status only
gh pr create --title "..." --body "..." --base main --head feature-branch
gh pr review 123 --approve --body "LGTM"
gh pr review 123 --request-changes --body "..."
gh pr merge 123 --squash --delete-branch
gh pr comment 123 --body "..."
```

`gh pr checks` is far cheaper than pulling full workflow logs when the user just wants pass/fail status. Reach for `gh run view <id> --log` only when something actually failed and they need the detail.

### Releases

```bash
gh release list --limit 10
gh release view v1.2.0
gh release create v1.2.0 --title "v1.2.0" --notes-file CHANGELOG.md
gh release create v1.2.0 --generate-notes   # let GitHub draft notes from merged PRs
gh release upload v1.2.0 ./dist/app.zip
gh release edit v1.2.0 --prerelease=false
gh release delete v1.2.0 --yes
```

`--generate-notes` is usually better than hand-writing notes from `git log` — it pulls from merged PR titles, which is what most users actually want.

### Actions / workflow runs

```bash
gh run list --workflow ci.yml --limit 10
gh run view <run-id>
gh run view <run-id> --log-failed       # only failed step logs, not the whole run
gh run watch <run-id>                   # block and stream until it finishes
gh run rerun <run-id> --failed
gh run cancel <run-id>
gh workflow run deploy.yml --ref main -f environment=staging
gh workflow list
```

`--log-failed` instead of `--log` keeps output small when the user just wants to know why a run broke — full logs can be enormous and blow through context for no benefit.

### Repo administration

```bash
gh repo view --json description,visibility,defaultBranchRef
gh repo edit --description "..." --visibility private
gh repo clone owner/name
gh api repos/{owner}/{repo}/branches/main/protection   # inspect branch protection (no simple subcommand exists)
```

Branch protection, rulesets, and some collaborator settings don't have dedicated subcommands — fall back to `gh api` (see `references/cheatsheet.md`). These are classic shared-infrastructure changes: always confirm scope before applying.

## Keeping output manageable

`gh`'s default human-readable tables are fine for small lists, but for anything you'll parse or that could be long, ask for exactly the fields you need:

```bash
gh pr list --json number,title,author,isDraft --jq '.[] | select(.isDraft == false)'
gh issue list --json number,title,labels --limit 50
```

`--json` + `--jq` beats piping through generic text tools — it's structured, avoids truncation surprises, and you only pay context for the fields that matter.

## When `gh` doesn't have a subcommand

`gh api` reaches the full REST and GraphQL surface:

```bash
gh api repos/{owner}/{repo}/collaborators --jq '.[].login'
gh api graphql -f query='{ viewer { login } }'
```

`{owner}/{repo}` is filled in automatically from the current repo context, same as elsewhere in `gh`. See `references/cheatsheet.md` for paginated and POST/PATCH examples.
