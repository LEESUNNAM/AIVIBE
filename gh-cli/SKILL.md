---
name: gh-cli
description: Operate GitHub through the `gh` CLI — issues, pull requests, releases, GitHub Actions workflows/runs, and repo administration (create/clone/settings/secrets/branch protection). Use this whenever the user wants to create, list, view, edit, comment on, label, or close a GitHub issue or PR; check PR/CI status, read a diff, review, or merge a PR; cut, edit, or delete a release; trigger, watch, rerun, or cancel a GitHub Actions workflow run; or manage repo settings, secrets, or branch protection. Trigger even on vague or Korean phrasing like "이슈 만들어줘", "PR 상태 확인해줘", "릴리즈 올려줘", "워크플로우 다시 돌려줘", a pasted github.com URL, or a bare mention of "gh"/"깃헙"/"깃허브" — the user rarely names the exact subcommand. Consult this before improvising a `gh api` call or guessing flag syntax for an unfamiliar gh subcommand.
---

# GitHub operations via `gh`

`gh` is the GitHub CLI — it's already the preferred tool for GitHub work in this
environment (see the top-level git/PR guidance). This skill goes deeper: the
full command surface across issues, PRs, releases, Actions, and repo admin,
plus the judgment calls that command references don't cover (when to ask
before running something, how to target the right repo, how to keep output
parseable).

If a `gh` command fails with an auth error, run `gh auth status` first rather
than guessing — don't attempt `gh auth login` interactively, it requires a
browser/device flow the user has to drive themselves.

## Find the right command

Pick the reference file that matches the task — each is a command cheat sheet
with the flags and patterns that actually matter, not a copy of `gh help`:

- **[references/issues.md](references/issues.md)** — create, list, view, edit, comment, label, close/reopen, search
- **[references/prs.md](references/prs.md)** — create, list, view/diff, checks, review, merge, draft/ready, checkout
- **[references/releases-and-actions.md](references/releases-and-actions.md)** — releases (create/edit/delete/upload) and Actions (run/workflow list/view/watch/rerun/cancel)
- **[references/repo-admin.md](references/repo-admin.md)** — repo create/clone/fork/delete, secrets, variables, branch protection

## The safety rule: ask before anything hard to undo

`gh` will happily execute the command you give it — it won't double-check
that a merge, a deletion, or a force-push is what the user actually meant.
Before running any of the following, state in plain language exactly what
will happen and wait for explicit confirmation, even if the current
permission mode would otherwise auto-allow the underlying `Bash` call:

- `gh repo delete`, `gh issue delete`, `gh release delete`
- `gh pr merge` (any strategy), `gh pr close` (especially with `--delete-branch`)
- `gh secret delete`, `gh variable delete`
- `gh workflow disable` (changes CI behavior for everyone, not just the caller)
- `gh api` with `-X DELETE`/`PATCH`/`PUT`, or any other mutating raw API call
- anything that deletes a branch or force-pushes

These either destroy data that `gh` can't bring back, or change shared state
that other collaborators will see — the same bar the rest of this
environment already holds destructive/visible actions to. A prior
`git push --force` or "yes, delete that" earlier in the conversation doesn't
carry over to a *different* destructive command later — ask again for each
one. Read-only and additive commands (`list`, `view`, `status`, `checks`,
`diff`, `create`, `comment`, `label add`) don't need this — they're either
non-destructive or trivially reversible.

## Universal conventions

**Target the right repo explicitly.** `gh` infers the repo from the current
directory's git remote, which is wrong the moment the user asks about a repo
they haven't cloned, or the cwd happens to be a different project. Pass
`--repo owner/name` (or `-R owner/name`) whenever the target isn't obviously
the cwd's repo — don't rely on inference and then act on the wrong project.

**Don't trust the default page for anything but "most recent N."** Every
`list` subcommand (`issue list`, `pr list`, `release list`, `run list`, ...)
defaults to fetching only 30 items, newest first. That's fine for "show me
the last 5" but silently wrong for "the oldest", "all of them", or a total
count — you'll confidently report the 30th-newest item as if it were the
oldest. For issues/PRs, prefer an ascending search qualifier
(`--search "is:open sort:created-asc"`) over paging through everything. For
subcommands without search support (releases, runs), pass a `--limit` large
enough to cover the repo's actual total, or fall back to `gh api ... --paginate`
which fetches every page rather than capping at one.

**Prefer structured output over scraping text.** Most `list`/`view`
subcommands support `--json <fields>`, and you can chain `--jq '<expr>'` to
filter/reshape inline. Use it whenever the result feeds into further
reasoning or another command — it's faster and won't break on a title that
happens to contain a pipe character. Example:
`gh pr list --json number,title,statusCheckRollup --jq '.[] | select(.statusCheckRollup != null)'`

**Multi-line bodies go through a file or heredoc, never inline.** Issue
bodies, PR descriptions, and release notes routinely contain blank lines,
quotes, and markdown — passing them as an inline `--body "..."` string is
how quoting breaks. Use `--body-file -` with a heredoc, matching the same
pattern this environment already uses for commit messages:

```bash
gh issue create --title "Title here" --body-file - <<'EOF'
## Summary
Multi-line body goes here, with whatever quotes or markdown it needs.
EOF
```

**Check for existing conventions before creating something new.** A repo
often has issue templates (`.github/ISSUE_TEMPLATE/`), label conventions, or
a PR template (`.github/pull_request_template.md`). Skim for these before
creating an issue/PR from scratch so the new one matches what's already
there, and search for likely duplicates (`gh issue list --search "..."`)
before filing.

**Don't open a browser unprompted.** `--web` flags (`gh pr view --web`,
`gh repo view --web`) open the user's browser. Only use them if the user
asked to *view* something themselves — not as a default way to fetch data
you could get from the JSON output instead.
