import React from "react";

export default function DetailsTable({ title, rows = [] }) {
  return (
    <div className="w-full overflow-hidden border border-[#e1e5ea] bg-white">
      {/* Title */}
      {title && (
        <div className="border-b border-[#e1e5ea] px-5 py-2 text-center">
          <h2 className="font-serif text-xl font-medium text-[#294e78]">
            {title}
          </h2>
        </div>
      )}

      {/* Rows */}
      {rows.map((row, index) => (
        <div
          key={index}
          className="grid grid-cols-1 border-b border-[#e1e5ea] last:border-b-0 md:grid-cols-2"
        >
          {/* First detail */}
          <div className="grid grid-cols-2 border-b border-[#e1e5ea] md:border-b-0">
            <div className="px-5 py-5 font-serif text-[17px] font-semibold text-[#1f2937]">
              {row.label1}
            </div>

            <div className="px-5 py-5 font-serif text-[17px] text-[#597fad]">
              {row.value1 || "-"}
            </div>
          </div>

          {/* Second detail */}
          {row.label2 && (
            <div className="grid grid-cols-2">
              <div className="px-5 py-5 font-serif text-[17px] font-semibold text-[#1f2937]">
                {row.label2}
              </div>

              <div className="px-5 py-5 font-serif text-[17px] text-[#597fad]">
                {row.value2 || "-"}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
