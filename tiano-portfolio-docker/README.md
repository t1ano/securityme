# Tiano Portfolio Docker

Static portfolio split from one HTML file into separate HTML, CSS, and JS files.

## Run locally

```bash
docker compose up -d --build
```

Open: http://localhost:8080

## Deploy via Portainer

1. Upload this folder to your server or Git repository.
2. In Portainer, create a new Stack.
3. Paste the `docker-compose.yml` content or point Portainer to your Git repo.
4. Deploy the stack.
5. Access it through `http://SERVER-IP:8080`.

To change the public port, edit this line in `docker-compose.yml`:

```yaml
- "8080:80"
```
