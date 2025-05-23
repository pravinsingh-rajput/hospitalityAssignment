"use client";

import {
  HiSquares2X2,
  HiRectangleStack,
  HiFunnel,
  HiXMark,
} from "react-icons/hi2";

interface FilterBarProps {
  propertyTypes: string[];
  years: string[];
  selectedPropertyType: string;
  selectedYear: string;
  viewMode: "grid" | "list";
  onPropertyTypeChange: (type: string) => void;
  onYearChange: (year: string) => void;
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function FilterBar({
  propertyTypes,
  years,
  selectedPropertyType,
  selectedYear,
  viewMode,
  onPropertyTypeChange,
  onYearChange,
  onViewModeChange,
}: FilterBarProps) {
  const hasActiveFilters =
    selectedPropertyType !== "all" || selectedYear !== "all";

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <HiFunnel className="h-5 w-5 text-blue-500" />
          <span>Filter Experiences</span>
        </h2>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={() => {
                onPropertyTypeChange("all");
                onYearChange("all");
              }}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-md"
            >
              <HiXMark className="h-4 w-4" />
              <span>Clear filters</span>
            </button>
          )}

          <div className="flex border rounded-md overflow-hidden">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2  cursor-pointer ${
                viewMode === "grid"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              <HiSquares2X2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 cursor-pointer ${
                viewMode === "list"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              <HiRectangleStack className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="property-type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Property Type
          </label>
          <select
            id="property-type"
            value={selectedPropertyType}
            onChange={(e) => onPropertyTypeChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          >
            <option value="all">All Property Types</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Year
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          >
            <option value="all">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
