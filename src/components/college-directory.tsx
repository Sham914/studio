'use client';

import React, {useEffect, useState} from 'react';
import {getColleges, College} from '@/services/college-directory';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export function CollegeDirectory() {
  const [colleges, setColleges] = useState<College[]>([]);

  useEffect(() => {
    async function loadColleges() {
      const colleges = await getColleges();
      setColleges(colleges);
    }

    loadColleges();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {colleges.map((college) => (
        <Card key={college.name}>
          <CardHeader>
            <CardTitle>{college.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <a href={college.url} target="_blank" rel="noopener noreferrer">
                Visit Portal
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

