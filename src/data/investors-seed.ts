import { createId } from '@paralleldrive/cuid2';

// Indian investor data
const indianVCFirms = [
  'Sequoia Capital India', 'Accel Partners', 'Matrix Partners India', 'Lightspeed India',
  'Blume Ventures', 'Kalaari Capital', 'SAIF Partners', 'Nexus Venture Partners',
  'Chiratae Ventures', 'Stellaris Venture Partners', 'Prime Venture Partners',
  'Elevation Capital', '3one4 Capital', 'Arkam Ventures', 'Together Fund',
  'India Quotient', 'Orios Venture Partners', 'Inventus Capital', 'Fireside Ventures',
  'Lightbox Ventures', 'Iron Pillar', 'A91 Partners', 'WestBridge Capital',
  'Steadview Capital', 'Tiger Global India', 'SoftBank India', 'Temasek India',
  'GIC India', 'Peak XV Partners', 'Jungle Ventures', 'Vertex Ventures SEA & India',
  'Beenext', 'Tanglin Venture Partners', 'Arali Ventures', 'Good Capital',
  'Better Capital', 'Venture Highway', 'pi Ventures', 'Endiya Partners',
  'IvyCap Ventures', 'Unitus Ventures', 'Omnivore', 'Aavishkaar Capital',
  'CDC Group India', 'LeapFrog Investments', 'Lok Capital', 'Elevar Equity',
  'IIFL Asset Management', 'Kotak Investment Advisors', 'Trifecta Capital',
  'Alteria Capital', 'Stride Ventures', 'Unicorn India Ventures', 'Mumbai Angels',
  'Indian Angel Network', 'LetsVenture', 'AngelList India', 'Chennai Angels',
  'Hyderabad Angels', 'Calcutta Angels Network', 'Bangalore Angels', 'Delhi Angels',
  'Lead Angels', 'Inflection Point Ventures', 'We Founder Circle', 'Venture Catalysts',
  '100X.VC', 'Z Nation Lab', 'GSF Accelerator', 'Antler India', 'Entrepreneur First India'
];

const angelInvestors = [
  'Rajan Anandan', 'Kunal Shah', 'Girish Mathrubootham', 'Nithin Kamath', 'Nikhil Kamath',
  'Binny Bansal', 'Sachin Bansal', 'Ritesh Agarwal', 'Bhavish Aggarwal', 'Vijay Shekhar Sharma',
  'Deepinder Goyal', 'Harsh Jain', 'Ananth Narayanan', 'Mukesh Bansal', 'Ankit Nagori',
  'Mekin Maheshwari', 'Aprameya Radhakrishna', 'Varun Alagh', 'Ghazal Alagh', 'Shashank Kumar',
  'Harshil Mathur', 'Lalit Keshre', 'Jitendra Gupta', 'Amrish Rau', 'Lizzie Chapman',
  'Ankur Warikoo', 'Tanmay Bhat', 'Ranveer Allahbadia', 'Raj Shamani', 'Shradha Sharma',
  'Anupam Mittal', 'Peyush Bansal', 'Aman Gupta', 'Vineeta Singh', 'Namita Thapar',
  'Amit Jain', 'Ashneer Grover', 'Gazal Kalra', 'Radhika Gupta', 'Falguni Nayar'
];

const sectors = [
  'Fintech', 'Edtech', 'Healthtech', 'E-commerce', 'SaaS', 'DeepTech',
  'AgriTech', 'Logistics', 'FoodTech', 'PropTech', 'InsurTech', 'LegalTech',
  'HRTech', 'RetailTech', 'TravelTech', 'Gaming', 'Entertainment', 'Media',
  'CleanTech', 'EnergyTech', 'Mobility', 'SpaceTech', 'BioTech', 'AI/ML',
  'Blockchain', 'IoT', 'Cybersecurity', 'D2C Brands', 'B2B Marketplace',
  'Social Commerce', 'Creator Economy', 'Web3', 'Climate Tech', 'Mental Health'
];

