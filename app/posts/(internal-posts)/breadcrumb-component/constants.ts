import type { Directory } from '@/app/posts/(internal-posts)/breadcrumb-component/page';

export const DIRECTORY: Directory[] = [
  {
    id: 'engineering',
    name: 'Engineering',
    children: [
      {
        id: 'engineering/onboarding',
        name: 'Onboarding',
        children: [
          {
            id: 'engineering/onboarding/day-1-checklist',
            name: 'Day 1 Checklist',
            children: [],
          },
          {
            id: 'engineering/onboarding/hardware-setup-guide',
            name: 'Hardware Setup Guide',
            children: [],
          },
          {
            id: 'engineering/onboarding/development-environment',
            name: 'Development Environment',
            children: [
              {
                id: 'engineering/onboarding/development-environment/local-setup',
                name: 'Local Setup',
                children: [],
              },
              {
                id: 'engineering/onboarding/development-environment/docker-configuration',
                name: 'Docker Configuration',
                children: [],
              },
              {
                id: 'engineering/onboarding/development-environment/ide-setup',
                name: 'IDE Setup',
                children: [],
              },
            ],
          },
          {
            id: 'engineering/onboarding/access-requests',
            name: 'Access Requests',
            children: [],
          },
        ],
      },
      {
        id: 'engineering/documentation',
        name: 'Documentation',
        children: [
          {
            id: 'engineering/documentation/architecture',
            name: 'Architecture',
            children: [
              {
                id: 'engineering/documentation/architecture/system-design',
                name: 'System Design',
                children: [],
              },
              {
                id: 'engineering/documentation/architecture/api-documentation',
                name: 'API Documentation',
                children: [],
              },
              {
                id: 'engineering/documentation/architecture/database-schema',
                name: 'Database Schema',
                children: [],
              },
            ],
          },
          {
            id: 'engineering/documentation/runbooks',
            name: 'Runbooks',
            children: [
              {
                id: 'engineering/documentation/runbooks/deployment-process',
                name: 'Deployment Process',
                children: [],
              },
              {
                id: 'engineering/documentation/runbooks/incident-response',
                name: 'Incident Response',
                children: [],
              },
              {
                id: 'engineering/documentation/runbooks/monitoring-and-alerts',
                name: 'Monitoring & Alerts',
                children: [],
              },
            ],
          },
          {
            id: 'engineering/documentation/code-standards',
            name: 'Code Standards',
            children: [
              {
                id: 'engineering/documentation/code-standards/style-guide',
                name: 'Style Guide',
                children: [],
              },
              {
                id: 'engineering/documentation/code-standards/review-process',
                name: 'Review Process',
                children: [],
              },
              {
                id: 'engineering/documentation/code-standards/testing-guidelines',
                name: 'Testing Guidelines',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 'engineering/team-resources',
        name: 'Team Resources',
        children: [
          {
            id: 'engineering/team-resources/standup-notes',
            name: 'Standup Notes',
            children: [],
          },
          {
            id: 'engineering/team-resources/retrospectives',
            name: 'Retrospectives',
            children: [],
          },
          {
            id: 'engineering/team-resources/tech-talks',
            name: 'Tech Talks',
            children: [
              {
                id: 'engineering/team-resources/tech-talks/2024-archive',
                name: '2024 Archive',
                children: [],
              },
              {
                id: 'engineering/team-resources/tech-talks/2025-schedule',
                name: '2025 Schedule',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'product',
    name: 'Product',
    children: [
      {
        id: 'product/roadmap',
        name: 'Roadmap',
        children: [
          {
            id: 'product/roadmap/q1-2025',
            name: 'Q1 2025',
            children: [
              {
                id: 'product/roadmap/q1-2025/feature-user-dashboard',
                name: 'Feature: User Dashboard',
                children: [],
              },
              {
                id: 'product/roadmap/q1-2025/feature-analytics-integration',
                name: 'Feature: Analytics Integration',
                children: [],
              },
            ],
          },
          {
            id: 'product/roadmap/q2-2025',
            name: 'Q2 2025',
            children: [
              {
                id: 'product/roadmap/q2-2025/feature-mobile-app',
                name: 'Feature: Mobile App',
                children: [],
              },
              {
                id: 'product/roadmap/q2-2025/feature-api-v2',
                name: 'Feature: API v2',
                children: [],
              },
            ],
          },
          { id: 'product/roadmap/backlog', name: 'Backlog', children: [] },
        ],
      },
      {
        id: 'product/research',
        name: 'Research',
        children: [
          {
            id: 'product/research/user-interviews',
            name: 'User Interviews',
            children: [
              {
                id: 'product/research/user-interviews/q4-2024',
                name: 'Q4 2024',
                children: [],
              },
              {
                id: 'product/research/user-interviews/q1-2025',
                name: 'Q1 2025',
                children: [],
              },
            ],
          },
          {
            id: 'product/research/competitive-analysis',
            name: 'Competitive Analysis',
            children: [
              {
                id: 'product/research/competitive-analysis/direct-competitors',
                name: 'Direct Competitors',
                children: [],
              },
              {
                id: 'product/research/competitive-analysis/market-trends',
                name: 'Market Trends',
                children: [],
              },
            ],
          },
          {
            id: 'product/research/user-surveys',
            name: 'User Surveys',
            children: [],
          },
        ],
      },
      {
        id: 'product/features',
        name: 'Features',
        children: [
          {
            id: 'product/features/in-progress',
            name: 'In Progress',
            children: [
              {
                id: 'product/features/in-progress/dark-mode',
                name: 'Dark Mode',
                children: [],
              },
              {
                id: 'product/features/in-progress/export-functionality',
                name: 'Export Functionality',
                children: [],
              },
            ],
          },
          {
            id: 'product/features/completed',
            name: 'Completed',
            children: [
              {
                id: 'product/features/completed/2024-features',
                name: '2024 Features',
                children: [],
              },
              {
                id: 'product/features/completed/2025-features',
                name: '2025 Features',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'design',
    name: 'Design',
    children: [
      {
        id: 'design/design-system',
        name: 'Design System',
        children: [
          {
            id: 'design/design-system/components',
            name: 'Components',
            children: [
              {
                id: 'design/design-system/components/buttons',
                name: 'Buttons',
                children: [],
              },
              {
                id: 'design/design-system/components/forms',
                name: 'Forms',
                children: [],
              },
              {
                id: 'design/design-system/components/navigation',
                name: 'Navigation',
                children: [],
              },
            ],
          },
          {
            id: 'design/design-system/typography',
            name: 'Typography',
            children: [],
          },
          {
            id: 'design/design-system/color-palette',
            name: 'Color Palette',
            children: [],
          },
          {
            id: 'design/design-system/icons',
            name: 'Icons',
            children: [
              {
                id: 'design/design-system/icons/icon-library',
                name: 'Icon Library',
                children: [],
              },
              {
                id: 'design/design-system/icons/usage-guidelines',
                name: 'Usage Guidelines',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 'design/assets',
        name: 'Assets',
        children: [
          {
            id: 'design/assets/brand-guidelines',
            name: 'Brand Guidelines',
            children: [],
          },
          {
            id: 'design/assets/logos',
            name: 'Logos',
            children: [
              {
                id: 'design/assets/logos/primary-logo',
                name: 'Primary Logo',
                children: [],
              },
              {
                id: 'design/assets/logos/variations',
                name: 'Variations',
                children: [],
              },
            ],
          },
          {
            id: 'design/assets/illustrations',
            name: 'Illustrations',
            children: [],
          },
          {
            id: 'design/assets/photography',
            name: 'Photography',
            children: [],
          },
        ],
      },
      {
        id: 'design/projects',
        name: 'Projects',
        children: [
          {
            id: 'design/projects/website-redesign',
            name: 'Website Redesign',
            children: [
              {
                id: 'design/projects/website-redesign/wireframes',
                name: 'Wireframes',
                children: [],
              },
              {
                id: 'design/projects/website-redesign/mockups',
                name: 'Mockups',
                children: [],
              },
              {
                id: 'design/projects/website-redesign/prototypes',
                name: 'Prototypes',
                children: [],
              },
            ],
          },
          {
            id: 'design/projects/mobile-app-design',
            name: 'Mobile App Design',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    children: [
      {
        id: 'marketing/campaigns',
        name: 'Campaigns',
        children: [
          {
            id: 'marketing/campaigns/q1-2025',
            name: 'Q1 2025',
            children: [
              {
                id: 'marketing/campaigns/q1-2025/product-launch',
                name: 'Product Launch',
                children: [],
              },
              {
                id: 'marketing/campaigns/q1-2025/brand-awareness',
                name: 'Brand Awareness',
                children: [],
              },
            ],
          },
          {
            id: 'marketing/campaigns/social-media',
            name: 'Social Media',
            children: [
              {
                id: 'marketing/campaigns/social-media/content-calendar',
                name: 'Content Calendar',
                children: [],
              },
              {
                id: 'marketing/campaigns/social-media/templates',
                name: 'Templates',
                children: [],
              },
            ],
          },
          {
            id: 'marketing/campaigns/email-marketing',
            name: 'Email Marketing',
            children: [
              {
                id: 'marketing/campaigns/email-marketing/newsletters',
                name: 'Newsletters',
                children: [],
              },
              {
                id: 'marketing/campaigns/email-marketing/automation-sequences',
                name: 'Automation Sequences',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 'marketing/content',
        name: 'Content',
        children: [
          {
            id: 'marketing/content/blog-posts',
            name: 'Blog Posts',
            children: [
              {
                id: 'marketing/content/blog-posts/published',
                name: 'Published',
                children: [],
              },
              {
                id: 'marketing/content/blog-posts/drafts',
                name: 'Drafts',
                children: [],
              },
            ],
          },
          {
            id: 'marketing/content/case-studies',
            name: 'Case Studies',
            children: [],
          },
          {
            id: 'marketing/content/white-papers',
            name: 'White Papers',
            children: [],
          },
          {
            id: 'marketing/content/video-content',
            name: 'Video Content',
            children: [
              {
                id: 'marketing/content/video-content/tutorials',
                name: 'Tutorials',
                children: [],
              },
              {
                id: 'marketing/content/video-content/product-demos',
                name: 'Product Demos',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 'marketing/analytics',
        name: 'Analytics',
        children: [
          {
            id: 'marketing/analytics/website-metrics',
            name: 'Website Metrics',
            children: [],
          },
          {
            id: 'marketing/analytics/campaign-performance',
            name: 'Campaign Performance',
            children: [],
          },
          {
            id: 'marketing/analytics/seo-reports',
            name: 'SEO Reports',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 'sales',
    name: 'Sales',
    children: [
      {
        id: 'sales/processes',
        name: 'Processes',
        children: [
          {
            id: 'sales/processes/sales-playbook',
            name: 'Sales Playbook',
            children: [],
          },
          {
            id: 'sales/processes/qualification-framework',
            name: 'Qualification Framework',
            children: [],
          },
          {
            id: 'sales/processes/closing-procedures',
            name: 'Closing Procedures',
            children: [],
          },
        ],
      },
      {
        id: 'sales/templates',
        name: 'Templates',
        children: [
          {
            id: 'sales/templates/email-templates',
            name: 'Email Templates',
            children: [
              {
                id: 'sales/templates/email-templates/cold-outreach',
                name: 'Cold Outreach',
                children: [],
              },
              {
                id: 'sales/templates/email-templates/follow-ups',
                name: 'Follow-ups',
                children: [],
              },
              {
                id: 'sales/templates/email-templates/proposals',
                name: 'Proposals',
                children: [],
              },
            ],
          },
          {
            id: 'sales/templates/pitch-decks',
            name: 'Pitch Decks',
            children: [
              {
                id: 'sales/templates/pitch-decks/standard-deck',
                name: 'Standard Deck',
                children: [],
              },
              {
                id: 'sales/templates/pitch-decks/customized-versions',
                name: 'Customized Versions',
                children: [],
              },
            ],
          },
          { id: 'sales/templates/contracts', name: 'Contracts', children: [] },
        ],
      },
      {
        id: 'sales/resources',
        name: 'Resources',
        children: [
          {
            id: 'sales/resources/product-knowledge-base',
            name: 'Product Knowledge Base',
            children: [],
          },
          {
            id: 'sales/resources/competitive-battle-cards',
            name: 'Competitive Battle Cards',
            children: [],
          },
          {
            id: 'sales/resources/pricing-information',
            name: 'Pricing Information',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 'hr',
    name: 'HR',
    children: [
      {
        id: 'hr/policies',
        name: 'Policies',
        children: [
          {
            id: 'hr/policies/employee-handbook',
            name: 'Employee Handbook',
            children: [],
          },
          {
            id: 'hr/policies/code-of-conduct',
            name: 'Code of Conduct',
            children: [],
          },
          {
            id: 'hr/policies/remote-work-policy',
            name: 'Remote Work Policy',
            children: [],
          },
          {
            id: 'hr/policies/time-off-policy',
            name: 'Time Off Policy',
            children: [],
          },
        ],
      },
      {
        id: 'hr/onboarding',
        name: 'Onboarding',
        children: [
          {
            id: 'hr/onboarding/new-hire-checklist',
            name: 'New Hire Checklist',
            children: [],
          },
          {
            id: 'hr/onboarding/orientation-schedule',
            name: 'Orientation Schedule',
            children: [],
          },
          {
            id: 'hr/onboarding/training-materials',
            name: 'Training Materials',
            children: [
              {
                id: 'hr/onboarding/training-materials/company-culture',
                name: 'Company Culture',
                children: [],
              },
              {
                id: 'hr/onboarding/training-materials/tools-and-systems',
                name: 'Tools & Systems',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 'hr/benefits',
        name: 'Benefits',
        children: [
          {
            id: 'hr/benefits/health-insurance',
            name: 'Health Insurance',
            children: [],
          },
          {
            id: 'hr/benefits/401k-information',
            name: '401(k) Information',
            children: [],
          },
          {
            id: 'hr/benefits/pto-and-holidays',
            name: 'PTO & Holidays',
            children: [],
          },
          {
            id: 'hr/benefits/wellness-programs',
            name: 'Wellness Programs',
            children: [],
          },
        ],
      },
      {
        id: 'hr/performance',
        name: 'Performance',
        children: [
          {
            id: 'hr/performance/review-process',
            name: 'Review Process',
            children: [],
          },
          {
            id: 'hr/performance/goal-setting',
            name: 'Goal Setting',
            children: [],
          },
          {
            id: 'hr/performance/career-development',
            name: 'Career Development',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 'finance',
    name: 'Finance',
    children: [
      {
        id: 'finance/budgets',
        name: 'Budgets',
        children: [
          {
            id: 'finance/budgets/2025-annual-budget',
            name: '2025 Annual Budget',
            children: [
              {
                id: 'finance/budgets/2025-annual-budget/department-budgets',
                name: 'Department Budgets',
                children: [],
              },
              {
                id: 'finance/budgets/2025-annual-budget/capital-expenditures',
                name: 'Capital Expenditures',
                children: [],
              },
            ],
          },
          {
            id: 'finance/budgets/monthly-reports',
            name: 'Monthly Reports',
            children: [],
          },
        ],
      },
      {
        id: 'finance/reports',
        name: 'Reports',
        children: [
          {
            id: 'finance/reports/financial-statements',
            name: 'Financial Statements',
            children: [
              {
                id: 'finance/reports/financial-statements/p-and-l-statements',
                name: 'P&L Statements',
                children: [],
              },
              {
                id: 'finance/reports/financial-statements/balance-sheets',
                name: 'Balance Sheets',
                children: [],
              },
            ],
          },
          {
            id: 'finance/reports/expense-reports',
            name: 'Expense Reports',
            children: [],
          },
          {
            id: 'finance/reports/vendor-payments',
            name: 'Vendor Payments',
            children: [],
          },
        ],
      },
      {
        id: 'finance/processes',
        name: 'Processes',
        children: [
          {
            id: 'finance/processes/expense-reimbursement',
            name: 'Expense Reimbursement',
            children: [],
          },
          {
            id: 'finance/processes/invoice-processing',
            name: 'Invoice Processing',
            children: [],
          },
          {
            id: 'finance/processes/purchase-orders',
            name: 'Purchase Orders',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 'operations',
    name: 'Operations',
    children: [
      {
        id: 'operations/processes',
        name: 'Processes',
        children: [
          {
            id: 'operations/processes/sops',
            name: 'SOPs',
            children: [
              {
                id: 'operations/processes/sops/customer-support',
                name: 'Customer Support',
                children: [],
              },
              {
                id: 'operations/processes/sops/order-fulfillment',
                name: 'Order Fulfillment',
                children: [],
              },
              {
                id: 'operations/processes/sops/quality-assurance',
                name: 'Quality Assurance',
                children: [],
              },
            ],
          },
          {
            id: 'operations/processes/workflows',
            name: 'Workflows',
            children: [],
          },
        ],
      },
      {
        id: 'operations/tools-and-systems',
        name: 'Tools & Systems',
        children: [
          {
            id: 'operations/tools-and-systems/software-licenses',
            name: 'Software Licenses',
            children: [],
          },
          {
            id: 'operations/tools-and-systems/vendor-management',
            name: 'Vendor Management',
            children: [],
          },
          {
            id: 'operations/tools-and-systems/access-control',
            name: 'Access Control',
            children: [],
          },
        ],
      },
      {
        id: 'operations/resources',
        name: 'Resources',
        children: [
          {
            id: 'operations/resources/office-management',
            name: 'Office Management',
            children: [
              {
                id: 'operations/resources/office-management/facilities',
                name: 'Facilities',
                children: [],
              },
              {
                id: 'operations/resources/office-management/supplies',
                name: 'Supplies',
                children: [],
              },
            ],
          },
          {
            id: 'operations/resources/it-support',
            name: 'IT Support',
            children: [
              {
                id: 'operations/resources/it-support/troubleshooting-guides',
                name: 'Troubleshooting Guides',
                children: [],
              },
              {
                id: 'operations/resources/it-support/request-forms',
                name: 'Request Forms',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
] as const;
