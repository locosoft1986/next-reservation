'use client';

import React from 'react';
import {cn} from "@/app/libs/utils";
interface Props {
  className?: string;
  title: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

const Section: React.FC<Props> = ({
  className,
  title,
  actions,
  children
}) => {
  return (
    <div className={cn("flex flex-col", className)}>
        <div className="flex justify-between">
            <div className="text-2xl font-bold">
                {title}
            </div>
            {actions && actions}
        </div>
        <div>
            {children}
        </div>
    </div>
   );
}

export default Section;
