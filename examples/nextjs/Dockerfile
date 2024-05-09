#
# NB: This file is managed by Anora
#

FROM node:22-alpine AS base

#
# Dependencies
#

FROM base AS deps

RUN apk update
RUN apk add --no-cache libc6-compat supervisor openssh nginx

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

RUN \
echo cat >/etc/nginx/nginx.conf <<EOL \
worker_processes auto; # 1 per core \
worker_rlimit_nofile 8192; \
events { \
    worker_connections 4096; \
} \
http { \
    server_tokens off; \
    proxy_cache_path /var/lib/nginx/cache keys_zone=static_cache:100m; \
    server { \
        listen 3000; \
        root /app; \
        location / { \
            proxy_pass http://127.0.0.1:3001; \
            proxy_cache static_cache; \
            proxy_cache_methods GET HEAD; \
            proxy_cache_valid 200 301 302 308 309 404 1m; \
            proxy_cache_bypass $cookie___prerender_bypass $cookie___next_preview_data; \
            proxy_no_cache $cookie___prerender_bypass $cookie___next_preview_data; \
            add_header x-cache-status $upstream_cache_status; \
        } \
    } \
} \
EOL


#
# Build
#

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

#
# Runtime
#

FROM base AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT 3000

EXPOSE 3000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]

# CMD HOSTNAME="0.0.0.0" node server.js
