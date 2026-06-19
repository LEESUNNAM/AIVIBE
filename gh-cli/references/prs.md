# Pull requests

## Create

```bash
gh pr create --repo owner/name --title "Title" --base main --head my-branch \
  --body-file - <<'EOF'
## Summary
- point one
- point two

## Test plan
- [ ] step one
EOF
```

- Omit `--head` when running from the branch you want to open the PR from —
  `gh` infers it from the current checkout.
- `--draft` for a draft PR, `--reviewer user1,user2` to request review,
  `--label`/`--milestone`/`--project` same as issues.
- If the repo has `.github/pull_request_template.md`, match its sections
  instead of inventing a different structure.

## List

```bash
gh pr list --repo owner/name --state open --json number,title,author,statusCheckRollup
```

`--search "is:open review:required"` for GitHub search qualifiers beyond the
basic `--state`/`--author`/`--label` filters.

## View, diff, files

```bash
gh pr view 456 --repo owner/name --json title,body,state,reviews,statusCheckRollup
gh pr diff 456                     # the actual code diff
gh pr view 456 --comments          # rendered view with discussion
```

## Checks (CI status)

```bash
gh pr checks 456 --repo owner/name
gh pr checks 456 --watch            # block until checks finish, then report
```

`--watch` is genuinely useful when the user asks "did CI pass yet" and is
willing to wait — otherwise just report the current snapshot.

## Review

```bash
gh pr review 456 --approve --body-file - <<'EOF'
LGTM, one nit inline.
EOF

gh pr review 456 --request-changes --body-file - <<'EOF'
Blocking comment here.
EOF
```

`--comment` posts a non-blocking review comment without approving or
requesting changes.

## Merge — confirm first

```bash
gh pr merge 456 --squash --delete-branch
```

This is in the SKILL.md safety list for a reason: it changes the target
branch and is visible to every collaborator. State the merge strategy
(`--squash`/`--merge`/`--rebase`) and whether the branch will be deleted,
then wait for a yes before running it — don't infer consent from "merge this"
being phrased as a command if the PR has unresolved review comments or
failing checks, since that's usually a sign the user hasn't seen the current
state.

## Draft / ready

```bash
gh pr ready 456          # mark a draft as ready for review
gh pr create --draft     # open as draft from the start
```

## Checkout locally

```bash
gh pr checkout 456
```

Fetches the PR's branch and switches to it — useful when the user wants to
run or debug someone else's PR locally.
