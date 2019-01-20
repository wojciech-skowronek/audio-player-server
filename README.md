# audio-player-server

This is the server of Audio Player project. It's just demo app to demonstrate my NodeJS skills.

### Setup

To simplify the setup I'm using the Docker. To startup the server for development purposes simply call those commands:

```
git clone git@github.com:wojciech-skowronek/audio-player-server.git
cd audio-player-server
docker-compose up -d
docker exec -it audio-player-server npm i
```

The server runs by default on port 8080 and can be reached from host machine on http://localhost:8080/

The debugger is listening by default on port 9229 and you can use e.g. Chrome DevTools to connect.

### The API:

At the moment there is just one REST endpoint:
```
GET /tracks
```

and it return list of tracks in following format:

```
{
  "tracks": [
    {
      "title": "Don't Stop Me Now",
      "duration": "3:30",
      "genre": "Rock",
      "artist": "Queen",
      "album": "Jazz",
      "albumCoverUrl": "http://s3.amazonaws.com/bucket/dummy.png",
      "fileUrl": "http://s3.amazonaws.com/bucket/dummy.mp3"
    },

    ...
  ]
}
```

In `audio-player.postman_collection.json` file you will find the Postman collection to play with the API

Beside REST API the server accepts websockets connection to handle the playlog feature.

### Playlog

The playlog feature will display log of played songs by all clients connected to the server.

### TODO:
* Write some tests.
* Add pagination to endpoints.
* Push music files to CDN and update the data file.

