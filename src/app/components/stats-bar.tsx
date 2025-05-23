import React from "react";
import StatCard from "./stat-card";
import {
  HiBriefcase,
  HiBuildingOffice2,
  HiStar,
  HiCalendarDays,
} from "react-icons/hi2";

interface StatsBarProps {
  experienceCount: number;
  totaExperience: number;
  projectCount: number;
  flagshipCount: number;
  selectedPropertyType: string;
  selectedYear: string;
}

const StatusBar = ({
  experienceCount,
  totaExperience,
  projectCount,
  flagshipCount,
  selectedPropertyType,
  selectedYear,
}: StatsBarProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        icon={<HiBriefcase className="h-6 w-6 text-blue-500" />}
        title="Experinece"
        value={`${experienceCount} of ${totaExperience}`}
        color="blue"
      />
      <StatCard
        icon={<HiBuildingOffice2 className="h-6 w-6 text-purple-500" />}
        title="Projects"
        value={projectCount.toString()}
        color="blue"
      />
      <StatCard
        icon={<HiStar className="h-6 w-6 text-amber-500" />}
        title="Flagship Properties"
        value={flagshipCount.toString()}
        color="blue"
      />
      <StatCard
        icon={<HiCalendarDays className="h-6 w-6 text-emerald-500" />}
        title="Year"
        value={selectedYear === "all" ? "All Years" : selectedYear}
        color="blue"
      />
    </div>
  );
};

export default StatusBar;
