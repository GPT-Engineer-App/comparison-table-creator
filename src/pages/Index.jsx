import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Index = () => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [newColumn, setNewColumn] = useState("");
  const [newRow, setNewRow] = useState("");

  const addColumn = () => {
    if (newColumn.trim() !== "") {
      setColumns([...columns, newColumn]);
      setNewColumn("");
    }
  };

  const addRow = () => {
    if (newRow.trim() !== "") {
      setRows([...rows, newRow]);
      setNewRow("");
    }
  };

  const toggleCell = (rowIndex, colIndex) => {
    const updatedRows = rows.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        const updatedRow = row.map((cell, cIndex) => {
          if (cIndex === colIndex) {
            return cell === "❌" ? "✅" : "❌";
          }
          return cell;
        });
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <Input
          value={newColumn}
          onChange={(e) => setNewColumn(e.target.value)}
          placeholder="New Column Header"
          className="mr-2"
        />
        <Button onClick={addColumn}>Add Column</Button>
      </div>
      <div className="mb-4">
        <Input
          value={newRow}
          onChange={(e) => setNewRow(e.target.value)}
          placeholder="New Row Header"
          className="mr-2"
        />
        <Button onClick={addRow}>Add Row</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            {columns.map((col, colIndex) => (
              <TableHead key={colIndex} className="vertical-text">
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>{row}</TableCell>
              {columns.map((col, colIndex) => (
                <TableCell
                  key={colIndex}
                  onClick={() => toggleCell(rowIndex, colIndex)}
                  className="cursor-pointer"
                >
                  {rows[rowIndex][colIndex] || "❌"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Index;