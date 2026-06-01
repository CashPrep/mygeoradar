export interface City {
  slug: string
  name: string
  state: string
  stateAbbr: string
  population: number
}

export const CITIES: City[] = [
  { slug: 'new-york-ny', name: 'New York', state: 'New York', stateAbbr: 'NY', population: 8336817 },
  { slug: 'los-angeles-ca', name: 'Los Angeles', state: 'California', stateAbbr: 'CA', population: 3979576 },
  { slug: 'chicago-il', name: 'Chicago', state: 'Illinois', stateAbbr: 'IL', population: 2693976 },
  { slug: 'houston-tx', name: 'Houston', state: 'Texas', stateAbbr: 'TX', population: 2320268 },
  { slug: 'phoenix-az', name: 'Phoenix', state: 'Arizona', stateAbbr: 'AZ', population: 1680992 },
  { slug: 'philadelphia-pa', name: 'Philadelphia', state: 'Pennsylvania', stateAbbr: 'PA', population: 1584064 },
  { slug: 'san-antonio-tx', name: 'San Antonio', state: 'Texas', stateAbbr: 'TX', population: 1547253 },
  { slug: 'san-diego-ca', name: 'San Diego', state: 'California', stateAbbr: 'CA', population: 1423851 },
  { slug: 'dallas-tx', name: 'Dallas', state: 'Texas', stateAbbr: 'TX', population: 1343573 },
  { slug: 'san-jose-ca', name: 'San Jose', state: 'California', stateAbbr: 'CA', population: 1021795 },
  { slug: 'austin-tx', name: 'Austin', state: 'Texas', stateAbbr: 'TX', population: 978908 },
  { slug: 'jacksonville-fl', name: 'Jacksonville', state: 'Florida', stateAbbr: 'FL', population: 949611 },
  { slug: 'fort-worth-tx', name: 'Fort Worth', state: 'Texas', stateAbbr: 'TX', population: 918915 },
  { slug: 'columbus-oh', name: 'Columbus', state: 'Ohio', stateAbbr: 'OH', population: 905748 },
  { slug: 'charlotte-nc', name: 'Charlotte', state: 'North Carolina', stateAbbr: 'NC', population: 897720 },
  { slug: 'indianapolis-in', name: 'Indianapolis', state: 'Indiana', stateAbbr: 'IN', population: 887642 },
  { slug: 'san-francisco-ca', name: 'San Francisco', state: 'California', stateAbbr: 'CA', population: 881549 },
  { slug: 'seattle-wa', name: 'Seattle', state: 'Washington', stateAbbr: 'WA', population: 753675 },
  { slug: 'denver-co', name: 'Denver', state: 'Colorado', stateAbbr: 'CO', population: 727211 },
  { slug: 'nashville-tn', name: 'Nashville', state: 'Tennessee', stateAbbr: 'TN', population: 689447 },
  { slug: 'boston-ma', name: 'Boston', state: 'Massachusetts', stateAbbr: 'MA', population: 675647 },
  { slug: 'miami-fl', name: 'Miami', state: 'Florida', stateAbbr: 'FL', population: 467963 },
  { slug: 'atlanta-ga', name: 'Atlanta', state: 'Georgia', stateAbbr: 'GA', population: 498715 },
  { slug: 'portland-or', name: 'Portland', state: 'Oregon', stateAbbr: 'OR', population: 652503 },
  { slug: 'las-vegas-nv', name: 'Las Vegas', state: 'Nevada', stateAbbr: 'NV', population: 651319 },
  { slug: 'memphis-tn', name: 'Memphis', state: 'Tennessee', stateAbbr: 'TN', population: 633104 },
  { slug: 'louisville-ky', name: 'Louisville', state: 'Kentucky', stateAbbr: 'KY', population: 633045 },
  { slug: 'baltimore-md', name: 'Baltimore', state: 'Maryland', stateAbbr: 'MD', population: 585708 },
  { slug: 'milwaukee-wi', name: 'Milwaukee', state: 'Wisconsin', stateAbbr: 'WI', population: 577222 },
  { slug: 'albuquerque-nm', name: 'Albuquerque', state: 'New Mexico', stateAbbr: 'NM', population: 564559 },
  { slug: 'tucson-az', name: 'Tucson', state: 'Arizona', stateAbbr: 'AZ', population: 542629 },
  { slug: 'fresno-ca', name: 'Fresno', state: 'California', stateAbbr: 'CA', population: 530093 },
  { slug: 'mesa-az', name: 'Mesa', state: 'Arizona', stateAbbr: 'AZ', population: 504258 },
  { slug: 'sacramento-ca', name: 'Sacramento', state: 'California', stateAbbr: 'CA', population: 513624 },
  { slug: 'kansas-city-mo', name: 'Kansas City', state: 'Missouri', stateAbbr: 'MO', population: 508090 },
  { slug: 'long-beach-ca', name: 'Long Beach', state: 'California', stateAbbr: 'CA', population: 466742 },
  { slug: 'raleigh-nc', name: 'Raleigh', state: 'North Carolina', stateAbbr: 'NC', population: 467665 },
  { slug: 'omaha-ne', name: 'Omaha', state: 'Nebraska', stateAbbr: 'NE', population: 486051 },
  { slug: 'colorado-springs-co', name: 'Colorado Springs', state: 'Colorado', stateAbbr: 'CO', population: 472688 },
  { slug: 'minneapolis-mn', name: 'Minneapolis', state: 'Minnesota', stateAbbr: 'MN', population: 429606 },
  { slug: 'tampa-fl', name: 'Tampa', state: 'Florida', stateAbbr: 'FL', population: 399700 },
  { slug: 'new-orleans-la', name: 'New Orleans', state: 'Louisiana', stateAbbr: 'LA', population: 390845 },
  { slug: 'cleveland-oh', name: 'Cleveland', state: 'Ohio', stateAbbr: 'OH', population: 372624 },
  { slug: 'pittsburgh-pa', name: 'Pittsburgh', state: 'Pennsylvania', stateAbbr: 'PA', population: 302971 },
  { slug: 'orlando-fl', name: 'Orlando', state: 'Florida', stateAbbr: 'FL', population: 307573 },
  { slug: 'st-louis-mo', name: 'St. Louis', state: 'Missouri', stateAbbr: 'MO', population: 301578 },
  { slug: 'richmond-va', name: 'Richmond', state: 'Virginia', stateAbbr: 'VA', population: 226610 },
  { slug: 'salt-lake-city-ut', name: 'Salt Lake City', state: 'Utah', stateAbbr: 'UT', population: 199723 },
  { slug: 'birmingham-al', name: 'Birmingham', state: 'Alabama', stateAbbr: 'AL', population: 212237 },
  { slug: 'hartford-ct', name: 'Hartford', state: 'Connecticut', stateAbbr: 'CT', population: 121054 },
]

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find(c => c.slug === slug)
}

export const TOP_20_CITIES = CITIES.slice(0, 20)
