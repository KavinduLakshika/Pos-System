import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";


const Table = ({
    data,
    columns,
    onAdd,
    btnName,
    onEdit,
    onDelete,
    showSearch = true,
    showButton = true,
    showActions = true,
    showEdit = true,
    showDelete = true
}) => {

    const [tableData, setTableData] = useState(data);
    const [tableColumns, setTableColumns] = useState(columns);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);

    useEffect(() => {
        setTableData(data);
    }, [data]);

    useEffect(() => {
        setTableColumns(columns);
    }, [columns]);

    const filteredData = tableData.filter((tableDatum) => {
        const query = searchQuery.toLowerCase();
        return tableDatum.some((item) => {
            return item != null && item.toString().toLowerCase().includes(query);
        });
    });

    const currentItems = itemsPerPage === -1
        ? filteredData
        : filteredData.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );

    return (
        <div className="container-fluid p-2">
            <div className="row mb-2">
                {showSearch && (
                    <div className="col-md-4 mb-3   ">
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Search'
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                )}
                <div className="col-md-2 mb-3 ">
                    <select className="form-control" value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} >
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={-1}>All</option>
                    </select>
                </div>
                {showButton && (
                    <div className="col-md- d-flex justify-content-end">
                        <button className="btn btn-info text-white" onClick={onAdd}>
                            {btnName}
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-2">
                <div className="col-md-12">
                    <table className="table table-hover table-responsive">
                        <thead >
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
    );
};

export default Table;
