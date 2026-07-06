#!/bin/bash
set -e

# ═══════════════════════════════════════════════════════════
#  CIA STORE — One-Click Cloudflare Deployment
# ═══════════════════════════════════════════════════════════
#  This script automates the entire deployment process:
#    1. Installs dependencies
#    2. Sets up Cloudflare resources (D1, R2, KV)
#    3. Runs database migrations + seeds
#    4. Builds the Next.js app
#    5. Deploys to Cloudflare Pages
# ═══════════════════════════════════════════════════════════

echo ""
echo "  ██████╗██╗ █████╗     ███████╗████████╗ ██████╗ ██████╗ ███████╗"
echo " ██╔════╝██║██╔══██╗    ██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗██╔════╝"
echo " ██║     ██║███████║    ███████╗   ██║   ██║   ██║██████╔╝█████╗  "
echo " ██║     ██║██╔══██║    ╚════██║   ██║   ██║   ██║██╔══██╗██╔══╝  "
echo " ╚██████╗██║██║  ██║    ███████║   ██║   ╚██████╔╝██║  ██║███████╗"
echo "  ╚═════╝╚═╝╚═╝  ╚═╝    ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝"
echo ""
echo "  ⚡ PREMIUM GAMING DIGITAL GOODS"
echo "  ═══════════════════════════════"
echo ""

# ─── Configuration ─────────────────────────────────────

PROJECT_NAME="cia-store"
CLOUDFLARE_PAGES_PROJECT="$PROJECT_NAME"
D1_DATABASE_NAME="$PROJECT_NAME-db"
R2_BUCKET_NAME="$PROJECT_NAME-images"
KV_NAMESPACE_NAME="$PROJECT_NAME-kv"

# ─── Colors ────────────────────────────────────────────

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

info()  { echo -e "${BLUE}ℹ${NC} $1"; }
ok()    { echo -e "${GREEN}✓${NC} $1"; }
warn()  { echo -e "${YELLOW}⚠${NC} $1"; }
error() { echo -e "${RED}✗${NC} $1"; }
step()  { echo -e "\n${CYAN}▸ $1${NC}"; }

# ─── Prerequisites Check ───────────────────────────────

step "Checking prerequisites..."

command -v node >/dev/null 2>&1 || { error "Node.js is required. Install it first."; exit 1; }
command -v npm >/dev/null 2>&1 || { error "npm is required."; exit 1; }
command -v npx >/dev/null 2>&1 || { error "npx is required."; exit 1; }

ok "Node.js $(node -v) found"
ok "npm $(npm -v) found"

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    warn "Wrangler CLI not found. Installing globally..."
    npm install -g wrangler
    ok "Wrangler CLI installed"
else
    ok "Wrangler CLI $(wrangler --version) found"
fi

# ─── Cloudflare Authentication ─────────────────────────

step "Cloudflare Authentication..."

if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    if [ -f .env ]; then
        source .env 2>/dev/null || true
    fi
fi

if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    warn "CLOUDFLARE_API_TOKEN not set."
    echo "    You can set it as an environment variable or create a .env file."
    echo "    For now, we'll use wrangler login..."
    npx wrangler login
fi

ok "Cloudflare authenticated"

# ─── Create D1 Database ────────────────────────────────

step "Setting up D1 Database..."

DB_EXISTS=$(npx wrangler d1 list 2>/dev/null | grep "$D1_DATABASE_NAME" || true)

if [ -z "$DB_EXISTS" ]; then
    info "Creating D1 database: $D1_DATABASE_NAME..."
    npx wrangler d1 create "$D1_DATABASE_NAME"
    ok "D1 database created"
else
    ok "D1 database already exists"
fi

# Get database ID
DB_ID=$(npx wrangler d1 list 2>/dev/null | grep "$D1_DATABASE_NAME" | awk '{print $1}')
if [ -n "$DB_ID" ]; then
    info "Database ID: $DB_ID"
fi

# ─── Create R2 Bucket ──────────────────────────────────

step "Setting up R2 Bucket..."

BUCKET_EXISTS=$(npx wrangler r2 bucket list 2>/dev/null | grep "$R2_BUCKET_NAME" || true)

if [ -z "$BUCKET_EXISTS" ]; then
    info "Creating R2 bucket: $R2_BUCKET_NAME..."
    npx wrangler r2 bucket create "$R2_BUCKET_NAME"
    ok "R2 bucket created"
else
    ok "R2 bucket already exists"
fi

# ─── Create KV Namespace ───────────────────────────────

step "Setting up KV Namespace..."

KV_EXISTS=$(npx wrangler kv namespace list 2>/dev/null | grep "$KV_NAMESPACE_NAME" || true)

if [ -z "$KV_EXISTS" ]; then
    info "Creating KV namespace: $KV_NAMESPACE_NAME..."
    npx wrangler kv namespace create "$KV_NAMESPACE_NAME"
    ok "KV namespace created"
else
    ok "KV namespace already exists"
fi

# ─── Install Dependencies ──────────────────────────────

step "Installing dependencies..."

npm install
ok "Dependencies installed"

# ─── Run Database Migrations ───────────────────────────

step "Running database migrations..."

if [ -f drizzle.config.ts ]; then
    npx drizzle-kit push 2>/dev/null && ok "Migrations applied" || warn "Migration skipped (D1 binding needed at runtime)"
else
    warn "No drizzle config found"
fi

# ─── Seed Database ─────────────────────────────────────

step "Seeding database..."

if [ -f src/scripts/seed.ts ]; then
    npx tsx src/scripts/seed.ts && ok "Database seeded" || warn "Seeding skipped"
else
    info "No seed script found. Using static data."
fi

# ─── Build ─────────────────────────────────────────────

step "Building project for Cloudflare Pages..."

npm run build
ok "Project built successfully"

# ─── Deploy to Cloudflare Pages ────────────────────────

step "Deploying to Cloudflare Pages..."

PAGES_EXISTS=$(npx wrangler pages project list 2>/dev/null | grep "$CLOUDFLARE_PAGES_PROJECT" || true)

if [ -z "$PAGES_EXISTS" ]; then
    info "Creating Cloudflare Pages project: $CLOUDFLARE_PAGES_PROJECT..."
    npx wrangler pages project create "$CLOUDFLARE_PAGES_PROJECT" --production-branch main
    ok "Pages project created"
fi

info "Deploying..."
npx wrangler pages deploy .vercel/output/static --project-name "$CLOUDFLARE_PAGES_PROJECT"
ok "Deployed to Cloudflare Pages!"

# ─── Done ──────────────────────────────────────────────

echo ""
echo "  ═══════════════════════════════════════════════════════"
echo "  ${GREEN}✅ DEPLOYMENT COMPLETE${NC}"
echo "  ═══════════════════════════════════════════════════════"
echo ""
echo "  🌐 https://$CLOUDFLARE_PAGES_PROJECT.pages.dev"
echo "  🗄️  D1 Database:  $D1_DATABASE_NAME"
echo "  📦 R2 Bucket:     $R2_BUCKET_NAME"
echo "  🔑 KV Namespace:  $KV_NAMESPACE_NAME"
echo ""
echo "  Next steps:"
echo "    1. Set up custom domain in Cloudflare Dashboard"
echo "    2. Add your environment variables (AUTH_SECRET, STRIPE keys, etc.)"
echo "    3. Configure your D1 database ID in wrangler.toml"
echo ""
