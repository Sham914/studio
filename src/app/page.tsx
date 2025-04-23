
import React from 'react';
import {EventHub} from '@/components/event-hub';
import {CollegeDirectory} from '@/components/college-directory';
import {KeamRankPredictor} from '@/components/keam-rank-predictor';
import {Button} from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">SeekGram</h1>
        <div>
          <Button>Sign In</Button>
          <Button className="ml-2">Sign Up</Button>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Event Hub</h2>
        <EventHub />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">College Directory</h2>
        <CollegeDirectory />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">KEAM Rank Predictor</h2>
        <KeamRankPredictor />
      </section>
    </div>
  );
}
