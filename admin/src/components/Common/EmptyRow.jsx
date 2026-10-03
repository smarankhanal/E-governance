export default function EmptyRow({ cols, text }) {
  return (
    <tr>
      <td
        colSpan={cols}
        className="px-6 py-12 text-center text-sm text-slate-500"
      >
        {text}
      </td>
    </tr>
  );
}
