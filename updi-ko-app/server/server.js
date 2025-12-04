import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors()); // allows React to call this server

app.get("/search", async (req, res) => {
  const q = req.query.q;

  // const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`;

  // const response = await fetch(url, {
  //   headers: {
  //     "User-Agent": "MyMapApp/1.0 (neyrocaraig@gmail.com)"
  //   }
  // });

  const response = await axios.get("https://nominatim.openstreetmap.org/search", {
  params: {
    q: `${q} Miagao`,
    format: "json",
    addressdetails: 1,
    bounded: 1,
    viewbox: "122.1000,10.7620,122.2000,10.6620", // Miagao bounding box
    countrycodes: "ph",
    limit: 5,
  },
  headers: {
    "User-Agent": "MyApp (neyrocaraig@gmail.com)",
  },
});

  const data = await response.json();
  res.json(data);
});

app.listen(4000, () => console.log("Proxy server running on port 4000"));
