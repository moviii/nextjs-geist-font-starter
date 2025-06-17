"use client";

import React, { HTMLAttributes } from "react";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx("rounded-lg bg-white shadow-md p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
