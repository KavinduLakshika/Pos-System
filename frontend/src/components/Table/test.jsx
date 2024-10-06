import React from 'react';

const Test = () => {
  const items = [
    { id: 0, name: 'Item 0', price: '$0' },
    { id: 1, name: 'Item 1', price: '$1' },
    { id: 2, name: 'Item 2', price: '$2' },
    { id: 3, name: 'Item 3', price: '$3' },
    { id: 4, name: 'Item 4', price: '$4' },
    { id: 5, name: 'Item 5', price: '$5' },
  ];

  return (
    <div className="container mt-4">
      {/* Search and Toolbar */}
      <div className="d-flex justify-content-between mb-2">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search"
          aria-label="Search"
        />

        {/* Right-aligned toolbar */}
        <div className="columns columns-right btn-group">
          <button
            className="btn btn-secondary"
            type="button"
            name="paginationSwitch"
            aria-label="Hide/Show pagination"
            title="Hide/Show pagination"
          >
            <i className="bi bi-caret-down-square"></i>
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            name="refresh"
            aria-label="Refresh"
            title="Refresh"
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            name="toggle"
            aria-label="Show card view"
            title="Show card view"
          >
            <i className="bi bi-toggle-off"></i>
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            name="fullscreen"
            aria-label="Fullscreen"
            title="Fullscreen"
          >
            <i className="bi bi-arrows-move"></i>
          </button>

          <div className="keep-open btn-group">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-label="Columns"
              title="Columns"
            >
              <i className="bi bi-list-ul"></i>
              <span className="caret"></span>
            </button>

            <div className="dropdown-menu dropdown-menu-end">
              <label className="dropdown-item dropdown-item-marker">
                <input
                  type="checkbox"
                  className="toggle-all"
                  defaultChecked
                />
                <span>Toggle all</span>
              </label>
              <div className="dropdown-divider"></div>
              <label className="dropdown-item dropdown-item-marker">
                <input type="checkbox" data-field="id" defaultChecked />
                <span>Item ID</span>
              </label>
              <label className="dropdown-item dropdown-item-marker">
                <input type="checkbox" data-field="name" defaultChecked />
                <span>Item Name</span>
              </label>
              <label className="dropdown-item dropdown-item-marker">
                <input type="checkbox" data-field="price" defaultChecked />
                <span>Item Price</span>
              </label>
              <label className="dropdown-item dropdown-item-marker">
                <input type="checkbox" data-field="operate" defaultChecked />
                <span>Item Operate</span>
              </label>
            </div>
          </div>

          {/* Export button */}
          <div className="export btn-group">
            <button
              className="btn btn-secondary dropdown-toggle"
              aria-label="Export data"
              data-bs-toggle="dropdown"
              type="button"
              title="Export data"
            >
              <i className="bi bi-download"></i>
              <span className="caret"></span>
            </button>
            <div className="dropdown-menu dropdown-menu-end">
              <a className="dropdown-item" href="#" data-type="json">
                JSON
              </a>
              <a className="dropdown-item" href="#" data-type="xml">
                XML
              </a>
              <a className="dropdown-item" href="#" data-type="csv">
                CSV
              </a>
              <a className="dropdown-item" href="#" data-type="txt">
                TXT
              </a>
              <a className="dropdown-item" href="#" data-type="sql">
                SQL
              </a>
              <a className="dropdown-item" href="#" data-type="excel">
                MS-Excel
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Item Operate</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <button className="btn btn-link text-primary">
                  <i className="fas fa-heart"></i>
                </button>
                <button className="btn btn-link text-primary">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Test;
