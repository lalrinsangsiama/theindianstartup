-- P2 Legal Activity Types - Portfolio Integration Enhancement
-- Critical activities missing for P2 course incorporation and compliance tracking

-- Insert additional legal activity types for P2 course
INSERT INTO "ActivityType" ("id", "name", "category", "portfolioSection", "portfolioField", "dataSchema") VALUES

-- Entity Selection and Business Structure
('entity_selection_decision', 'Entity Selection Decision', 'legal_structure', 'legal_compliance', 'business_structure', 
 '{"type": "object", "properties": {"selectedEntity": {"type": "string", "enum": ["Private Limited", "LLP", "Partnership", "Sole Proprietorship", "One Person Company"], "required": true}, "rationale": {"type": "string", "minLength": 100, "maxLength": 500}, "capitalStructure": {"type": "object", "properties": {"authorizedCapital": {"type": "number"}, "paidUpCapital": {"type": "number"}, "shareStructure": {"type": "string"}}}, "founders": {"type": "array", "items": {"type": "object", "properties": {"name": {"type": "string"}, "equity": {"type": "number"}, "role": {"type": "string"}}}}}, "required": ["selectedEntity", "rationale"]}'::jsonb),

-- Tax Registration and Compliance Setup
('tax_registration_completion', 'Tax Registration Completion', 'compliance', 'legal_compliance', 'compliance_checklist', 
 '{"type": "object", "properties": {"pan": {"type": "string", "pattern": "^[A-Z]{5}[0-9]{4}[A-Z]{1}$"}, "tan": {"type": "string", "pattern": "^[A-Z]{4}[0-9]{5}[A-Z]{1}$"}, "gstNumber": {"type": "string", "pattern": "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"}, "gstType": {"type": "string", "enum": ["Regular", "Composition", "Exempt"]}, "registrationDates": {"type": "object", "properties": {"panDate": {"type": "string", "format": "date"}, "tanDate": {"type": "string", "format": "date"}, "gstDate": {"type": "string", "format": "date"}}}, "filingFrequency": {"type": "object", "properties": {"gstReturns": {"type": "string"}, "tdsReturns": {"type": "string"}, "incomeReturns": {"type": "string"}}}}, "required": ["pan"]}'::jsonb),

-- Labor Law and Employment Compliance
('labor_law_compliance_setup', 'Labor Law Compliance Setup', 'compliance', 'legal_compliance', 'compliance_checklist', 
 '{"type": "object", "properties": {"epfRegistration": {"type": "object", "properties": {"epfNumber": {"type": "string"}, "registrationDate": {"type": "string", "format": "date"}, "applicableFrom": {"type": "number", "description": "Number of employees"}}}, "esiRegistration": {"type": "object", "properties": {"esiNumber": {"type": "string"}, "registrationDate": {"type": "string", "format": "date"}, "applicableFrom": {"type": "number"}}}, "shopActLicense": {"type": "object", "properties": {"licenseNumber": {"type": "string"}, "state": {"type": "string"}, "validTill": {"type": "string", "format": "date"}}}, "laborLicenses": {"type": "array", "items": {"type": "object", "properties": {"type": {"type": "string"}, "number": {"type": "string"}, "authority": {"type": "string"}, "validTill": {"type": "string", "format": "date"}}}}}, "required": []}'::jsonb),

-- IP Protection and Brand Assets
('ip_protection_setup', 'IP Protection Setup', 'intellectual_property', 'legal_compliance', 'intellectual_property', 
 '{"type": "object", "properties": {"trademarkApplications": {"type": "array", "items": {"type": "object", "properties": {"mark": {"type": "string"}, "classes": {"type": "array", "items": {"type": "number"}}, "applicationNumber": {"type": "string"}, "status": {"type": "string", "enum": ["Applied", "Objected", "Accepted", "Registered"]}, "filingDate": {"type": "string", "format": "date"}}}}, "copyrightRegistrations": {"type": "array", "items": {"type": "object", "properties": {"work": {"type": "string"}, "registrationNumber": {"type": "string"}, "category": {"type": "string"}}}}, "domainNames": {"type": "array", "items": {"type": "object", "properties": {"domain": {"type": "string"}, "registrar": {"type": "string"}, "expiryDate": {"type": "string", "format": "date"}}}}, "brandGuidelines": {"type": "object", "properties": {"logoFile": {"type": "string"}, "colorPalette": {"type": "array"}, "typography": {"type": "string"}, "brandVoice": {"type": "string"}}}}, "required": []}'::jsonb),

