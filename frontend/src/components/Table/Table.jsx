import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DatePicker from 'react-datepicker';
import './Table.css'

const Table = ({
    data,
    title,
    invoice,
    columns,
    onAdd,
    btnName,
    onEdit,
    onDelete,
    showSearch = true,
    showButton = true,
    showActions = true,
    showEdit = true,
    showDelete = true,
    showRow = true,
    showPDF = true,
    showDate = true,
}) => {
    const [tableData, setTableData] = useState(data);
    const [tableColumns, setTableColumns] = useState(columns);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        setTableData(data);
    }, [data]);

    useEffect(() => {
        setTableColumns(columns);
    }, [columns]);

    const filteredData = tableData.filter((tableDatum) => {
        const query = searchQuery.toLowerCase();
        const isWithinDateRange = (!startDate && !endDate) || (new Date(tableDatum[1]) >= new Date(startDate) && new Date(tableDatum[1]) <= new Date(endDate));
        return isWithinDateRange && tableDatum.some((item) => {
            return item != null && item.toString().toLowerCase().includes(query);
        });
    });

    const currentItems = itemsPerPage === -1
        ? filteredData
        : filteredData.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );

        const generatePDF = () => {
            const doc = new jsPDF();
            doc.text(title, 20, 20);
        
            const headers = columns.map(column => ({ content: column, styles: { halign: 'center' } }));
            const tableData = filteredData.map(row => row.map(cell => ({ content: cell, styles: { halign: 'center' } })));
        
            doc.autoTable({
                head: [headers],
                body: tableData,
                startY: 30,
                theme: 'striped',
                margin: { top: 10, right: 10, bottom: 10, left: 10 },
                styles: { fontSize: 5, halign: 'center', valign: 'middle' },
                headStyles: { fillColor: [255, 216, 126], textColor: 0, fontSize: 5 },
                bodyStyles: { textColor: 50 },
                alternateRowStyles: { fillColor: [250, 250, 250] }
            });
        
            doc.save(invoice);
        };
        
    const resetFilters = () => {
        setStartDate(null);
        setEndDate(null);
    };
    return (
        <div className="scroll-table">
            <div className="container-fluid p-2">

                <div className="flex-t-h">
                    {showSearch && (
                        <div className="mb-2 me-2">
                            <input
                                type="text"
                                className="form-control form-con"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);  
                                }}
                            />
                        </div>
                    )}

                    {showRow && (
                        <div className="mb-2 me-2">
                            <select
                                className="form-control form-con-row"
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                            >
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={-1}>All</option>
                            </select>
                        </div>
                    )}

                    <div className="d-flex ms-auto  flex-se">
                        {showDate && (
                            <div className="d-flex me-2 date">
                                <div className="mb-2 me-2">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        placeholderText="Start Date"
                                        className="form-control"
                                        dateFormat="yyyy-MM-dd"
                                    />
                                </div>
                                <div className="mb-2 me-2">
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        placeholderText="End Date"
                                        className="form-control"
                                        dateFormat="yyyy-MM-dd"
                                    />
                                </div>
                                <div>
                                    <button className="btn btn-danger" onClick={resetFilters}>
                                        Reset
                                    </button>
                                </div>
                            </div>
                        )}

                        {showPDF && (
                            <div className="me-2">
                                <button className="btn btn-warning btn-sm" onClick={generatePDF}>
                                    Generate PDF
                                </button>
                            </div>
                        )}
                    </div>
                </div>












                {showButton && (
                    <div className=" d-flex justify-content-end">
                        <button className="btn btn-info text-white" onClick={onAdd}>
                            {btnName}
                        </button>
                    </div>
                )}


                <div className="mt-2">
                    <div className="col-md-12">
                        <table className="table table-hover table-responsive">
                            <thead>
                                <tr>
                                    {tableColumns.map((item, index) => (
                                        <th key={index} style={{ backgroundColor: 'black', color: 'white' }}>{item}</th>
                                    ))}
                                    {showActions && (
                                        <th style={{ backgroundColor: 'black', color: 'white' }}>Actions</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((datum, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {datum.map((item, colIndex) => (
                                            <td key={colIndex}>{item}</td>
                                        ))}
                                        {showActions && (
                                            <td>
                                                {showEdit && (
                                                    <button
                                                        className="btn btn-warning btn-sm mr-3"
                                                        onClick={() => onEdit(rowIndex)}
                                                    >
                                                        <FontAwesomeIcon icon={faPen} />
                                                    </button>
                                                )}
                                                {' '}
                                                {showDelete && (
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => onDelete(rowIndex)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
