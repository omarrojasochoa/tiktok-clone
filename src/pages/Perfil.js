/* import CrudApi from "../components/CrudApi.jsx"; */
import React, { useState, useEffect, useReducer } from "react";
import { TYPES } from "../actions/crudActions";
import { helpHttp } from "../helpers/helpHttp";
import { crudInitialState, crudReducer } from "../reducers/crudReducers";
import FollowersColumn from "../components/FollowersColumn.js";
import axios from "axios";
import Card from "../components/Card.js";
import MiniCard from "../components/MiniCard.js";

const Perfil = () => {
  // const [db, setDb] = useState(null);
  const [state, dispatch] = useReducer(crudReducer, crudInitialState);
  const { db } = state;

  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  /*  */
  const [users, setUsers] = useState(null);
  const [userToToggle, setUserToToggle] = useState(null);
  let descendingUsers;
  let topFiveNotFollowing;
  let topFiveFollowing;
  /*  */

  let api = helpHttp();
  let url = "http://localhost:5000/users";

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        //console.log(res);
        if (!res.err) {
          //setDb(res);
          dispatch({ type: TYPES.READ_ALL_DATA, payload: res });
          setError(null);
        } else {
          //setDb(null);
          dispatch({ type: TYPES.NO_DATA });
          setError(res);
        }
        setLoading(false);
      });
  }, [url]);

  const createData = (data) => {
    //console.log(data);
    data.id = Date.now();
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        //setDb([...db, res]);
        dispatch({ type: TYPES.CREATE_DATA, payload: res });
      } else {
        setError(res);
      }
    });
    //setDb([...db, data]);
  };

  //busca (fetch) todas las publicaciones al feed
  const fetchData = async () => {
    const results = await axios.get(url);
    console.log(results.data);
    setUsers(results.data);
  };

  //Alterna usuario de SEGUIR a NO SEGUIR
  if (userToToggle) {
    const newValue = userToToggle.is_followed ? false : true;
    const data = {
      ...userToToggle,
      is_followed: newValue,
    };

    let endpoint = `${url}/${userToToggle.id}`;
    //console.log(endpoint);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        dispatch({ type: TYPES.UPDATE_DATA, payload: data });
        //setDb(newData);
        fetchData();
      } else {
        setError(res);
      }
    });
    setUserToToggle(null);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (db) {
    descendingUsers = db.sort((a, b) => (a.id < b.id ? 1 : -1));
    const following = db.filter((user) => user.is_followed === true);
    const descendingFollowing = following.sort((a, b) =>
      a.likes < b.likes ? 1 : -1
    );

    topFiveFollowing = descendingFollowing.slice(0, 5);

    const notFollowing = db.filter((user) => user.is_followed === false);
    const descendingNotFollowing = notFollowing.sort((a, b) =>
      a.likes < b.likes ? 1 : -1
    );
    topFiveNotFollowing = descendingNotFollowing.slice(0, 5);
  }
  return (
    <>
      {descendingUsers && (
        <div className="container-tktk">
          <FollowersColumn users={topFiveFollowing} />
          <div className="feed">
            {descendingUsers.map((descendingUser, index) => (
              <Card
                key={index}
                user={descendingUser}
                toggleFollow={(userToToggle) => setUserToToggle(userToToggle)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Perfil;