-- Compliance Calendar and Management System
('compliance_calendar_creation', 'Compliance Calendar Creation', 'compliance', 'legal_compliance', 'compliance_checklist', 
 '{"type": "object", "properties": {"monthlyCompliances": {"type": "array", "items": {"type": "object", "properties": {"task": {"type": "string"}, "dueDate": {"type": "number", "description": "Day of month"}, "frequency": {"type": "string"}, "penalty": {"type": "string"}}}}, "quarterlyCompliances": {"type": "array", "items": {"type": "object", "properties": {"task": {"type": "string"}, "quarter": {"type": "string"}, "dueDate": {"type": "string"}, "penalty": {"type": "string"}}}}, "annualCompliances": {"type": "array", "items": {"type": "object", "properties": {"task": {"type": "string"}, "dueDate": {"type": "string", "format": "date"}, "penalty": {"type": "string"}}}}, "automationSetup": {"type": "object", "properties": {"calendarIntegration": {"type": "boolean"}, "reminderSystem": {"type": "boolean"}, "professionalSupport": {"type": "boolean"}}}, "contactDirectory": {"type": "array", "items": {"type": "object", "properties": {"type": {"type": "string", "enum": ["CA", "CS", "Lawyer", "Consultant"]}, "name": {"type": "string"}, "contact": {"type": "string"}, "specialization": {"type": "string"}}}}}, "required": ["monthlyCompliances"]}'::jsonb),

-- Incorporation Document Completion
('incorporation_document_completion', 'Incorporation Document Completion', 'legal_structure', 'legal_compliance', 'legal_documents', 
 '{"type": "object", "properties": {"incorporationCertificate": {"type": "object", "properties": {"cin": {"type": "string"}, "dateOfIncorporation": {"type": "string", "format": "date"}, "registrarOfCompanies": {"type": "string"}}}, "moaAoa": {"type": "object", "properties": {"authorizedCapital": {"type": "number"}, "mainObjects": {"type": "array", "items": {"type": "string"}}, "lastUpdated": {"type": "string", "format": "date"}}}, "shareholderDocuments": {"type": "array", "items": {"type": "object", "properties": {"shareholderName": {"type": "string"}, "sharesHeld": {"type": "number"}, "sharePercentage": {"type": "number"}, "shareAllotmentDate": {"type": "string", "format": "date"}}}}, "directorDocuments": {"type": "array", "items": {"type": "object", "properties": {"directorName": {"type": "string"}, "din": {"type": "string"}, "appointmentDate": {"type": "string", "format": "date"}, "dscNumber": {"type": "string"}}}}, "registeredOffice": {"type": "object", "properties": {"address": {"type": "string"}, "nocFromOwner": {"type": "boolean"}, "utilityBill": {"type": "boolean"}, "rentAgreement": {"type": "boolean"}}}}, "required": ["incorporationCertificate"]}'::jsonb);

-- Update existing legal compliance portfolio section with enhanced fields
UPDATE "PortfolioSection" 
SET "fields" = '{
  "fields": [
    {
      "name": "business_structure",
      "label": "Business Structure",
      "type": "object",
      "required": true,
      "properties": {
        "entityType": {"type": "string", "label": "Entity Type"},
        "cin": {"type": "string", "label": "CIN Number"},
        "incorporationDate": {"type": "string", "format": "date", "label": "Incorporation Date"},
        "rationale": {"type": "text", "label": "Selection Rationale"}
      }
    },
    {
      "name": "tax_registrations",
      "label": "Tax Registrations",
      "type": "object",
      "required": true,
      "properties": {
        "pan": {"type": "string", "label": "PAN Number"},
        "tan": {"type": "string", "label": "TAN Number"},
        "gstNumber": {"type": "string", "label": "GST Number"},
        "gstType": {"type": "string", "label": "GST Registration Type"}
      }
    },
    {
      "name": "labor_compliance",
      "label": "Labor Law Compliance",
      "type": "object",
      "required": false,
      "properties": {
        "epfNumber": {"type": "string", "label": "EPF Registration Number"},
        "esiNumber": {"type": "string", "label": "ESI Registration Number"},
        "shopActLicense": {"type": "string", "label": "Shop Act License Number"}
      }
    },
    {
      "name": "intellectual_property",
      "label": "Intellectual Property",
      "type": "array",
      "required": false,
      "items": {
        "type": "object",
        "properties": {
          "type": {"type": "string", "label": "IP Type"},
          "name": {"type": "string", "label": "Mark/Work Name"},
          "registrationNumber": {"type": "string", "label": "Registration Number"},
          "status": {"type": "string", "label": "Status"}
        }
      }
    },
    {
      "name": "compliance_checklist",
      "label": "Compliance Checklist",
      "type": "array",
      "required": true,
      "items": {
        "type": "object",
        "properties": {
          "task": {"type": "string", "label": "Compliance Task"},
          "frequency": {"type": "string", "label": "Frequency"},
          "dueDate": {"type": "string", "label": "Due Date"},
          "status": {"type": "string", "label": "Status"},
          "penalty": {"type": "string", "label": "Penalty for Non-compliance"}
        }
      }
    },
    {
      "name": "legal_documents",
      "label": "Legal Documents",
      "type": "array",
      "required": false,
      "items": {
        "type": "object",
        "properties": {
          "documentType": {"type": "string", "label": "Document Type"},
          "fileName": {"type": "string", "label": "File Name"},
          "uploadDate": {"type": "string", "format": "date", "label": "Upload Date"},
          "expiryDate": {"type": "string", "format": "date", "label": "Expiry Date"}
        }
      }
    }
  ]
}'::jsonb
WHERE "id" = 'legal_compliance';