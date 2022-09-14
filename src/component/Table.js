import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from "@mui/material";
import {useState} from "react";
import {getMinutes, setTimeFormat} from "../utils";
import {get} from "lodash";

function descendingComparator(a, b, orderBy) {
  if (get(b, orderBy) < get(a, orderBy)) {
    return -1;
  }
  if (get(b, orderBy) > get(a, orderBy)) {
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
  const [orderBy, setOrderBy] = useState([]);
  const [tableData, setTableData] = useState([]);
  // console.log(order)
  // console.log(orderBy)


  const sortedDataByDaysCount = data.sort((a, b) => a.Days.length - b.Days.length);
  const maxNumOfDays = sortedDataByDaysCount[sortedDataByDaysCount.length - 1].Days.length;

  const modifiedArr = data.map(user => {
    const arr = [];
    for (let i = 0; i < maxNumOfDays; i++) {
      arr.push({socialTime: 0})
    }
    user.Days.forEach((day) => {
      const [, , today] = day.Date.split('-');
      const index = Number(today);
      arr[index - 1] = {Date: day.Date, socialTime: getMinutes(day.End) - getMinutes(day.Start)};
    })

    return {...user, Days: arr};
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
                      {day ? setTimeFormat(day.socialTime) : 0}
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
                active={orderBy === `Days[${[num - 1]}].socialTime`}
                direction={orderBy === `Days[${[num - 1]}].socialTime` ? order : 'asc'}
                onClick={createSortHandler(`Days[${[num - 1]}].socialTime`)}
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


// temp1[0].Days.reduce((acc, cur) => {
//   acc[cur.Date] = cur;
//   return acc
// }, {})
