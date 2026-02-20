
import { ArchitectureBlock, ComparisonItem, Metric, TeamMember } from './types';

export const ARCHITECTURE_BLOCKS: ArchitectureBlock[] = [
  {
    id: 'matching-engine',
    title: 'Matching Engine',
    description: 'Ultra-low latency core processing.',
    details: [
      'Binary heap order book',
      'CAM lookup (O(1))',
      '13-stage pipeline',
      '50–100ns latency'
    ],
    color: '#A855F7' // Purple
  },
  {
    id: 'feature-extractor',
    title: 'Feature Extractor',
    description: 'Real-time data preprocessing.',
    details: [
      '16 real-time market metrics',
      'Sliding window calculations',
      'Volatility + imbalance tracking'
    ],
    color: '#F59E0B' // Orange
  },
  {
    id: 'ml-classifier',
    title: 'ML Anomaly Detector',
    description: 'Neural network for threat detection.',
    details: [
      '16 → 8 → 6 MLP architecture',
      'Fixed-point inference',
      '50ns inference latency'
    ],
    color: '#A855F7' // Purple
  },
  {
    id: 'circuit-breaker',
    title: 'Circuit Breaker',
    description: 'Automated protection mechanisms.',
    details: [
      'Tiered alerts',
      'Automatic halt logic',
      'Microsecond-level response'
    ],
    color: '#F59E0B' // Orange
  }
];

export const COMPARISON_DATA: ComparisonItem[] = [
  {
    name: 'Software (CPU)',
    latency: 50,
    power: 80,
    cost: 'High OpEx',
    visual: 'OS Scheduling, Cache Jitter'
  },
  {
    name: 'FPGA',
    latency: 5,
    power: 15,
    cost: '$50,000+',
    visual: 'Expensive, High Power'
  },
  {
    name: 'NanoTrade ASIC',
    latency: 0.05,
    power: 0.008,
    cost: '$500 / unit',
    visual: 'Deterministic, Efficient'
  }
];

export const METRICS: Metric[] = [
  { label: 'Orders / Second', value: '10M+', subtext: 'Throughput', color: 'purple' },
  { label: 'Matching Latency', value: '<100ns', subtext: 'Deterministic', color: 'purple' },
  { label: 'Anomaly Detection', value: '<250ns', subtext: 'AI Inline', color: 'orange' },
  { label: 'Active Power', value: '8mW', subtext: 'Ultra Efficient', color: 'orange' }
];

export const TEAM: TeamMember[] = [
  { name: 'Dr. Sarah Chen', role: 'ASIC Architect', image: 'https://picsum.photos/seed/sarah/400/400' },
  { name: 'Marcus Thorne', role: 'ML Systems Engineer', image: 'https://picsum.photos/seed/marcus/400/400' },
  { name: 'Elena Rodriguez', role: 'Verification Lead', image: 'https://picsum.photos/seed/elena/400/400' }
];