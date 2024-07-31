import React from 'react';
import "./css/invoice.css"
const Invoice = () => {
  return (
    <div className='invoiceContainer'>
      {/* Header */}
      <div className="header">
        <div className="header-inner">
          <div className="header-content">
            <div className="header-logo">
              <img src="./images/logo3ai.png" alt="logo" />
            </div>
            <div className="header-info">
              <h1>Invoice</h1>
              <p>Hello, Philip Brooks.<br />Thank you for shopping from our store and for your order.</p>
              <p><small>ORDER</small> #800000025<br /><small>MARCH 4TH 2016</small></p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="order-details">
        <div className="order-details-inner">
          <div className="order-details-content">
            <table className="order-details-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th><small>SKU</small></th>
                  <th className="quantity">Quantity</th>
                  <th className="subtotal">Subtotal</th>
                </tr>
                <tr>
                  <td className="separator" colSpan="4" style={{ "padding": "0px", "height": "1px"}}></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="item">Beats Studio Over-Ear Headphones</td>
                  <td className="item-sku"><small>MH792AM/A</small></td>
                  <td className="quantity">1</td>
                  <td className="subtotal">$299.95</td>
                </tr>
                <tr>
                  <td className="separator" colSpan="4"
                  style={{ "padding": "0px", "height": "1px"}}></td>
                </tr>
                <tr>
                  <td className="item">Beats RemoteTalk Cable</td>
                  <td className="item-sku"><small>MHDV2G/A</small></td>
                  <td className="quantity">1</td>
                  <td className="subtotal">$29.95</td>
                </tr>
                <tr>
                  <td className="separator" colSpan="4"
                  style={{ "padding": "0px", "height": "1px"}}></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Subtotal</td>
                  <td>$329.90</td>
                </tr>
                <tr>
                  <td colSpan="3">Shipping</td>
                  <td>$5.00</td>
                </tr>
                <tr>
                  <td className="separator" colSpan="4" style={{ "padding": "0px", "height": "1px"}}></td>
                </tr>
                <tr>
                  <td className="grand-total" colSpan="3">Grand Total</td>
                  <td className="grand-total">$334.90</td>
                </tr>
                <tr>
                  <td colSpan="4" height="20"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
 
    </div>
  );
};

export default Invoice;
