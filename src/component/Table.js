import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from "@mui/material";
import {useState} from "react";
import {getMinutes} from "../utils";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


const UserTable = ({data}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [tableData, setTableData] = useState([]);
  console.log(order)
  console.log(orderBy)


  const sortedDataByDaysCount = data.sort((a, b) => a.Days.length - b.Days.length);
  const maxNumOfDays = sortedDataByDaysCount[sortedDataByDaysCount.length - 1].Days.length;

  const modifiedArr = data.map(user => {
    const arr = [];
    if (user.Days.length < maxNumOfDays) {
      const pushCount = maxNumOfDays - user.Days.length;
      for (let i = pushCount; i > 0; i--) {
        arr.push(null)
      }
    }
    const modifiedDaysArr = user.Days.map(day => {
      return {Date: day.Date , socTime: `${Math.floor((getMinutes(day.End) - getMinutes(day.Start)) / 60)}:${(getMinutes(day.End) - getMinutes(day.Start)) % 60}`}
    })
    return {...user, Days: [...modifiedDaysArr, ...arr]};
  })

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <CustomTableHead onRequestSort={handleRequestSort} order={order} orderBy={orderBy}  daysNum={maxNumOfDays}/>
        <TableBody>
          {modifiedArr.sort(getComparator(order, orderBy))
            .map(user => {
            return (
              <TableRow key={user.id}>
                <TableCell>
                  {user.Fullname}
                </TableCell>
                {user.Days.map((day, index) => {
                  return (
                    <TableCell key={index}>
                      {day ? day.socTime : 0}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserTable;

const CustomTableHead = ({daysNum, order, orderBy, onRequestSort}) => {
  const cellArr = []
  for (let i = 1; i <= daysNum; i++) {
    cellArr.push(i)
  }

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <TableSortLabel
            active={orderBy === 'Fullname'}
            key={'Fullname'}
            direction={orderBy === 'Fullname' ? order : 'asc'}
            onClick={createSortHandler('Fullname')}
          >
            User
          </TableSortLabel>
        </TableCell>
        {cellArr.map((num) => {
          return (
            <TableCell
              key={num}
              sortDirection={orderBy === num ? order : false}
            >
              <TableSortLabel
                active={orderBy === num}
                direction={orderBy === num ? order : 'asc'}
                onClick={createSortHandler(num)}
              >
                {num}
              </TableSortLabel>
            </TableCell>
          )
        })}

      </TableRow>
    </TableHead>
  )
}