const stages = ['pre_seed', 'seed', 'series_a', 'series_b', 'series_c', 'growth'];

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
  'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
  'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
  'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Vasai-Virar', 'Varanasi'
];

const investmentTheses = [
  'We back exceptional founders building category-defining companies in India',
  'Focused on early-stage B2B SaaS companies targeting global markets',
  'Investing in the digital transformation of traditional industries',
  'Supporting founders leveraging AI/ML to solve real-world problems',
  'Backing innovative fintech solutions for the next billion users',
  'Investing in sustainable and climate-positive businesses',
  'Supporting D2C brands building for the aspirational Indian consumer',
  'Focused on deep-tech innovations coming out of Indian research labs',
  'Investing in the future of work and education in India',
  'Backing founders building for Bharat - tier 2/3 cities and rural India',
  'Supporting healthcare innovations making quality care accessible',
  'Investing in the creator economy and new media platforms',
  'Focused on agritech solutions improving farmer incomes',
  'Backing logistics and supply chain innovations',
  'Supporting founders building the infrastructure for Digital India'
];

// Portfolio companies
const portfolioCompanies = [
  'Razorpay', 'CRED', 'Unacademy', 'Udaan', 'ShareChat', 'Meesho', 'PhonePe',
  'Groww', 'UpGrad', 'Vedantu', 'Cars24', 'Spinny', 'Urban Company', 'Licious',
  'PharmEasy', '1mg', 'PolicyBazaar', 'PaisaBazaar', 'BharatPe', 'Pine Labs',
  'Billdesk', 'Zerodha', 'Paytm', 'Zomato', 'Swiggy', 'Ola', 'Rapido',
  'redBus', 'AbhiBus', 'Yatra', 'MakeMyTrip', 'Goibibo', 'OYO', 'Zostel',
  'Treebo', 'FabHotels', 'Cure.fit', 'HealthifyMe', 'Practo', 'Portea Medical',
  'Lenskart', 'Pepperfry', 'FirstCry', 'Myntra', 'Nykaa', 'Mamaearth',
  'Sugar Cosmetics', 'boAt', 'Noise', 'Wakefit', 'The Sleep Company', 'Atomberg',
  'Ather Energy', 'Ola Electric', 'Revolt Motors', 'Simple Energy', 'Bounce',
  'Vogo', 'Yulu', 'Rapido Bike', 'Dunzo', 'Shadowfax', 'Delhivery', 'Ecom Express',
  'BlackBuck', 'Rivigo', 'ElasticRun', 'Loadshare', 'Porter', 'Vahak'
];

function getRandomElements<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateTicketSize(type: string) {
  const ticketSizes = {
    angel: { min: 25000, max: 250000 },
    micro_vc: { min: 100000, max: 1000000 },
    seed: { min: 500000, max: 5000000 },
    vc: { min: 2000000, max: 50000000 },
    growth: { min: 10000000, max: 100000000 },
    corporate_vc: { min: 5000000, max: 50000000 },
    family_office: { min: 1000000, max: 20000000 },
    accelerator: { min: 50000, max: 500000 }
  };

  const range = ticketSizes[type as keyof typeof ticketSizes] || ticketSizes.vc;
  return {
    min: range.min,
    max: range.max,
    currency: 'USD'
  };
}

function generateEmail(name: string, firm: string): string {
  const firstName = name.split(' ')[0].toLowerCase();
  const domain = firm.toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  
  const formats = [
    `${firstName}@${domain}.com`,
    `${firstName}@${domain}.vc`,
    `${firstName}@${domain}.in`,
    `contact@${domain}.com`,
    `investments@${domain}.com`,
    `${firstName}.investor@${domain}.com`
  ];
  
  return formats[Math.floor(Math.random() * formats.length)];
}

