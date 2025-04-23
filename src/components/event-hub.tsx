'use client';

import React, {useEffect, useState} from 'react';
import {getEvents, Event} from '@/services/event-hub';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export function EventHub() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function loadEvents() {
      const events = await getEvents();
      setEvents(events);
    }

    loadEvents();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.name}>
          <CardHeader>
            <CardTitle>{event.name}</CardTitle>
            <CardDescription>{event.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                Register
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


