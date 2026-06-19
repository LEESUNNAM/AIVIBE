# gh CLI cheatsheet — long tail

Reach for this file when the task needs something past the core cookbook in SKILL.md: secrets, variables, rulesets, gists, or raw `gh api` calls. All mutating commands here follow the same rule as the main skill: confirm with the user before running them unless their request was already the explicit authorization for that exact action.

## Secrets and variables

```bash
gh secret list
gh secret set MY_SECRET --body "value"          # prompts are avoided by passing --body
gh secret set MY_SECRET < ./secret.txt           # or pipe from a file/stdin
gh secret delete MY_SECRET

gh variable list
gh variable set MY_VAR --body "value"
gh variable delete MY_VAR
```

Setting/deleting a secret is irreversible-feeling (no diff, no undo) and affects every workflow run after it — always confirm the exact name and target (repo vs. org vs. environment) before running.

## Branch protection and rulesets

No dedicated subcommand exists for classic branch protection; use `gh api`:

```bash
# Inspect
gh api repos/{owner}/{repo}/branches/main/protection

# Update (PUT replaces the whole protection config — fetch first, then merge fields)
gh api repos/{owner}/{repo}/branches/main/protection \
  -X PUT \
  -f required_status_checks[strict]=true \
  -f enforce_admins=true
```

Newer repos often use rulesets instead, which do have a subcommand:

```bash
gh ruleset list
gh ruleset view <id>
gh ruleset check main                 # which rulesets apply to a branch
```

## Collaborators and teams

```bash
gh api repos/{owner}/{repo}/collaborators --jq '.[].login'
gh api repos/{owner}/{repo}/collaborators/{username} -X PUT -f permission=push
gh api repos/{owner}/{repo}/collaborators/{username} -X DELETE
```

Adding/removing a collaborator changes who can push or see a private repo — always confirm.

## Gists

```bash
gh gist list
gh gist view <id>
gh gist create ./file.txt --public=false
gh gist edit <id> -a ./file.txt
```

## Pagination with `gh api`

`gh api` follows pagination automatically when you add `--paginate`:

```bash
gh api repos/{owner}/{repo}/issues --paginate --jq '.[].title'
```

Without `--paginate` you only get the first page (30 items by default).

## GraphQL

Use GraphQL when you need fields REST doesn't expose cheaply (e.g. PR review threads, project board fields):

```bash
gh api graphql -f query='
  query($owner: String!, $repo: String!, $number: Int!) {
    repository(owner: $owner, name: $repo) {
      pullRequest(number: $number) {
        reviewThreads(first: 50) {
          nodes { isResolved comments(first: 1) { nodes { body } } }
        }
      }
    }
  }' -F owner={owner} -F repo={repo} -F number=123
```

## Search across GitHub (not just the current repo)

```bash
gh search issues "is:open label:bug" --owner my-org --limit 30
gh search prs "review-requested:@me" --limit 30
gh search repos "topic:cli stars:>100"
```

Useful when the user's request spans repos rather than the one in the current directory.
