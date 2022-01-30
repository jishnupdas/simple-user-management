const LoadingRow = () => (
  <tr className="animate-pulse last:pr-7">
    {[...Array(4).keys()].map((n) => (
      <td key={n} className="table-cell">
        <div className="w-full py-3 bg-gray-200"></div>
      </td>
    ))}
  </tr>
);

export default LoadingRow;
