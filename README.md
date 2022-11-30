# Shortener Service

## Requirements

This project requires the following to be run:
`docker`
`nodejs`

### How to run

Run the server
```
docker-compose up -d
```
Run database migrations
```
docker-compose exec -it server npm run migration:run
```
Stop the server
```
docker-compose down
```

Once the server is up and running, to access the website go to:

[http://localhost/](http://localhost/)
