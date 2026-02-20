
export interface ArchitectureBlock {
  id: string;
  title: string;
  description: string;
  details: string[];
  color: string;
}

export interface Metric {
  label: string;
  value: string;
  subtext: string;
  color: string;
}

export interface ComparisonItem {
  name: string;
  latency: number; // in microseconds
  power: number; // in watts
  cost: string;
  visual: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}
