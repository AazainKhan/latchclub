#!/usr/bin/env bash
# Deploy latchclub.ca website by fast-forwarding origin/main from
# the current branch. Vercel's git webhook handles the actual deploy.
set -euo pipefail

CURRENT=$(git branch --show-current)
EXPECTED="latchclub.ca-website"

if [ "$CURRENT" != "$EXPECTED" ]; then
  echo "✗ Must be on '$EXPECTED' branch (currently on '$CURRENT')."
  echo "  git checkout $EXPECTED"
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "✗ Uncommitted changes — commit or stash before deploying."
  git status --short
  exit 1
fi

echo "→ Fetching latest from origin..."
git fetch origin

if ! git merge-base --is-ancestor origin/main HEAD; then
  echo "✗ 'main' has commits not in '$EXPECTED'."
  echo "  Run: git merge origin/main"
  exit 1
fi

if git merge-base --is-ancestor HEAD origin/main; then
  echo "✓ Nothing to deploy — origin/main is already at HEAD."
  exit 0
fi

echo "→ Pushing $EXPECTED to origin..."
git push origin "$EXPECTED"

echo "→ Fast-forwarding origin/main to $EXPECTED..."
git push origin "HEAD:main"

echo ""
echo "✓ Pushed to main. Vercel webhook will deploy from apps/website/."
echo "  Watch: https://vercel.com/aazain-khans-projects/latchclub-website/deployments"
