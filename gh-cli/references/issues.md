# Issues

## Create

```bash
gh issue create --repo owner/name --title "Title" --body-file - <<'EOF'
Body text, markdown ok.
EOF
```

Useful flags: `--label bug,priority-high`, `--assignee @me` (or a username),
`--milestone "v2.0"`, `--project "Roadmap"`. Add `--web` only if the user
wants to finish composing it in the browser themselves.

## List

```bash
gh issue list --repo owner/name --state open --limit 20 \
  --json number,title,labels,assignees,url
```

- `--state open|closed|all` (default `open`)
- `--label X --label Y` narrows to issues with *all* given labels
- `--assignee @me` / `--author someone` filters by person
- `--search "is:open sort:updated-desc <text>"` for full-text / GitHub search
  qualifiers when the simple filters above aren't enough

## View

```bash
gh issue view 123 --repo owner/name --comments
```

`--json` works here too if you need fields rather than the rendered view, e.g.
`--json title,body,state,comments`.

## Edit

```bash
gh issue edit 123 --add-label needs-repro --remove-label triage \
  --add-assignee someone --milestone "v2.0"
```

`--title`/`--body` replace those fields outright — for body edits, prefer
`--body-file -` with a heredoc over `--body` for anything beyond a one-liner.

## Comment

```bash
gh issue comment 123 --body-file - <<'EOF'
Comment text.
EOF
```

## Close / reopen

```bash
gh issue close 123 --reason completed   # or: --reason "not planned"
gh issue reopen 123
```

Closing is reversible (`reopen` undoes it) so it doesn't need the
confirm-first treatment the SKILL.md safety section calls out — unless the
user's phrasing suggests they're not sure yet ("should we close this?"),
in which case answer the question rather than just acting.

## Cross-repo search

```bash
gh search issues "<query>" --owner some-org --state open
```

Use this instead of guessing a repo when the user describes an issue but
doesn't say which repo it's in.
