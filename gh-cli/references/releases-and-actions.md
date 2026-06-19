# Releases and GitHub Actions

## Releases

### Create

```bash
gh release create v1.2.0 --repo owner/name --title "v1.2.0" --body-file - <<'EOF'
## What's changed
- feature A
- fix B
EOF
```

- `--target <branch-or-sha>` if not releasing from the default branch
- `--draft` to create without publishing, `--prerelease` to mark as pre-release
- Attach build artifacts by listing files after the tag:
  `gh release create v1.2.0 dist/app.zip dist/checksums.txt`
- `gh release upload v1.2.0 extra-file.tar.gz` adds assets to an existing release

### List / view

```bash
gh release list --repo owner/name
gh release view v1.2.0 --json tagName,body,assets,isDraft,isPrerelease
```

`gh release list` has no `--search`/ascending-sort option, and like every
other `list` subcommand it defaults to the 30 newest. If the task depends on
the *oldest* release or the *total count* (not just "show recent ones"), a
generous `--limit` can still undercount on a repo with hundreds of releases —
use `gh api repos/owner/name/releases --paginate --jq '.[-1].tag_name'` to
walk every page instead of guessing how high `--limit` needs to be.

### Edit / delete — confirm before delete

```bash
gh release edit v1.2.0 --notes-file - <<'EOF'
Updated notes.
EOF

gh release delete v1.2.0 --yes          # confirm with the user first, see SKILL.md
gh release delete v1.2.0 --cleanup-tag  # also deletes the underlying git tag
```

`--cleanup-tag` is the more destructive variant — it removes the tag, not
just the GitHub release entry. Say explicitly whether the tag itself will go
when asking for confirmation.

## GitHub Actions runs

### List / view

```bash
gh run list --repo owner/name --workflow ci.yml --limit 10
gh run view 1234567890 --log              # full log
gh run view 1234567890 --log-failed       # just the failing step(s) — usually what you want
```

### Watch / rerun / cancel

```bash
gh run watch 1234567890           # block until the run finishes, then show result
gh run rerun 1234567890           # rerun the whole run
gh run rerun 1234567890 --failed  # rerun only the failed jobs — cheaper, prefer this
gh run cancel 1234567890
```

### Download artifacts

```bash
gh run download 1234567890 --dir ./artifacts
```

## Workflows

```bash
gh workflow list --repo owner/name
gh workflow view ci.yml
gh workflow run ci.yml --ref my-branch -f environment=staging   # -f passes workflow_dispatch inputs
gh workflow enable ci.yml
gh workflow disable ci.yml    # confirm first — silences CI for everyone, see SKILL.md
```

`gh workflow run` only works for workflows that declare a `workflow_dispatch`
trigger — if it errors, check the workflow file for that trigger before
assuming the command syntax is wrong.
