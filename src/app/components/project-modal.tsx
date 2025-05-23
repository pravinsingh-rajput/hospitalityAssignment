"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  HiXMark,
  HiCalendarDays,
  HiStar,
  HiUserGroup,
  HiWrenchScrewdriver,
  HiDocumentText,
  HiBuildingOffice2,
  HiMapPin,
} from "react-icons/hi2";
import { Project, HospitalityExperience } from "@/types/hospitality";

interface ProjectModalProps {
  project: Project;
  experience: HospitalityExperience;
  onClose: () => void;
}

export function ProjectModal({
  project,
  experience,
  onClose,
}: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const formattedDate = project.launchDate
    ? new Date(project.launchDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const avgFeedback =
    project.guestFeedback && project.guestFeedback.length > 0
      ? (
          project.guestFeedback.reduce((sum, score) => sum + score, 0) /
          project.guestFeedback.length
        ).toFixed(1)
      : null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {project.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <HiBuildingOffice2 className="h-4 w-4" />
              <span>{experience.property}</span>
              <span className="text-gray-300">•</span>
              <HiMapPin className="h-4 w-4" />
              <span>{experience.location}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <HiXMark className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-grow">
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg mb-6">{project.overview}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {formattedDate && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <HiCalendarDays className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">
                      Launch Date
                    </p>
                    <p className="text-lg font-semibold">{formattedDate}</p>
                  </div>
                </div>
              )}

              {avgFeedback && (
                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <HiStar className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-amber-600 font-medium">
                      Guest Rating
                    </p>
                    <p className="text-lg font-semibold">{avgFeedback}/5</p>
                  </div>
                </div>
              )}
            </div>

            {project.tools && project.tools.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <HiWrenchScrewdriver className="h-5 w-5 text-gray-500" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Tools Used
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.metrics && Object.keys(project.metrics).length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Key Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1 capitalize">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/([A-Z][a-z])/g, " $1")
                          .trim()}
                      </p>
                      <p className="text-xl font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.initiatives && project.initiatives.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Initiatives
                </h3>
                <div className="space-y-3">
                  {project.initiatives.map((initiative, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium text-lg mb-2 sm:mb-0">
                        {initiative.name}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 self-start sm:self-auto">
                        {initiative.result}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.guestFeedback && project.guestFeedback.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Guest Feedback Distribution
                </h3>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = project.guestFeedback!.filter(
                      (score) => score === rating
                    ).length;
                    const percentage =
                      (count / project.guestFeedback!.length) * 100;

                    return (
                      <div key={rating} className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-amber-100 text-amber-800 rounded-full font-bold">
                          {rating}
                        </div>
                        <div className="relative flex-grow h-6 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-amber-500 rounded-full flex items-center justify-end px-2"
                            style={{ width: `${percentage}%` }}
                          >
                            {percentage >= 15 && (
                              <span className="text-xs font-medium text-white">
                                {percentage.toFixed(0)}%
                              </span>
                            )}
                          </div>
                          {percentage < 15 && (
                            <span className="absolute top-0 left-0 h-full flex items-center px-2 text-xs font-medium">
                              {percentage.toFixed(0)}%
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium w-6 text-right">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {project.modules && Object.keys(project.modules).length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Project Modules
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(project.modules).map(([key, module]) => (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-lg mb-2 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </h4>
                      <p className="mb-3 text-gray-700">{module.summary}</p>
                      {module.tags && module.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {module.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-800"
                            >
                              {tag.replace(/_/g, " ")}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.team && project.team.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <HiUserGroup className="h-5 w-5 text-gray-500" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Team Members
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {project.team.map((member, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium text-lg">{member.name}</p>
                      <p className="text-gray-600">{member.role}</p>
                      {member.lead && (
                        <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                          Team Lead
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.imageUrl && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Project Image
                </h3>
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                  <Image
                    src={
                      project.imageUrl ||
                      "/placeholder.svg?height=400&width=600"
                    }
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {project.documentLinks && project.documentLinks.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Related Documents
                </h3>
                <ul className="space-y-2">
                  {project.documentLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-2 p-2 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <HiDocumentText className="h-5 w-5" />
                        <span>Document {index + 1}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="border-t p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
