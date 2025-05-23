"use client";

import { useState } from "react";
import {
  HiMapPin,
  HiBriefcase,
  HiCalendarDays,
  HiChevronRight,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi2";
import type { HospitalityExperience, Project } from "../../types/hospitality";

interface ExperienceCardProps {
  experience: HospitalityExperience;
  onProjectClick: (project: Project) => void;
}

const ExperienceList = ({
  experience,
  onProjectClick,
}: ExperienceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPropertyTypeColor = (type: string) => {
    switch (type) {
      case "business":
        return "bg-blue-100 text-blue-800";
      case "heritage":
        return "bg-amber-100 text-amber-800";
      case "resort":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300">
      <div
        className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="space-y-2 mb-4 md:mb-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xl font-bold text-gray-900">
              {experience.property}
            </h3>
            {experience.isFlagship && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                Flagship
              </span>
            )}
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getPropertyTypeColor(
                experience.propertyType
              )}`}
            >
              {experience.propertyType}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <HiBriefcase className="h-4 w-4 text-gray-400" />
              <span>{experience.role}</span>
            </div>
            <div className="flex items-center gap-1">
              <HiMapPin className="h-4 w-4 text-gray-400" />
              <span>{experience.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <HiCalendarDays className="h-4 w-4 text-gray-400" />
              <span>{experience.duration}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {experience.projects.length} Project
            {experience.projects.length !== 1 ? "s" : ""}
          </span>
          {isExpanded ? (
            <HiChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <HiChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {experience.projects.map((project) => (
              <button
                key={project.id}
                className="text-left cursor-pointer p-4 rounded-lg bg-white shadow-sm hover:shadow transition-shadow flex justify-between items-center"
                onClick={() => onProjectClick(project)}
              >
                <div>
                  <h5 className="font-medium text-gray-800 mb-1">
                    {project.title}
                  </h5>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {project.overview}
                  </p>
                </div>
                <HiChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceList;
