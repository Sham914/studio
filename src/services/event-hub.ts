/**
 * Represents a tech event.
 */
export interface Event {
  /**
   * The name of the event.
   */
  name: string;
  /**
   * The description of the event.
   */
  description: string;
  /**
   * The URL for event registration.
   */
  registrationUrl: string;
}

/**
 * Asynchronously retrieves a list of tech events in Kerala.
 *
 * @returns A promise that resolves to an array of Event objects.
 */
export async function getEvents(): Promise<Event[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      name: 'Hackathon CET',
      description: 'Annual hackathon at College of Engineering Trivandrum',
      registrationUrl: 'https://www.example.com/hackathon-cet',
    },
    {
      name: 'Tech Fest GEC',
      description: 'Tech fest at Government Engineering College Thrissur',
      registrationUrl: 'https://www.example.com/tech-fest-gec',
    },
  ];
}
