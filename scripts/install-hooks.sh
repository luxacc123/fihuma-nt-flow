#!/bin/sh
# Installs git hooks for this project.
# Run once after cloning: sh scripts/install-hooks.sh

HOOK=".git/hooks/pre-push"

cat > "$HOOK" << 'HOOKEOF'
#!/bin/sh
# Pre-push hook: runs typecheck + lint + build before pushing.
# To skip (emergency): git push --no-verify

echo "Running pre-push checks..."

npm run check
if [ $? -ne 0 ]; then
  echo ""
  echo "Pre-push checks failed. Fix errors before pushing."
  echo "To skip: git push --no-verify"
  exit 1
fi

echo "Pre-push checks passed."
HOOKEOF

chmod +x "$HOOK"
echo "Pre-push hook installed."
