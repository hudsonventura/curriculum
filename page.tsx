import { Timeline, type TimelineItem } from "@/components/timeline"

// Sample timeline data with subitems
const timelineItems: TimelineItem[] = [
  {
    id: 1,
    heading: "Company Founded",
    subtitle: "Beginning of our journey",
    date: "January 2020",
    content: "Our company was founded with a mission to create innovative solutions for modern problems.",
    subitems: [
      {
        id: "1-1",
        heading: "Initial Team Formation",
        date: "January 15, 2020",
        content: "Assembled a team of 5 founding members with diverse expertise.",
      },
      {
        id: "1-2",
        heading: "Business Plan Development",
        date: "January 28, 2020",
        content: "Created comprehensive business plan and secured initial seed funding.",
      },
    ],
  },
  {
    id: 2,
    heading: "First Major Client",
    subtitle: "Milestone achievement",
    date: "March 2020",
    content: "We secured our first major client and began working on our flagship product.",
    subitems: [
      {
        id: "2-1",
        heading: "Contract Negotiation",
        date: "March 10, 2020",
        content: "Successfully negotiated a 2-year contract with flexible terms.",
      },
      {
        id: "2-2",
        heading: "Project Kickoff",
        date: "March 25, 2020",
        content: "Established project milestones and development roadmap.",
      },
    ],
  },
  {
    id: 3,
    heading: "Product Launch",
    subtitle: "Market introduction",
    date: "September 2020",
    content: "Successfully launched our product to the market with positive feedback from early adopters.",
    subitems: [
      {
        id: "3-1",
        heading: "Beta Testing Phase",
        date: "August 5, 2020",
        content: "Conducted extensive beta testing with 200+ users.",
      },
      {
        id: "3-2",
        heading: "Marketing Campaign",
        date: "August 20, 2020",
        content: "Launched multi-channel marketing campaign reaching over 50,000 potential customers.",
      },
      {
        id: "3-3",
        heading: "Press Coverage",
        date: "September 15, 2020",
        content: "Featured in 3 major industry publications.",
      },
    ],
  },
  {
    id: 4,
    heading: "International Expansion",
    subtitle: "Global growth",
    date: "February 2021",
    content: "Expanded our operations to international markets, opening offices in Europe and Asia.",
  },
  {
    id: 5,
    heading: "Series A Funding",
    subtitle: "Financial milestone",
    date: "November 2021",
    content: "Secured $10M in Series A funding to accelerate growth and product development.",
    subitems: [
      {
        id: "5-1",
        heading: "Investor Presentations",
        date: "September 5, 2021",
        content: "Delivered 12 investor presentations over a 3-month period.",
      },
      {
        id: "5-2",
        heading: "Term Sheet Negotiation",
        date: "October 18, 2021",
        content: "Negotiated favorable terms with lead investor.",
      },
    ],
  },
]

export default function Home() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Company Timeline</h1>
      <Timeline items={timelineItems} />
    </div>
  )
}