function generateLinkedIn(name: string): string {
  const firstName = name.split(' ')[0].toLowerCase();
  const lastName = name.split(' ').slice(-1)[0].toLowerCase();
  const formats = [
    `https://linkedin.com/in/${firstName}${lastName}`,
    `https://linkedin.com/in/${firstName}-${lastName}`,
    `https://linkedin.com/in/${firstName}${lastName}india`,
    `https://linkedin.com/in/${firstName}-${lastName}-investor`
  ];
  
  return formats[Math.floor(Math.random() * formats.length)];
}

export function generateInvestors() {
  const investors = [];
  
  // Generate VC firm partners (400 investors from 70 firms)
  let investorCount = 0;
  
  for (const firm of indianVCFirms) {
    const partnersCount = Math.floor(Math.random() * 4) + 3; // 3-6 partners per firm
    
    for (let i = 0; i < partnersCount; i++) {
      const partnerTitles = ['Managing Partner', 'General Partner', 'Partner', 'Principal', 'Investment Director'];
      const title = partnerTitles[Math.floor(Math.random() * partnerTitles.length)];
      
      // Generate realistic Indian names
      const firstNames = ['Amit', 'Priya', 'Rajesh', 'Sneha', 'Vikram', 'Anita', 'Deepak', 'Kavita', 'Suresh', 'Neha'];
      const lastNames = ['Sharma', 'Gupta', 'Patel', 'Singh', 'Kumar', 'Mehta', 'Verma', 'Agarwal', 'Reddy', 'Nair'];
      
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      
      const investorType = firm.includes('Angel') ? 'angel' : 
                          firm.includes('Micro') || firm.includes('100X') ? 'micro_vc' :
                          firm.includes('Accelerator') || firm.includes('GSF') ? 'accelerator' :
                          'vc';
      
      const investorStages = investorType === 'angel' ? ['pre_seed', 'seed'] :
                            investorType === 'micro_vc' ? ['pre_seed', 'seed'] :
                            investorType === 'accelerator' ? ['pre_seed'] :
                            getRandomElements(stages, Math.floor(Math.random() * 3) + 2);
      
      investors.push({
        id: createId(),
        name: `${name}`,
        firmName: firm,
        type: investorType,
        stage: investorStages,
        sectors: getRandomElements(sectors, Math.floor(Math.random() * 5) + 3),
        ticketSize: generateTicketSize(investorType),
        location: 'India',
        city: cities[Math.floor(Math.random() * 10)], // Top 10 cities more likely
        country: 'India',
        email: generateEmail(name, firm),
        linkedinUrl: generateLinkedIn(name),
        website: `https://${firm.toLowerCase().replace(/\s+/g, '')}.com`,
        bio: `${title} at ${firm}. ${Math.floor(Math.random() * 15) + 5}+ years of experience in venture capital and startup ecosystem. Portfolio includes ${getRandomElements(portfolioCompanies, 3).join(', ')}.`,
        portfolioCompanies: getRandomElements(portfolioCompanies, Math.floor(Math.random() * 10) + 5),
        totalInvestments: Math.floor(Math.random() * 100) + 20,
        activeStatus: true,
        preferredContactMethod: ['email', 'linkedin', 'website'][Math.floor(Math.random() * 3)],
        investmentThesis: investmentTheses[Math.floor(Math.random() * investmentTheses.length)],
        tags: ['verified', investorType, ...investorStages],
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      investorCount++;
      if (investorCount >= 400) break;
    }
    if (investorCount >= 400) break;
  }
  
  // Generate Angel Investors (300)
  const angelFirstNames = ['Rahul', 'Pooja', 'Arun', 'Divya', 'Karthik', 'Shruti', 'Manish', 'Ritu', 'Sanjay', 'Anjali'];
  const angelLastNames = ['Malhotra', 'Chopra', 'Bhatia', 'Kapoor', 'Khanna', 'Arora', 'Tandon', 'Saini', 'Ahuja', 'Bajaj'];
  
  for (let i = 0; i < 300; i++) {
    const firstName = angelFirstNames[Math.floor(Math.random() * angelFirstNames.length)];
    const lastName = angelLastNames[Math.floor(Math.random() * angelLastNames.length)];
    const name = `${firstName} ${lastName}`;
    
    const background = [
      'Serial Entrepreneur', 'Former CTO', 'Ex-Google', 'Ex-Amazon', 'Ex-Microsoft',
      'Former CFO', 'Ex-McKinsey', 'Former VP Engineering', 'Product Leader',
      'Growth Expert', 'Marketing Veteran', 'Operations Expert'
    ];
    
    investors.push({
      id: createId(),
      name: name,
      firmName: `${name} Investments`,
      type: 'angel',
      stage: ['pre_seed', 'seed'],
      sectors: getRandomElements(sectors, Math.floor(Math.random() * 3) + 2),
      ticketSize: generateTicketSize('angel'),
      location: 'India',
      city: cities[Math.floor(Math.random() * cities.length)],
      country: 'India',
      email: `${firstName.toLowerCase()}@angel.in`,
      linkedinUrl: generateLinkedIn(name),
      website: null,
      bio: `${background[Math.floor(Math.random() * background.length)]}. Angel investor with ${Math.floor(Math.random() * 50) + 10}+ investments. Focus on ${getRandomElements(sectors, 2).join(' and ')}.`,
      portfolioCompanies: getRandomElements(portfolioCompanies, Math.floor(Math.random() * 5) + 2),
      totalInvestments: Math.floor(Math.random() * 50) + 10,
      activeStatus: true,
      preferredContactMethod: 'linkedin',
      investmentThesis: `Backing exceptional founders in ${getRandomElements(sectors, 2).join(' and ')} space`,
      tags: ['angel', 'individual', ...getRandomElements(sectors, 2)],
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  
  // Generate International VCs with India focus (200)
  const intlVCs = [
    'Sequoia Capital', 'Accel', 'Tiger Global', 'SoftBank Vision Fund', 'Temasek',
    'GIC', 'Prosus Ventures', 'Tencent', 'Alibaba Capital', 'Google Ventures',
    'Microsoft Ventures', 'Qualcomm Ventures', 'Intel Capital', 'Cisco Investments',
    'Samsung Ventures', 'Sony Innovation Fund', 'Rakuten Capital', 'SBI Investment',
    'KDDI Ventures', 'Vertex Ventures', 'Golden Gate Ventures', 'East Ventures',
    'Insignia Ventures', 'Alpha JWC', 'Openspace Ventures', '500 Startups',
    'Y Combinator', 'Techstars', 'Antler', 'Entrepreneur First'
  ];
  
  for (const firm of intlVCs.slice(0, 40)) {
    const partnersCount = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < partnersCount; i++) {
      const firstNames = ['David', 'Sarah', 'Michael', 'Jennifer', 'James', 'Lisa', 'Robert', 'Emily', 'William', 'Jessica'];
      const lastNames = ['Chen', 'Wang', 'Lee', 'Park', 'Kim', 'Tan', 'Lim', 'Wong', 'Singh', 'Patel'];
      
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      
      investors.push({
        id: createId(),
        name: name,
        firmName: `${firm} (India)`,
        type: 'vc',
        stage: getRandomElements(stages.slice(1), Math.floor(Math.random() * 3) + 2),
        sectors: getRandomElements(sectors, Math.floor(Math.random() * 4) + 3),
        ticketSize: generateTicketSize('vc'),
        location: 'Singapore/India',
        city: ['Singapore', 'Mumbai', 'Bangalore', 'Delhi'][Math.floor(Math.random() * 4)],
        country: 'India',
        email: generateEmail(name, firm),
        linkedinUrl: generateLinkedIn(name),
        website: `https://${firm.toLowerCase().replace(/\s+/g, '')}.com/india`,
        bio: `${['Partner', 'Managing Director', 'Principal'][Math.floor(Math.random() * 3)]} at ${firm}, focused on India and Southeast Asia investments.`,
        portfolioCompanies: getRandomElements(portfolioCompanies, Math.floor(Math.random() * 8) + 5),
        totalInvestments: Math.floor(Math.random() * 80) + 30,
        activeStatus: true,
        preferredContactMethod: 'email',
        investmentThesis: `Investing in India's digital transformation and next unicorns`,
        tags: ['international', 'growth', ...getRandomElements(sectors, 2)],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }
  
  // Generate Micro VCs and Accelerators (100)
  const microVCs = [
    'First Cheque', 'Titan Capital', 'Sauce.vc', 'Artha Venture Fund',
    'Unicorn India Ventures', 'YourNest Venture Capital', 'Ideaspring Capital',
    'Axilor Ventures', 'Villgro', 'Caspian Impact Investment'
  ];
  
  for (const firm of microVCs) {
    const partnersCount = Math.floor(Math.random() * 2) + 2;
    
    for (let i = 0; i < partnersCount; i++) {
      const firstName = angelFirstNames[Math.floor(Math.random() * angelFirstNames.length)];
      const lastName = angelLastNames[Math.floor(Math.random() * angelLastNames.length)];
      const name = `${firstName} ${lastName}`;
      
      investors.push({
        id: createId(),
        name: name,
        firmName: firm,
        type: 'micro_vc',
        stage: ['pre_seed', 'seed'],
        sectors: getRandomElements(sectors, Math.floor(Math.random() * 3) + 2),
        ticketSize: generateTicketSize('micro_vc'),
        location: 'India',
        city: cities[Math.floor(Math.random() * 5)],
        country: 'India',
        email: generateEmail(name, firm),
        linkedinUrl: generateLinkedIn(name),
        website: `https://${firm.toLowerCase().replace(/\s+/g, '')}.com`,
        bio: `${['Partner', 'Principal'][Math.floor(Math.random() * 2)]} at ${firm}. First cheque investor in early-stage startups.`,
        portfolioCompanies: getRandomElements(portfolioCompanies, Math.floor(Math.random() * 5) + 3),
        totalInvestments: Math.floor(Math.random() * 40) + 15,
        activeStatus: true,
        preferredContactMethod: 'email',
        investmentThesis: `Writing first cheques for ambitious founders`,
        tags: ['micro_vc', 'first_cheque', 'early_stage'],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }
  
  return investors;
}

// Generate additional metadata for investors
export function generateInvestorContacts(investors: any[]) {
  const contacts = [];
  
  for (const investor of investors) {
    // Primary email
    if (investor.email) {
      contacts.push({
        id: createId(),
        investorId: investor.id,
        type: 'email',
        value: investor.email,
        isPrimary: true,
        notes: 'Primary contact email',
        createdAt: new Date()
      });
    }
    
    // LinkedIn
    if (investor.linkedinUrl) {
      contacts.push({
        id: createId(),
        investorId: investor.id,
        type: 'linkedin',
        value: investor.linkedinUrl,
        isPrimary: false,
        notes: 'LinkedIn profile',
        createdAt: new Date()
      });
    }
    
    // Some investors might have Twitter
    if (Math.random() > 0.7) {
      const twitterHandle = `@${investor.name.split(' ')[0].toLowerCase()}${Math.floor(Math.random() * 100)}`;
      contacts.push({
        id: createId(),
        investorId: investor.id,
        type: 'twitter',
        value: `https://twitter.com/${twitterHandle}`,
        isPrimary: false,
        notes: 'Twitter handle',
        createdAt: new Date()
      });
    }
  }
  
  return contacts;
}

export const INVESTOR_DATA = generateInvestors();
export const INVESTOR_CONTACTS = generateInvestorContacts(INVESTOR_DATA);