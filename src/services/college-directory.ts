
/**
 * Represents an engineering college.
 */
export interface College {
  /**
   * The name of the college.
   */
  name: string;
  /**
   * The URL of the college's website.
   */
  url: string;
  /**
   * Cutoff marks
   */
  cutoff?: string;
}

/**
 * Asynchronously retrieves a list of engineering colleges in Kerala.
 *
 * @returns A promise that resolves to an array of College objects.
 */
export async function getColleges(): Promise<College[]> {
  return [
    {
      name: 'College of Engineering Trivandrum',
      url: 'https://www.cet.ac.in/',
    },
    {
      name: 'Government Engineering College Thrissur',
      url: 'http://gectcr.ac.in/',
    },
  ];
}
