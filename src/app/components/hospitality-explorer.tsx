"use client";

import React, { useEffect, useState } from "react";
import experienceData from "../../data/hospitality_assignment_data.json";
import { HospitalityExperience } from "../../types/hospitality";
import { FilterBar } from "./filter-bar";
import { ExperienceCard } from "./experience-card";
import StatusBar from "./stats-bar";
import ExperineceGrid from "./experience-grid";
const HospitalityExplorer = () => {
  const [experiences, setExperiences] = useState<HospitalityExperience[]>([]);
  const [filterexperience, setFilterExperiences] = useState<
    HospitalityExperience[]
  >([]);
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [selectedPropertyType, setSelectedPropertyType] =
    useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    try {
      const data = experienceData as HospitalityExperience[];
      const types = Array.from(new Set(data.map((exp) => exp.propertyType)));
      const yearsList = Array.from(new Set(data.map((exp) => exp.duration)));

      setExperiences(data);
      setFilterExperiences(data);
      setPropertyType(types);
      setYears(yearsList);
    } catch (error) {
      console.error("Error loading experience data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let filtered = [...experiences];

    if (selectedPropertyType !== "all") {
      filtered = filtered.filter(
        (exp) => exp.propertyType === selectedPropertyType
      );
    }

    if (selectedYear !== "all") {
      filtered = filtered.filter((exp) => exp.duration === selectedYear);
    }

    setFilterExperiences(filtered);
  }, [selectedPropertyType, selectedYear, experiences]);

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
  };
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };
  const handlePropertyTypeChange = (type: string) => {
    setSelectedPropertyType(type);
  };

  if (isLoading) {
    <div className="flex justify-center items-center h-64">
      <div className="animate-pulse flec flex-col items-center">
        <div className="h-12 w-12 bg-blue-200 rounded-full mb-4"></div>
        <div className="h-4 w-32 bg-blue-200 rounded-full mb-2"></div>
        <div className="h-3 w-24 bg-blue-200 rounded-full "></div>
      </div>
    </div>;
  }

  const totalProjects = filterexperience.reduce(
    (acc, experience) => acc + experience.projects.length,
    0
  );

  const flagshipCount = filterexperience.filter(
    (experience) => experience.isFlagship
  ).length;

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <FilterBar
          propertyTypes={propertyType}
          years={years}
          selectedPropertyType={selectedPropertyType}
          selectedYear={selectedYear}
          onPropertyTypeChange={handlePropertyTypeChange}
          onYearChange={handleYearChange}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />
        <StatusBar
          experienceCount={filterexperience.length}
          totaExperience={experiences.length}
          projectCount={totalProjects}
          flagshipCount={flagshipCount}
          selectedPropertyType={selectedPropertyType}
          selectedYear={selectedYear}
        />
      </div>

      {filterexperience.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-500 mb-2">
            No experiences match your filters.
          </p>
          <button
            onClick={() => {
              setSelectedPropertyType("all");
              setSelectedYear("all");
            }}
            className="text-blue-600 cursor-pointer hover:text-blue-800 text-sm font-medium"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <ExperineceGrid experiences={filterexperience} viewMode={viewMode} />
      )}
    </div>
  );
};

export default HospitalityExplorer;
