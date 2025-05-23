"use client";

import { useState } from "react";
import {
  HiMapPin,
  HiBriefcase,
  HiCalendarDays,
  HiChevronRight,
} from "react-icons/hi2";
import type { HospitalityExperience, Project } from "../../types/hospitality";

interface ExperienceCardProps {
  experience: HospitalityExperience;
  onProjectClick: (project: Project) => void;
}

export function ExperienceCard({
  experience,
  onProjectClick,
}: ExperienceCardProps) {
  const [isHovered, setIsHovered] = useState(false);


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
    <div
      className={`bg-white rounded-xl overflow-hidden transition-all duration-300 ${
        isHovered ? "shadow-lg transform -translate-y-1" : "shadow-md"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {experience.property}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <HiMapPin className="h-4 w-4 text-gray-400" />
              <span>{experience.location}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getPropertyTypeColor(
                experience.propertyType
              )}`}
            >
              {experience.propertyType}
            </span>
            {experience.isFlagship && (
              <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                Flagship
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <HiBriefcase className="h-4 w-4 text-gray-400" />
          <span>{experience.role}</span>
        </div>

        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <HiCalendarDays className="h-4 w-4 text-gray-400" />
          <span>{experience.duration}</span>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <h4 className="font-medium text-gray-900 mb-3">
            Projects ({experience.projects.length})
          </h4>
          <div className="space-y-2">
            {experience.projects.map((project) => (
              <button
                key={project.id}
                className="w-full cursor-pointer text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                onClick={() => onProjectClick(project)}
              >
                <span className="font-medium text-gray-800">
                  {project.title}
                </span>
                <HiChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
