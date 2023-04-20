const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const code = req.body.code;
console.log({code});
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "a50ce8f9b6d2475a81bd4b79e0fdd267",
    clientSecret: "f96d55bc48a3442c8c4a46f7c9e7423c",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.listen(5000, () => console.log("Server is listening on port 5000..."));
