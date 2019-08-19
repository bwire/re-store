import React from 'react';
import './shopping-cart-table.css'

const ShoppingCartTable = () => {
  return (
    <div className="shopping-cart-table">
      <h2>Your order</h2>
      <table className="table">
        <thead>
          <th>#</th>
          <th>Item</th>
          <th>Count</th>
          <th>Price</th>
          <th>Action</th>
        </thead>
        <tbody>
          <tr>
            <tdata>1</tdata>
            <tdata>Site engeneering</tdata>
            <tdata>2</tdata>
            <tdata>$40</tdata>
            <tdata>
              <button className="btn btn-outline-danger btn-sm float-right">
                <i className="fa fa-trash-o" />
              </button>
              <button className="btn btn-outline-success btn-sm float-right">
                <i className="fa fa-plus-circle" />
              </button>
              <button className="btn btn-outline-warning btn-sm float-right">
                <i className="fa fa-minus-circle" />
              </button>
            </tdata>
          </tr>
        </tbody>
      </table>
      <div className="total">Total: $200</div>
    </div>
  );
}

export default ShoppingCartTable;