import { LuPrinter } from "react-icons/lu";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Invoice() {

  const handlePrint = () => {
    const printSection = document.getElementById("invoice-section");
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            @media print {
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
              }
              .print-container {
                width: 100%;
                margin: auto;
                padding: 20px;
                box-sizing: border-box;
              }
              .summary {
                margin-top: 20px;
                padding: 10px;
                border: 1px solid #000;
                border-radius: 5px;
                background-color: #f9f9f9;
              }
              .summary-header {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
              }
              .summary-item {
                display: flex;
                justify-content: space-between;
                margin: 5px 0;
                font-size: 16px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              th, td {
                border: 1px solid #000;
                padding: 8px;
                text-align: left;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container">${printSection.innerHTML}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <section className="container mt-4 mb-4">
      <Link to='/Dashbord/Admin/Orders' className='flex gap-2 items-center cursor-pointer text-sm'>
        <IoChevronBackCircleOutline /> Back
      </Link>
      <div onClick={handlePrint} className="flex gap-2 items-center cursor-pointer mt-2">
        <span>Print</span>
        <span><LuPrinter /></span>
      </div>
      <div id="invoice-section" className="w-full  rounded-md shadow-md">
        <div className="container p-2">
          <h1 className="text-center font-bold">#Invoice</h1>
          <p>Invoice number: XXXXXXXXXX</p>
          <p>Issue date: <span>12/12/2024</span></p>
          <p>Customer: <span>name</span></p>
          <p>Email: <span>email@gmail.com</span></p>
        </div>
        <div>
          <div className='responsive-table-orders rounded-md'>
            <table className='w-full text-base'>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center" >
                  <td>Iphone</td>
                  <td>4</td>
                  <td>1500</td>
                </tr>
                <tr className="text-center" >
                  <td>Iphone</td>
                  <td>4</td>
                  <td>1500</td>
                </tr>
                <tr className="text-center" >
                  <td>Iphone</td>
                  <td>4</td>
                  <td>1500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="summary  flex flex-col gap-3 w-full  p-10  md:mb-3 md:mt-3 md:w-[80%] ">
          <div className="summary-header">Summary</div>
          <div className="summary-item  flex justify-between font-light border-b-2 border-zinc-950 ">
            <span>Total Cart Price</span>
            <span>5000</span>
          </div>
          <div className="summary-item flex justify-between font-light border-b-2 border-zinc-950">
            <span>Tax Price</span>
            <span>50</span>
          </div>
          <div className="summary-item flex justify-between font-light border-b-2 border-zinc-950">
            <span>Shipping Price</span>
            <span>0</span>
          </div>
          <div className="summary-item flex justify-between font-light border-b-2 border-zinc-950" style={{ fontWeight: "bold" }}>
            <span>Total Order</span>
            <span>5050</span>
          </div>
        </div>
      </div>
    </section>
  );
}
