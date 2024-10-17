import express from "express";
import axios from "axios";
import { Song, Post } from "../../models/index.js";

const router = express.Router();

const fetch_lyrics = async (title, artist) => {
console.log(title, artist);

  try {
    // Construct the Genius search API URL
    //const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(
    const searchUrl = `https://api.genius.com/search?q=${title}`;

    // Make the request to the Genius API to search for the song
    const response = await axios.get(searchUrl, {
      headers: {
        Authorization: `Bearer dp2QQdraYt2weVuB_cSakWOjc7lZkGRHkUuUascPhJxI_iEQZCuIvpaJ7yJR6_cw`,
      },
    });

    const hits = response.data.response.hits;
    console.log(hits[0].result.url);
    console.log(hits);

    if (hits && hits.length > 0) {
      return hits[0].result.url;
    } else {
      return null; // No hits found
    }
  } catch (error) {
    console.error("Error fetching lyrics from Genius:", error);
    return null;
  }
};

router.post('/lyrics', async (req, res) => {
    const { title, artist } = req.body;
    console.log(title, artist);
  const lyrics = await fetch_lyrics(title, artist);
  res.json({ lyrics });
});


router.post('/post', async (req, res) => {
    try{
      const song = await Song.create({...req.body, userId: req.user.id});
        const post = await Post.create({...req.body, userId: req.user.id, songId: song.id});
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'Server error'});
    }
  });


export default router;

// /api/reviews/history