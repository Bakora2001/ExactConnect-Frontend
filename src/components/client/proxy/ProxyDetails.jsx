//Component to more details about a proxy
import { Link } from 'react-router-dom';

function ProxyDetails({ rowData, setSelectedRow }) {
  // console.log(rowData);
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="w-[350px] p-6 text-white bg-[#1f1f1e] h-full shadow-lg">
        <button
          onClick={() => setSelectedRow(null)}
          className="absolute text-xl text-gray-400 hover:text-gray-300 top-4 right-4"
        >
          ×
        </button>
        <h2 className="mb-4 text-xl font-bold">Proxy Details</h2>
        <div className="space-y-2 text-sm text-gray-400">

          <p>
            <strong>IP:</strong> {rowData.ip}
          </p>
          <p>
            <strong>Country:</strong> {rowData.loc.cc}
          </p>
          <p>
            <strong>Region:</strong> {rowData.loc.reg}
          </p>
          <p>
            <strong>City:</strong> {rowData.loc.city}
          </p>
          <p>
            <strong>ZIP:</strong> {rowData.loc.zip}
          </p>
          <p>
            <strong>Rating:</strong> {rowData.stars}
          </p>
          <p>
            <strong>ISP:</strong> {rowData.loc.isp}
          </p>
          <p>
            <strong>Clean:</strong> {rowData.clean ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Shared:</strong> {rowData.shared}
          </p>
          <p>
            <strong>Connections:</strong> {rowData.conn}
          </p>
          <p>
            <strong>New:</strong> {rowData.new ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Price:</strong> $ {rowData.
              priceShrC
            }
          </p>
        </div>
        <Link to="/test" state={{ amount: rowData.priceShrC,isp:rowData.loc.isp ,proxyId:rowData.id,countryCode:rowData.loc.cc,rating:rowData.stars,proxyState:rowData.leases.worn}}>
          <button
            // onClick={() => navigateToPayment(rowData.id)}
            className="w-full px-4 py-2 mt-6 text-white bg-[#7e22ce] rounded-lg hover:bg-[#5c1ca1] transition"
          >
            Purchase proxy
          </button>
        </Link>
      </div>
      <div
        className="flex-1 bg-black bg-opacity-50"
        onClick={() => setSelectedRow(null)}
      ></div>
    </div>
  );
}

export default ProxyDetails;
