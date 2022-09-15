import {fetchData} from "../api/api";
import {useEffect, useState} from "react";
import {Container, Skeleton} from "@mui/material";
import UserTable from "../component/Table";

export const App = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchData().then(data => setUsers(data));
  }, [])
  return (
    (users.length !== 0)
      ?
      <Container maxWidth={'xl'} sx={{my: 5}}>
        <UserTable data={users}/>
      </Container>
      :
      <Container maxWidth={'xl'} sx={{my: 5}}>
        <Skeleton variant="rectangular" width={"100%"} height={563}/>
      </Container>
  )
}

