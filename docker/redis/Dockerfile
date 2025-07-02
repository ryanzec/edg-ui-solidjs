FROM redis:7.4-alpine

USER redis

EXPOSE 6379
CMD ["redis-server"]

# make sure we clean up old data when usage become high
CMD ["redis-server", "--maxmemory-policy", "volatile-lru", "--maxmemory", "2gb"]
