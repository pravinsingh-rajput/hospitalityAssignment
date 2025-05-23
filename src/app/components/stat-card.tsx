import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: "blue" | "purple" | "amber" | "emerald";
}

const StatCard = ({ icon, title, value, color }: StatCardProps) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
  };

  return (
    <div
      className={`rounded-xl p-4 border ${colorClasses[color]} transition-all hover-shadow-md`}
    >
      <div className="flex items-center gap-3">
        <div className="flex shrink-0">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
