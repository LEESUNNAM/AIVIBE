# Repo administration

## Create / clone / fork

```bash
gh repo create my-project --private --description "..." --clone
gh repo create my-org/my-project --public --source=. --push   # publish an existing local repo
gh repo clone owner/name
gh repo fork owner/name --clone
```

`--private`/`--public`/`--internal` is required on create — ask the user
which if they haven't said, rather than defaulting to public for something
that might contain credentials or unfinished work.

## View / edit settings

```bash
gh repo view owner/name --json description,visibility,defaultBranchRef
gh repo edit owner/name --description "new description" --default-branch main
gh repo edit owner/name --enable-issues=false --enable-wiki=false
```

## Delete / archive — confirm before delete

```bash
gh repo archive owner/name    # reversible (gh repo edit --visibility / unarchive in the UI)
gh repo delete owner/name --yes
```

`gh repo delete` is permanent and `gh` cannot undo it — this is the highest-
stakes command in this entire skill. Confirm the exact `owner/name`, not just
"yes delete it," since a wrong guess at the target repo is unrecoverable.
Prefer `gh repo archive` when the actual goal is "stop people from touching
this," not "make it disappear."

## Secrets and variables

```bash
gh secret list --repo owner/name
gh secret set MY_SECRET --repo owner/name --body "value"     # or: < file, or piped
gh secret delete MY_SECRET --repo owner/name                 # confirm first

gh variable set MY_VAR --repo owner/name --body "value"
gh variable list --repo owner/name
```

Never echo a secret's value back in chat once set — confirm the name was
set, not the contents. Piping from a file (`gh secret set NAME < secret.txt`)
avoids the value passing through shell history as a literal argument.

## Branch protection

`gh` has no dedicated subcommand for branch protection — go through the REST
API via `gh api`:

```bash
# View current protection
gh api repos/owner/name/branches/main/protection

# Require PR reviews + passing status checks before merge
gh api repos/owner/name/branches/main/protection -X PUT --input - <<'EOF'
{
  "required_status_checks": {"strict": true, "contexts": ["ci"]},
  "enforce_admins": true,
  "required_pull_request_reviews": {"required_approving_review_count": 1},
  "restrictions": null
}
EOF
```

Any `-X PUT`/`PATCH`/`DELETE` call through `gh api` is a mutating request —
it falls under the same confirm-first rule as the rest of the destructive
commands in SKILL.md, since it's easy to underestimate how much a single
JSON payload here changes.
