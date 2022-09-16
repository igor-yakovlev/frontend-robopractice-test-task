import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import UserTable from "./Table";

const data = [
  {
    id: 188,
    Fullname: "Adolph Torphy",
    Days: [{Date: "2021-05-01", End: "19-38", Start: "14-44"}, {
      Date: "2021-05-02",
      End: "12-11",
      Start: "11-14"
    }, {
      Date: "2021-05-02",
      End: "12-11",
      Start: "11-14"
    }, {
      Date: "2021-05-02",
      End: "12-11",
      Start: "11-14"
    }]
  },
  {
    id: 189,
    Fullname: "Adolph Torph",
    Days: [{Date: "2021-05-01", End: "19-38", Start: "14-44"}, {
      Date: "2021-05-02",
      End: "12-11",
      Start: "11-14"
    }, {
      Date: "2021-05-02",
      End: "12-11",
      Start: "11-14"
    }, {
      Date: "2021-05-02",
      End: "12-11",
      Start: "11-14"
    }]
  }]
describe('Table', () => {
  it('render table component', () => {
    render(<UserTable data={data}/>);
    expect(screen.getByText(/User/i)).toBeInTheDocument();
    expect(screen.getByText(/Adolph Torphy/i)).toBeInTheDocument();
    expect(screen.getByText(/Monthly total/i)).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
})
