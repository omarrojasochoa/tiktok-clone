import React, { useState, useEffect, useReducer } from "react";
import { helpHttp } from "../helpers/helpHttp";
import { TYPES } from "../actions/crudActions";
import { crudInitialState, crudReducer } from "../reducers/crudReducers";

const Upload = () => {
  const username = "wjharil";
  const name = "Jharil Cerna";
  const avatar = "https://i.imgur.com/KYTJocv.jpeg";

  const [video, setVideo] = useState(null);
  const [caption, setCaption] = useState(null);
  const today = new Date();
  const timestamp = today.toISOString();

  let id = Date.now();

  const [state, dispatch] = useReducer(crudReducer, crudInitialState);
  const [error, setError] = useState(null);

  let api = helpHttp();
  let url = "http://localhost:5000/users";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id: id,
      name: name,
      username: username,
      avatar: avatar,
      is_followed: false,
      video: video,
      caption: caption,
      likes: 10,
      comments: 32,
      timestamp: timestamp,
      button_visible: true,
    };

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    //Sube la nueva data a la base de datos.
    api.post(url, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        dispatch({ type: TYPES.CREATE_DATA, payload: data });
      } else {
        setError(res);
      }
    });
  };

  const handleReset = (e) => {
    document.querySelector("#caption").value = "";
    document.querySelector("#video").value = "";
  };

  return (
    <div className="upload-page">
      <br />
      <h1>Upload video</h1>
      <h2>Proyecto realizado por @{username}</h2>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="section">
            <div className="image-upload"></div>
            <div className="form-section">
              <div className="section input-section">
                <label className="bold">Caption</label>
                <input
                  id="caption"
                  className="input"
                  name="caption"
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
              <div className="break"></div>
              <div className="section input-section">
                <label className="bold">Video Url</label>
                <input
                  id="video"
                  className="input"
                  name="video"
                  onChange={(e) => setVideo(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button onClick={handleReset}>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Upload;

/* import React, { useState } from "react";
import axios from "axios";
import faker from "faker";

const Upload = () => {
  const username = "aniak100";
  const name = "Ania Kubow";
  const avatar = "https://i.imgur.com/QwZod6m.png";
  const [video, setVideo] = useState(null);
  const [caption, setCaption] = useState(null);
  const today = new Date();
  const timestamp = today.toISOString();

  let id = faker.random.uuid();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id: id,
      name: name,
      username: username,
      avatar: avatar,
      is_followed: false,
      video: video,
      caption: caption,
      likes: 0,
      comments: 0,
      timestamp: timestamp,
      button_visible: false,
    };

    axios
      .post("/.netlify/functions/add", data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="upload-page">
      <br />
      <h1>Upload video</h1>
      <p>This video will be published to @{username}</p>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="section">
            <div className="image-upload"></div>
            <div className="form-section">
              <div className="section input-section">
                <label className="bold">Caption</label>
                <input
                  className="input"
                  name="caption"
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
              <div className="break"></div>
              <div className="section input-section">
                <label className="bold">Video Url</label>
                <input
                  className="input"
                  name="video"
                  onChange={(e) => setVideo(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button>Post</button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
 */
