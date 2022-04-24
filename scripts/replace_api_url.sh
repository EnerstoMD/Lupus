#!/usr/bin/env sh

find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,PATAPI_BASE_URL,'"$PATAPI_URL"',g' {} +;
nginx -g "daemon off;"