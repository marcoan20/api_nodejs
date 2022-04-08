const axios = require('axios');
const express = require('express');
const { use } = require('express/lib/application');

const api = express();

api.use(express.json());

api.get('/:name' , async (req, res) => {
  const { name } = req.params;
  await axios.get(`https://api.github.com/users/${name}`).then(async function(data){
    await axios.get(`${data.data.repos_url}`).then(async function(data2){
      //res.json(data.data);
      console.log(data2)
      res.send(`
      <html>
      <style>
      body{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      </style>
        <body>
          <h1 style="color: blue">${data.data.name ? data.data.name : data.data.login}</h1>
          <img src=${data.data.avatar_url}/>
          <h3>${data.data.bio ? data.data.bio : ""}<h3>
          <p>First Repo: ${data2.data[0].name}</p>
        </body>
      </html>
      `);
    })
  }).catch((err) => console.log(err))
});

api.listen(3000, () => console.log("Server running"));