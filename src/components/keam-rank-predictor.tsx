
'use client';

import React, {useState} from 'react';
import {predictCollege, KeamRankOutput} from '@/ai/flows/keam-rank-predictor';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const formSchema = z.object({
  keamRank: z.number().min(1, {message: "KEAM rank is required."}),
  category: z.string().min(1, {message: "Category is required."}),
});

export function KeamRankPredictor() {
  const [prediction, setPrediction] = useState<KeamRankOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keamRank: 0,
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const prediction = await predictCollege({
      keamRank: values.keamRank,
      category: values.category,
    });
    setPrediction(prediction);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="keamRank"
            render={({field}) => (
              <FormItem>
                <FormLabel>KEAM Rank</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter your KEAM Rank" {...field} />
                </FormControl>
                <FormDescription>Enter the rank you secured in KEAM examination.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({field}) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your Category" {...field} />
                </FormControl>
                <FormDescription>Enter your category as per Kerala sector (e.g., General, OBC, SC, ST).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Predict Colleges</Button>
        </form>
      </Form>

      {prediction && prediction.possibleColleges.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Possible Colleges:</h3>
          <ul>
            {prediction.possibleColleges.map((college) => (
              <li key={college.collegeName} className="mb-2">
                {college.collegeName} - Probability: {(college.probability * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}

      {prediction && prediction.possibleColleges.length === 0 && (
        <div className="mt-8">
          <p>No suitable colleges found based on the provided KEAM rank and category.</p>
        </div>
      )}
    </div>
  );
}
