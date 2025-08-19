-- Comprehensive Funding Database Schema
-- For P3 Course integration with resource page
-- Includes Incubator Schemes, Government Programs, Investor Database, and more

-- Drop existing tables if they exist
DROP TABLE IF EXISTS funding_resources CASCADE;
DROP TABLE IF EXISTS incubator_schemes CASCADE;
DROP TABLE IF EXISTS government_schemes CASCADE;
DROP TABLE IF EXISTS investor_database CASCADE;
DROP TABLE IF EXISTS funding_categories CASCADE;
DROP TABLE IF EXISTS funding_eligibility_criteria CASCADE;

-- Funding Categories Table
CREATE TABLE funding_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Main Funding Resources Table
CREATE TABLE funding_resources (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES funding_categories(id),
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'incubator', 'government', 'investor', 'accelerator', 'grant'
    status VARCHAR(30) DEFAULT 'active', -- 'active', 'inactive', 'upcoming'
    
    -- Funding details
    min_funding DECIMAL(15,2),
    max_funding DECIMAL(15,2),
    currency VARCHAR(10) DEFAULT 'INR',
    
    -- Location and sector
    location_type VARCHAR(20) DEFAULT 'india', -- 'india', 'global', 'state-specific'
    specific_location TEXT,
    sectors TEXT[], -- Array of sectors they focus on
    stage TEXT[], -- Array of funding stages
    
    -- Contact and application
    website VARCHAR(500),
    contact_email VARCHAR(200),
    contact_phone VARCHAR(50),
    application_link VARCHAR(500),
    
    -- Additional metadata
    success_rate DECIMAL(5,2),
    avg_decision_time INTEGER, -- in days
    equity_required BOOLEAN DEFAULT FALSE,
    collateral_required BOOLEAN DEFAULT FALSE,
    
    -- SEO and search
    tags TEXT[],
    search_keywords TEXT,
    
    -- Product access control
    required_products TEXT[], -- ['P3', 'P7', 'ALL_ACCESS']
    is_premium BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Incubator Schemes Table (Detailed)
CREATE TABLE incubator_schemes (
    id SERIAL PRIMARY KEY,
    funding_resource_id INTEGER REFERENCES funding_resources(id),
    
    -- Incubator specific details
    incubator_name VARCHAR(200) NOT NULL,
    program_name VARCHAR(200),
    program_duration INTEGER, -- in months
    batch_size INTEGER,
    batches_per_year INTEGER,
    
    -- Support offered
    seed_funding DECIMAL(15,2),
    office_space BOOLEAN DEFAULT FALSE,
    mentorship BOOLEAN DEFAULT FALSE,
    legal_support BOOLEAN DEFAULT FALSE,
    tech_credits BOOLEAN DEFAULT FALSE,
    lab_access BOOLEAN DEFAULT FALSE,
    
    -- Equity and terms
    equity_taken DECIMAL(5,2), -- percentage
    program_fee DECIMAL(15,2),
    demo_day BOOLEAN DEFAULT TRUE,
    
    -- Application details
    application_deadline DATE,
    next_batch_date DATE,
    selection_process TEXT,
    
    -- Success metrics
    alumni_count INTEGER,
    successful_exits INTEGER,
    total_funding_raised DECIMAL(15,2),
    
    -- Requirements
    min_team_size INTEGER,
    max_team_size INTEGER,
    mvp_required BOOLEAN DEFAULT FALSE,
    revenue_required BOOLEAN DEFAULT FALSE,
    min_revenue DECIMAL(15,2),
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Government Schemes Table
CREATE TABLE government_schemes (
    id SERIAL PRIMARY KEY,
    funding_resource_id INTEGER REFERENCES funding_resources(id),
    
    -- Government specific
    scheme_name VARCHAR(200) NOT NULL,
    department VARCHAR(200),
    ministry VARCHAR(200),
    scheme_code VARCHAR(100),
    
    -- Geographic scope
    central_scheme BOOLEAN DEFAULT TRUE,
    state_specific VARCHAR(50),
    districts TEXT[],
    
    -- Financial details
    grant_amount DECIMAL(15,2),
    subsidy_percentage DECIMAL(5,2),
    interest_subvention DECIMAL(5,2),
    
    -- Eligibility
    annual_turnover_limit DECIMAL(15,2),
    employment_limit INTEGER,
    age_limit INTEGER,
    gender_specific VARCHAR(20), -- 'any', 'women', 'sc/st'
    
    -- Application process
    online_application BOOLEAN DEFAULT TRUE,
    documents_required TEXT[],
    processing_time INTEGER, -- in days
    renewal_required BOOLEAN DEFAULT FALSE,
    
    -- Scheme timeline
    scheme_start_date DATE,
    scheme_end_date DATE,
    application_start DATE,
    application_end DATE,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Investor Database Table
CREATE TABLE investor_database (
    id SERIAL PRIMARY KEY,
    funding_resource_id INTEGER REFERENCES funding_resources(id),
    
    -- Investor details
    investor_name VARCHAR(200) NOT NULL,
    investor_type VARCHAR(50), -- 'angel', 'vc', 'pe', 'family_office', 'corporate_vc'
    firm_name VARCHAR(200),
    
    -- Investment preferences
    investment_stage TEXT[], -- ['pre_seed', 'seed', 'series_a', 'series_b', 'growth']
    check_size_min DECIMAL(15,2),
    check_size_max DECIMAL(15,2),
    sectors_focus TEXT[],
    geographic_focus TEXT[],
    
    -- Contact information
    linkedin_profile VARCHAR(500),
    twitter_handle VARCHAR(100),
    email VARCHAR(200),
    
    -- Investment stats
    portfolio_companies INTEGER,
    total_investments DECIMAL(15,2),
    successful_exits INTEGER,
    investment_frequency INTEGER, -- per year
    
    -- Approach strategy
    warm_intro_required BOOLEAN DEFAULT TRUE,
    cold_outreach_accepted BOOLEAN DEFAULT FALSE,
    preferred_approach TEXT,
    
    -- Additional info
    bio TEXT,
    investment_thesis TEXT,
    notable_investments TEXT[],
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Eligibility Criteria Table (for complex matching)
CREATE TABLE funding_eligibility_criteria (
    id SERIAL PRIMARY KEY,
    funding_resource_id INTEGER REFERENCES funding_resources(id),
    
    criteria_type VARCHAR(50) NOT NULL, -- 'revenue', 'team_size', 'location', 'sector', 'stage'
    criteria_value TEXT NOT NULL,
    operator VARCHAR(20) DEFAULT 'equals', -- 'equals', 'greater_than', 'less_than', 'in_array'
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_funding_resources_type ON funding_resources(type);
CREATE INDEX idx_funding_resources_location ON funding_resources(specific_location);
CREATE INDEX idx_funding_resources_sectors ON funding_resources USING GIN(sectors);
CREATE INDEX idx_funding_resources_stage ON funding_resources USING GIN(stage);
CREATE INDEX idx_funding_resources_tags ON funding_resources USING GIN(tags);
CREATE INDEX idx_funding_resources_products ON funding_resources USING GIN(required_products);

-- Insert base categories
INSERT INTO funding_categories (name, description, icon) VALUES
('Government Grants', 'Central and state government funding schemes', 'Building'),
('Incubators', 'Startup incubation programs with funding', 'Briefcase'),
('Accelerators', 'Startup acceleration programs', 'TrendingUp'),
('Angel Investors', 'Individual angel investors and networks', 'Users'),
('Venture Capital', 'VC firms and funds', 'CreditCard'),
('Debt Funding', 'Banks and NBFCs for startup loans', 'Calculator'),
('Crowdfunding', 'Equity and reward crowdfunding platforms', 'Star'),
('Strategic Investors', 'Corporate investors and strategic partners', 'Shield');

-- Success message
SELECT 'Funding database schema created successfully!' as status;