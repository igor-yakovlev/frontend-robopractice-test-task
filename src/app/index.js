import {fetchData} from "../api/api";
import {useEffect, useState} from "react";
import {Container} from "@mui/material";
import UserTable from "../component/Table";

export const App = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchData().then(data => setUsers(data));
    }, [])
    if (users.length === 0) return <p>Loading...</p>
    return (
      <>
          <h1>Hello</h1>
        <Container maxWidth={'xl'}>
            <UserTable data={users}/>
        </Container>
      </>
    )
}

