import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from "@mui/material";
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
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer >
        <Table size="small">
          <CustomTableHead onRequestSort={handleRequestSort} order={order} orderBy={orderBy}  daysNum={maxNumOfDays}/>
          <TableBody>
            {modifiedArr
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort(getComparator(order, orderBy))
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
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
