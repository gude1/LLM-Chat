import { cn } from "@/lib/utils";
import React from "react";

interface CircularProgressProps {
  size?: number;
  percentage?: number;
  strokeWidth?: number;
  circleClassName?: string;
  className?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 28,
  percentage = 0,
  circleClassName,
  strokeWidth = 15,
  className = "",
}) => {
  const radius = 50 - strokeWidth / 2; // Adjust the radius based on strokeWidth to keep it within the viewBox
  const circumference = 2 * Math.PI * radius; // Calculate the circle circumference
  const offset = circumference - (percentage / 100) * circumference; // Calculate the stroke offset based on percentage

  return (
    <div role="status" className={className}>
      <svg
        aria-hidden="true"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-[#2F2F2F]"
        />

        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(`text-primary ${circleClassName}`)}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.35s" }}
        />
      </svg>
      <span className="sr-only">{percentage}% complete</span>
    </div>
  );
};

export default CircularProgress;
